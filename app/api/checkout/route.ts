import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe, isStripeConfigured, siteUrl } from '@/lib/stripe'
import { productById } from '@/data/products'
import { packBySlug, packs } from '@/data/packs'

export const runtime = 'nodejs'

/**
 * Creates a Stripe Checkout Session from the cart and returns { url } to redirect to.
 *
 * The client sends only { kind, id, qty } — prices are resolved SERVER-SIDE from
 * data/products.ts + data/packs.ts, never trusted from the browser.
 *
 * Pricing sources, in order of preference:
 *   1. stripePriceId  → uses the Stripe Price object (recommended for production)
 *   2. priceEUR       → builds an inline price_data line (quickest path to live)
 * If any line has neither, the whole request is rejected (store not ready).
 *
 * Fulfillment: the customer picks "Recogida en el gimnasio" (free) or
 * "Envío a domicilio" (STRIPE_SHIPPING_RATE_CENTS) at checkout.
 * See docs/stripe-setup.md.
 */

interface IncomingItem {
  kind: 'product' | 'pack'
  id: string
  qty: number
}

interface ResolvedLine {
  name: string
  image: string
  priceEUR: number | null
  stripePriceId: string | null
}

function resolveLine(kind: 'product' | 'pack', id: string): ResolvedLine | null {
  if (kind === 'product') {
    const p = productById(id)
    if (!p) return null
    return { name: p.fullName, image: p.image, priceEUR: p.priceEUR, stripePriceId: p.stripePriceId }
  }
  // pack — id may be the pack id or slug
  const pk = packs.find((x) => x.id === id) ?? packBySlug(id)
  if (!pk) return null
  return { name: pk.name, image: '', priceEUR: pk.priceEUR, stripePriceId: pk.stripePriceId }
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'STORE_NOT_CONFIGURED', message: 'La tienda todavía no está activa.' },
      { status: 503 },
    )
  }

  let body: { items?: IncomingItem[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 })
  }

  const items = (body.items ?? []).filter(
    (i) => i && (i.kind === 'product' || i.kind === 'pack') && typeof i.id === 'string' && i.qty > 0,
  )
  if (items.length === 0) {
    return NextResponse.json({ error: 'EMPTY_CART' }, { status: 400 })
  }

  const origin = siteUrl()
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  for (const item of items) {
    const resolved = resolveLine(item.kind, item.id)
    if (!resolved) {
      return NextResponse.json({ error: 'UNKNOWN_ITEM', id: item.id }, { status: 400 })
    }
    const qty = Math.min(Math.max(Math.floor(item.qty), 1), 99)

    if (resolved.stripePriceId) {
      lineItems.push({ price: resolved.stripePriceId, quantity: qty })
    } else if (typeof resolved.priceEUR === 'number') {
      lineItems.push({
        quantity: qty,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(resolved.priceEUR * 100),
          product_data: {
            name: resolved.name,
            images: resolved.image ? [`${origin}${resolved.image}`] : undefined,
          },
        },
      })
    } else {
      // Catalog exists but this line has no price yet — store not ready to sell.
      return NextResponse.json(
        { error: 'PRICING_PENDING', message: 'Este producto todavía no tiene precio.' },
        { status: 503 },
      )
    }
  }

  const shippingCents = Number.parseInt(process.env.STRIPE_SHIPPING_RATE_CENTS || '490', 10)

  const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: 0, currency: 'eur' },
        display_name: 'Recogida en el gimnasio',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 1 },
          maximum: { unit: 'business_day', value: 3 },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: shippingCents, currency: 'eur' },
        display_name: 'Envío a domicilio',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 2 },
          maximum: { unit: 'business_day', value: 5 },
        },
      },
    },
  ]

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      locale: 'es',
      phone_number_collection: { enabled: true },
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['ES'] },
      shipping_options: shippingOptions,
      // Enable once IVA is configured in the Stripe dashboard (Tax settings).
      // automatic_tax: { enabled: true },
      success_url: `${origin}/tienda/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/tienda/cancelado`,
      metadata: {
        cart: JSON.stringify(items.map((i) => ({ k: i.kind, id: i.id, q: i.qty }))),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'CHECKOUT_FAILED' }, { status: 500 })
  }
}
