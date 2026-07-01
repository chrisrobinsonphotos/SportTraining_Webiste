import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { Resend } from 'resend'
import { getStripe, isStripeConfigured } from '@/lib/stripe'

export const runtime = 'nodejs'

/**
 * Stripe webhook — order fulfillment notifications.
 *
 * On `checkout.session.completed` it emails the team the order details (items,
 * customer, shipping method + address) so orders can be fulfilled manually until
 * an OMS/inventory system exists. Mirrors the /api/prueba notification pattern.
 *
 * Requires STRIPE_WEBHOOK_SECRET (from the Stripe dashboard / `stripe listen`).
 * See docs/stripe-setup.md.
 */

const ORDER_RECIPIENTS = ['chrisccrobinson@gmail.com', 'miguelangelbarrionuevooliveira@gmail.com']

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!isStripeConfigured() || !secret) {
    return NextResponse.json({ error: 'WEBHOOK_NOT_CONFIGURED' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'NO_SIGNATURE' }, { status: 400 })
  }

  const stripe = getStripe()
  const raw = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret)
  } catch (err) {
    console.error('Stripe signature verification failed:', err)
    return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    try {
      await notifyOrder(stripe, session)
    } catch (err) {
      // Never fail the webhook on email errors — Stripe would keep retrying.
      console.error('Order notification failed (non-fatal):', err)
    }
  }

  return NextResponse.json({ received: true })
}

async function notifyOrder(stripe: Stripe, session: Stripe.Checkout.Session) {
  if (!process.env.RESEND_API_KEY) return
  const resend = new Resend(process.env.RESEND_API_KEY)

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })
  const rows = lineItems.data
    .map(
      (li) =>
        `<tr><td style="padding:6px 0;color:#fff">${li.quantity} ×</td><td style="padding:6px 0;color:#fff">${li.description ?? ''}</td><td style="padding:6px 0;color:#F1B91E;text-align:right">${((li.amount_total ?? 0) / 100).toFixed(2)} €</td></tr>`,
    )
    .join('')

  const total = ((session.amount_total ?? 0) / 100).toFixed(2)
  const shipping = session.shipping_cost?.shipping_rate ? 'Envío a domicilio' : 'Recogida / envío (ver Stripe)'
  const name = session.customer_details?.name ?? '—'
  const email = session.customer_details?.email ?? '—'
  const phone = session.customer_details?.phone ?? '—'
  const addr = session.customer_details?.address
  const address = addr
    ? [addr.line1, addr.line2, `${addr.postal_code ?? ''} ${addr.city ?? ''}`.trim(), addr.country]
        .filter(Boolean)
        .join(', ')
    : '—'

  await resend.emails.send({
    from: 'Sport Training Tienda <noreply@sporttraining.es>',
    to: ORDER_RECIPIENTS,
    subject: `NUEVO PEDIDO — ${name} — ${total} €`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-top:4px solid #F1B91E">
        <h2 style="margin:0 0 8px;font-size:20px;color:#F1B91E;text-transform:uppercase;letter-spacing:0.1em">Nuevo pedido de la tienda</h2>
        <p style="margin:0 0 24px;color:#999;font-size:13px">Preparar y ${shipping === 'Envío a domicilio' ? 'enviar' : 'avisar para recogida'}. Pago confirmado en Stripe.</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">${rows}
          <tr><td colspan="2" style="padding:12px 0 0;color:#999;text-transform:uppercase;letter-spacing:0.15em;font-size:12px">Total</td><td style="padding:12px 0 0;color:#F1B91E;text-align:right;font-weight:bold">${total} €</td></tr>
        </table>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;width:130px">Entrega</td><td style="padding:6px 0;color:#fff">${shipping}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Nombre</td><td style="padding:6px 0;color:#fff">${name}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Email</td><td style="padding:6px 0;color:#fff">${email}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Teléfono</td><td style="padding:6px 0;color:#fff">${phone}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;vertical-align:top">Dirección</td><td style="padding:6px 0;color:#fff">${address}</td></tr>
        </table>
        <p style="margin:24px 0 0;color:#555;font-size:11px">Stripe session ${session.id}</p>
      </div>
    `,
  })
}
