# Sport Training — Site Map & Handoff

**Domain:** sporttraining.es
**Stack:** Next.js 16.2 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion
**Deployment:** Vercel (recommended) · `npm run build` · `npm run start`
**Repo:** local Git at `~/Documents/CoworkOS/SportTraining/development/st-web/`
**Last updated:** 2026-05-07

---

## Public routes

| Path | Page | Purpose | Status |
|---|---|---|---|
| `/` | Home | Single long-scroll landing — Hero · Marquee · Philosophy · Training · Modalities · Adaptado · Nutrition · Community · Trainers · Schedule · CTA · Reviews · Footer | ✅ Live |
| `/contacto` | Contact | Phone, WhatsApp, address, OpenStreetMap embed, contact info | ✅ Live |
| `/legal` | Aviso Legal | Required by LSSI-CE — site owner ID, terms of use, IP, jurisdiction | ✅ Live (needs client info) |
| `/privacidad` | Política de Privacidad | Required by RGPD/LOPDGDD — data controller, purposes, rights | ✅ Live (needs client info) |
| `/cookies` | Política de Cookies | Required by LSSI-CE Art. 22.2 — cookie inventory, consent, browser controls | ✅ Live |
| `/404` (catch-all) | Not Found | Branded 404 with CTAs back to home and contacto | ✅ Live |

## SEO + indexability

| File | Purpose | Status |
|---|---|---|
| `app/sitemap.ts` | Auto-generated `/sitemap.xml` | ✅ |
| `app/robots.ts` | Auto-generated `/robots.txt` | ✅ |
| `app/layout.tsx` metadata | Title template, description, OG, Twitter, canonical, theme-color | ✅ |
| `public/og-image.jpg` | 1200×630 link-preview image | ✅ (placeholder — replace with brand-designed version) |
| JSON-LD `ExerciseGym` schema | Structured data for Google business panel | ✅ in layout |

## Components (`components/`)

15 React components, all client-side or server-rendered. None hardcode the gym's NIF, registered name, or contact email — those flow through the legal pages.

```
Hero · Navbar · Marquee · Philosophy · Training · Modalities ·
Adaptado · Nutrition · Community · Trainers · Schedule ·
CTASection · Reviews · ContactPage · Footer ·
LegalPageLayout (NEW)
```

## Integrations

| What | Where | Status |
|---|---|---|
| Mailchimp embed | `app/layout.tsx` (`chimpstatic.com` script) | ✅ Connected |
| Reviews API | `app/api/reviews/route.ts` | ⚠️ Source not documented — needs spec |
| Contact form backend | None yet — `/contacto` shows links to phone/WhatsApp/maps but no email-capture form | ⚠️ Missing |
| Class booking | None | ⚠️ Missing |
| Analytics | None | ⚠️ Recommend adding Plausible (privacy-first) or GA4 |

## Footer link policy

The footer links to `/privacidad`, `/cookies`, `/legal`. All three now resolve.

The footer's main nav columns currently link to placeholder routes that are **not yet built**:

- `/gym/historia`, `/gym/equipo`, `/gym/instalaciones`
- `/entrenamientos/hyrox`, `/entrenamientos/funcional`, `/entrenamientos/crosstraining`, `/entrenamientos/adaptado`
- `/modalidades/personal`, `/modalidades/grupo`, `/modalidades/libre`
- `/nutricion`, `/comunidad`, `/tienda`

These will all 404 today — that's why the new branded 404 page matters. Recommend either building these out incrementally or removing/disabling the links until ready.

## Brand integration

- **Logo:** `/public/st-logo-black.png`
- **Brochure:** `/public/SportTraining-Brochure-HQ.pdf` (full) and `_compressed.pdf` (web-light)
- **Colors:** Gold `#F1B91E` · Dark `#0a0a0a` / `#191919` / `#111111`
- **Fonts:** Barlow Condensed (display) · Inter (body) — loaded via `next/font/google`

## Action items the client (or Sr.) needs to provide

These complete the legal pages — currently shown as placeholders on the live site:

1. **Razón social** (legal entity name as registered)
2. **NIF / CIF**
3. **Inscripción en Registro Mercantil** if applicable (Tomo, Folio, Hoja, etc.)
4. **Email para protección de datos** (e.g., `protecciondatos@sporttraining.es` or general inbox)
5. **Cookie consent banner** — needs design/copy decision (accept / reject / configure)
6. **Confirm analytics tool** to use (Plausible vs GA4 vs none) so the cookies policy can name it

## Recommended next steps for the website

In rough priority order:

1. Replace placeholder legal info once client provides
2. Decide on analytics tool, install, update cookies policy
3. Add a **cookie consent banner** (required for any analytics beyond technical cookies)
4. Add **`/contacto` form backend** so leads convert without needing WhatsApp
5. Add **`app/not-found.tsx`** behavior for the missing footer-nav routes — either build them or hide the links
6. Replace `og-image.jpg` with a brand-designed 1200×630
7. Add `apple-touch-icon.png` and proper favicon set
8. Set up **Vercel deployment** with environment variables (`NEXT_PUBLIC_SITE_URL`, etc.) and `vercel.json` if needed
9. Connect a class booking widget or document the third-party booking flow

---

## Marketing SEO improvements (2026-05-07 round 2)

In addition to the technical foundation:

- **One semantic H1 per page** — Hero collapsed 3 visual H1s into one keyword-rich `sr-only` H1; Trainers same fix
- **Alt text overhaul** — every `<Image>` across Hero, Navbar, Footer, CTASection, Adaptado, Philosophy, Modalities, Trainers, Training, Nutrition rewritten with location + service keywords
- **Expanded JSON-LD `@graph`**: ExerciseGym + 6 per-modality `Service` schemas + `FAQPage` with 7 high-intent local questions + `aggregateRating` (placeholder) + `OpeningHoursSpecification` (placeholder) + `areaServed` (Murcia + nearby municipalities) + `hasOfferCatalog` with real pricing tiers + `amenityFeature` list
- **Aria-label CTAs** — keyword-rich anchor signals on every primary internal link (Hero CTAs, Modalities Contratar, Adaptado, Community, CTASection)
- **`/contacto` metadata strengthened** — keywords, OG, canonical, full local-search description

## Files added in this audit pass

- `app/layout.tsx` — full metadata API + JSON-LD schema (replaced minimal version)
- `app/robots.ts` — modern robots config
- `app/sitemap.ts` — auto-generated sitemap
- `app/not-found.tsx` — branded 404 page
- `app/legal/page.tsx` — Aviso Legal
- `app/privacidad/page.tsx` — Política de Privacidad
- `app/cookies/page.tsx` — Política de Cookies
- `components/LegalPageLayout.tsx` — shared layout for the three legal pages
- `app/globals.css` — appended `.legal-content` typography
- `public/og-image.jpg` — placeholder OG share image
- `SITE_MAP.md` — this document
