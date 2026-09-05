# Sport Training — sporttraining.es

Website for Sport Training, a functional fitness centre in Murcia, Spain (est. 2007).
Live at [sporttraining.es](https://sporttraining.es), deployed on Vercel.

**Stack:** Next.js · React · TypeScript · Tailwind CSS 4 · Framer Motion

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npx tsc --noEmit   # type check
```

## Environment variables

Set in `.env.local` for development and in Vercel → Project → Settings → Environment Variables for production.

| Variable | Used by | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Stripe redirect URLs | Recommended |
| `TIENDA_PASSWORD` | Store pre-launch gate password (`/acceso`) | Yes, while store is gated — no code fallback |
| `TIENDA_ACCESS_TOKEN` | Opaque store access cookie value | Yes, while store is gated — no code fallback |
| `BANDEJA_PASSWORD` | Enquiry inbox gate password (`/lead/bandeja`) | Yes — no code fallback |
| `BANDEJA_ACCESS_TOKEN` | Opaque inbox access cookie value | Yes — no code fallback |
| `LEAD_ACTION_SECRET` | Signs the per-lead action tokens the inbox and the digest use | Yes, to mark leads from either |
| `STRIPE_SECRET_KEY` | Checkout (`/api/checkout`) | Yes, for store |
| `STRIPE_WEBHOOK_SECRET` | Order webhook (`/api/stripe-webhook`) | Yes, for order emails |
| `STRIPE_SHIPPING_RATE_CENTS` | Flat shipping rate in cents | Optional |
| `RESEND_API_KEY` | Transactional email (contact / trial / orders) | Yes, for forms |
| `MAILERLITE_API_KEY` | Newsletter + trial lead capture | Yes, for forms |
| `MAILERLITE_GROUP_ID` | Default MailerLite group | Yes, for forms |
| `MAILERLITE_TRIAL_GROUP_ID` | Trial-day (`/prueba`) lead group | Yes, for `/prueba` |
| `GOOGLE_PLACES_API_KEY` | Google reviews (`/api/reviews`) | Yes, for reviews section |

**Both gates are fail-secure:** a gate whose password and token are not set is
inaccessible to everyone rather than open to everyone. The two are separate
credentials on purpose — the store gate hides an unreleased catalogue, the
inbox gate hides real people's names and phone numbers, and one being shared
with a supplier must not hand over the other. The gate table is
`lib/gates.ts`; `middleware.ts` only applies it. To open the store to the
public, remove the `/tienda` entry from that table.

`/lead/confirmar` is deliberately NOT gated: it is opened from a link in the
daily digest by someone who has no password, and authenticates with its own
signed, expiring, single-lead token instead.

## Key areas

```
app/                 Routes (App Router) — see SITE_MAP.md for the full route table
components/          React components (incl. tienda/ store UI, CookieConsent)
data/products.ts     Store catalog
data/packs.ts        Store packs
docs/                Integration guides: stripe-setup, deploy-config, booking,
                     image-pipeline, reviews-api, design-system-pass
public/              Static assets (tienda/ product cutouts, photography, logos)
```

## Analytics & consent

GA4 (`G-V1SPWK5DVB`) loads with **Google Consent Mode v2** — `analytics_storage`
starts denied and is only granted when the visitor accepts the cookie banner
(`components/CookieConsent.tsx`; choice persists in `localStorage.st_cookie_consent`).
Vercel Analytics + Speed Insights are cookieless.

## Docs

- `SITE_MAP.md` — route table, integrations, handoff notes
- `docs/stripe-setup.md` — store go-live checklist
- `docs/deploy-config.md` — deployment configuration
