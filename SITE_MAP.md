# Sport Training — Site Map & Handoff

**Domain:** sporttraining.es
**Stack:** Next.js 16.2 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion
**Deployment:** Vercel, auto-deploy from `main`
**Repo:** github.com/chrisrobinsonphotos/SportTraining_Webiste — local checkout at `~/Documents/CoworkOS/Clients/SportTraining/development/st-web/`
**Last updated:** 2026-07-23

---

## Public routes

| Path | Purpose | Status |
|---|---|---|
| `/` | Home — long-scroll landing (Hero · Marquee · Philosophy · Training · Modalities · Adaptado · Nutrition · Community · Trainers · Schedule · CTA · Reviews) | ✅ Live |
| `/prueba` | Trial-day funnel — lead form → MailerLite trial group + Resend email | ✅ Live |
| `/contacto` | Contact — form backend + phone, WhatsApp, map | ✅ Live |
| `/entrenamientos/hyrox` | HYROX discipline page | ✅ Live |
| `/entrenamientos/funcional` | Funcional discipline page | ✅ Live |
| `/nutricion/alimentacion` | Nutrition — alimentación | ✅ Live |
| `/nutricion/planificacion` | Nutrition — planificación | ✅ Live |
| `/nutricion/suplementacion` | Nutrition — suplementación | ✅ Live |
| `/legal` | Aviso Legal (LSSI-CE) | ✅ Live — entity data filled (verify registro mercantil) |
| `/privacidad` | Política de Privacidad (RGPD) | ✅ Live |
| `/cookies` | Política de Cookies | ✅ Live — names GA4, consent-mode flow |
| `/condiciones-de-venta` | Store — condiciones generales de venta | ✅ Built — placeholders: none |
| `/envios` | Store — shipping terms | ⚠️ Built — placeholders: zone, rate, timing, pickup |
| `/devoluciones` | Store — returns / desistimiento | ⚠️ Built — placeholder: return shipping cost |
| `/404` | Branded not-found | ✅ Live |

## Store (password-gated until launch)

| Path | Purpose |
|---|---|
| `/tienda` | Catalog (5 products, 3 packs) |
| `/tienda/[slug]` | Product ficha |
| `/tienda/pack/[slug]` | Pack ficha |
| `/tienda/gracias` · `/tienda/cancelado` | Checkout result pages |
| `/acceso` | Pre-launch password gate (env-only credentials, fail-secure) |

Gate: `middleware.ts` protects `/tienda/*` only. Delete the file to open the store.
Go-live checklist: `docs/stripe-setup.md`. Outstanding: Stripe key, price confirmation, envíos/devoluciones placeholders.

## API routes

| Route | Purpose | Env |
|---|---|---|
| `/api/contact` | Contact form → Resend + MailerLite | `RESEND_API_KEY`, `MAILERLITE_*` |
| `/api/prueba` | Trial-day lead capture | `MAILERLITE_TRIAL_GROUP_ID`, `RESEND_API_KEY` |
| `/api/reviews` | Google reviews feed | `GOOGLE_PLACES_API_KEY` |
| `/api/checkout` | Stripe Checkout session | `STRIPE_SECRET_KEY` |
| `/api/stripe-webhook` | Order confirmation emails | `STRIPE_WEBHOOK_SECRET` |
| `/api/acceso` | Store gate password check | `TIENDA_PASSWORD`, `TIENDA_ACCESS_TOKEN` |

## Analytics & consent

- **GA4** `G-V1SPWK5DVB` (property under Miguel Ángel Sr.'s Google account) with **Consent Mode v2**: `analytics_storage` denied by default; `components/CookieConsent.tsx` banner grants on accept. Choice in `localStorage.st_cookie_consent`.
- **Vercel Analytics + Speed Insights** — cookieless.
- Mailchimp embed removed 2026-07 (platform is MailerLite, server-side only — no cookies).

## SEO

`app/sitemap.ts` (includes tienda + legal routes) · `app/robots.ts` · full metadata API + JSON-LD `@graph` (ExerciseGym, Services, FAQPage) in `app/layout.tsx` · one semantic H1 per page · keyword alt text.

## Known gaps / next steps

1. Fill `/envios` + `/devoluciones` placeholders (shipping zone/rate/timing, pickup, return costs) — client decisions
2. Verify registro mercantil data on `/legal`
3. Store go-live: Stripe key + real prices (`docs/stripe-setup.md`)
4. Footer nav still links some unbuilt routes (`/gym/*`, `/entrenamientos/crosstraining`, `/modalidades/*`, `/comunidad`) — build or trim
5. Replace placeholder `og-image.jpg` with brand-designed 1200×630
6. Homepage design pass per June 2026 audit (dead space, type scale, hero) — see workstation memory
7. Class booking integration (`docs/booking-integration.md`)

## Handoff notes

- Repo transfer = the handoff mechanism for the codebase (see workstation `july-handoff_proposal_v1.md`). Repo name has a typo (`SportTraining_Webiste`) — rename before transfer; GitHub redirects the old URL.
- No secrets in the repo — all credentials are Vercel env vars (see README table).
- `docs/` holds all integration guides; `docs/design-system-pass.md` documents the type-scale system.
