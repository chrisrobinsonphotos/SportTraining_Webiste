# Tienda — Stripe Setup

Everything is built. To turn the store live, work through this checklist. Nothing
here touches component code — it's all data, env vars, and dashboard config.

## 1. Prices (the real blocker)

Once María José confirms prices, edit **`data/products.ts`** and **`data/packs.ts`**
and fill in, per item:

- `priceEUR` — final IVA-inclusive price in euros (e.g. `29.90`).
- (optional) `sku` — internal/supplier reference.
- (optional) `stripePriceId` — see step 3. Leave `null` to use `priceEUR` directly.

For packs also set `discountPct` (shown as a badge) and the pack `priceEUR`.

That's the minimum to go live: **with `priceEUR` set and a Stripe secret key, checkout works.**
`stripePriceId` is optional and only needed if you prefer managing prices in the Stripe dashboard.

## 2. Stripe account

- Confirm the account is under **St Levante Group, SL · CIF B26906602** and identity-verified.
- `dashboard.stripe.com → Developers → API keys`. Copy the **Secret key**.
- Put it in `.env.local` (local) and in **Vercel → Project → Settings → Environment Variables** (production):
  - `STRIPE_SECRET_KEY` = `sk_test_…` while testing, `sk_live_…` when ready.
  - `NEXT_PUBLIC_SITE_URL` = `https://sporttraining.es`
  - `STRIPE_SHIPPING_RATE_CENTS` = flat home-delivery rate in cents (e.g. `490`). Pickup is always free.

## 3. (Optional) Stripe Products & Prices

If you'd rather manage prices in Stripe than in the code:

1. `Products → Add product` for each supplement + pack.
2. Copy each **Price ID** (`price_…`) into the matching `stripePriceId` field in the data files.
   When present, it takes priority over `priceEUR`.

## 4. Webhook (order emails)

1. `Developers → Webhooks → Add endpoint`.
2. URL: `https://sporttraining.es/api/stripe-webhook`
3. Event: `checkout.session.completed`.
4. Copy the **Signing secret** (`whsec_…`) → `STRIPE_WEBHOOK_SECRET` in Vercel + `.env.local`.

Each completed order emails **chrisccrobinson@gmail.com** and **miguelangelbarrionuevooliveira@gmail.com**
with items, customer, delivery method, and address (via Resend — already configured).

Local testing: `stripe login` then `stripe listen --forward-to localhost:3000/api/stripe-webhook`
(prints a `whsec_…` for local use).

## 5. Tax / IVA

Prices are entered IVA-inclusive, so it works as-is. For automatic Stripe Tax /
invoices later: configure `Settings → Tax`, then uncomment `automatic_tax: { enabled: true }`
in `app/api/checkout/route.ts`.

## 6. Legal pages (still owed)

Before going live in Spain, publish **Condiciones de venta**, **Devoluciones** and
**Envío** and link them from the footer + checkout. Draft, then legal review.

## 7. Go-live test

1. Test keys in place, `priceEUR` filled.
2. `npm run dev` → add to cart → **Finalizar compra** → Stripe test card `4242 4242 4242 4242`.
3. Confirm redirect to `/tienda/gracias`, cart clears, and the order email arrives.
4. Swap test keys → live keys in Vercel. Done.

## Files

| File | Role |
|---|---|
| `data/products.ts`, `data/packs.ts` | Catalog + prices (source of truth) |
| `lib/stripe.ts` | Stripe client (reads `STRIPE_SECRET_KEY`) |
| `app/api/checkout/route.ts` | Builds the Checkout Session (prices resolved server-side) |
| `app/api/stripe-webhook/route.ts` | Order-notification email on payment |
| `app/tienda/gracias`, `app/tienda/cancelado` | Post-checkout pages |
