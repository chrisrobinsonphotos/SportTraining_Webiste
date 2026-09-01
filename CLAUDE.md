# Sport Training Website — Project Brief

## Overview
Sport Training (StyleTraining, one word: "SportTraining") is a HYROX-affiliated gym in Murcia, Spain. This is their marketing website — a single long-scroll landing page with supplementary legal and contact pages. The site promotes training programmes, community, nutrition, and HYROX events.

**Live:** sporttraining.es  
**Stack:** Next.js 16.2 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion  
**Deployment:** Vercel  
**Dev server:** `npm run dev` → http://localhost:3000

See `SITE_MAP.md` for the full route inventory and open action items.

---

## Brand Design System

**Colors**
| Token | Hex | Use |
|---|---|---|
| Gold (primary) | `#F1B91E` | CTAs, accents, highlights |
| Deep black | `#0a0a0a` | Deepest backgrounds |
| Dark | `#111111` | Section backgrounds |
| Mid dark | `#191919` | Cards, secondary backgrounds |
| White | `#FFFFFF` | Body text on dark |

**Typography**
- **Display / headings:** Barlow Condensed — uppercase, bold, tight tracking
- **Body:** Inter — regular weight
- Both loaded via `next/font/google` in `app/layout.tsx`

**Visual style:** Industrial, hard-edged, high contrast. No rounded corners anywhere. Photography-heavy. No softness or pastel tones.

---

## Component Inventory

All components live in `components/`. The home page (`app/page.tsx`) renders them in this order:

| Component | Visual role |
|---|---|
| `Navbar` | Fixed top nav — ST logo left, links center, CTA button right |
| `Hero` | Full-screen dark hero — background image, large headline, two CTAs |
| `Marquee` | Animated horizontal ticker of discipline names |
| `Philosophy` | Brand statement — dark bg, large Barlow Condensed type |
| `Training` | Training disciplines overview — image grid with labels |
| `Modalities` | Three training modes (grupo / personal / libre) — card layout |
| `Adaptado` | Adaptive training — image + copy, dark section |
| `Nutrition` | Nutrition services — three image cards (food, supplements, textil) |
| `Community` | Gallery/community section — carousel + cards |
| `Trainers` | Trainer profiles — Miguel Jr. and Maria, photo + bio |
| `Schedule` | Weekly class schedule table |
| `CTASection` | Full-bleed CTA — background image, headline, button |
| `Reviews` | Google reviews carousel — avatars + star ratings |
| `Footer` | Multi-column footer — nav links, legal links, social icons |
| `ContactPage` | `/contacto` — phone, WhatsApp, address, OpenStreetMap embed |
| `LegalPageLayout` | Shared layout wrapper for `/legal`, `/privacidad`, `/cookies` |
| `ContactForm` | Email capture form (Resend API via `/api/contact`) |
| `StatementSection` | Full-bleed typographic statement block |

---

## Data Files

| File | Contents |
|---|---|
| `data/trainers.ts` | Trainer profiles — name, bio, photo path, specialisms |
| `data/schedule.ts` | Weekly class schedule |
| `data/disciplines.ts` | Training discipline definitions |

Always check these before hardcoding any content into components.

---

## Pages (App Router)

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Main landing page |
| `/contacto` | `app/contacto/page.tsx` | Contact info + map |
| `/legal` | `app/legal/page.tsx` | Aviso legal (LSSI-CE) |
| `/privacidad` | `app/privacidad/page.tsx` | Privacy policy (RGPD) |
| `/cookies` | `app/cookies/page.tsx` | Cookie policy |
| 404 | `app/not-found.tsx` | Branded 404 |

---

## API Routes

| Route | Purpose |
|---|---|
| `app/api/contact/route.ts` | Contact form → Resend email |
| `app/api/reviews/route.ts` | Google Reviews fetch |

---

## Image Assets (`public/`)

*This table was regenerated from the codebase on 1 Sept 2026. The previous one had nine stale rows —
it listed files that had been deleted, and files that no component had ever used. Regenerate it
rather than editing by hand; anything not listed here is not referenced.*

| File | Size | Used by |
|---|---|---|
| `coaching-personal.jpg` | 476 KB | Modalities |
| `cta-community.jpg` | 798 KB | CTASection, NutricionPlanificacion |
| `cta-group.jpg` | 2033 KB | PruebaPage |
| `fitnova-logo.svg` | 19 KB | AppBadges |
| `funcional-wallball.jpg` | 725 KB | EntrenamientoFuncional |
| `funcional.jpg` | 725 KB | Training |
| `google62b3d7dd09808aac.html` | 0 KB | crawler / framework, not referenced in code |
| `group-training.jpg` | 500 KB | Modalities, NutricionAlimentacion |
| `gym-crossfit.jpg` | 2513 KB | disciplines |
| `gym-functional.jpg` | 2632 KB | EntrenamientoFuncional, disciplines |
| `gym-rig.jpg` | 2785 KB | EntrenamientoFuncional |
| `gym-wide.jpg` | 2665 KB | Adaptado, EntrenamientoFuncional, Modalities |
| `hero-gym.jpg` | 669 KB | Hero |
| `hyrox/` | 7 files | CTASection, Community, EntrenamientoHyrox, NutricionAlimentacion, NutricionSuplementacion, Schedule, StatementSection, Training, disciplines, page, schedule |
| `hyrox-coaching.jpg` | 2358 KB | EntrenamientoHyrox, disciplines |
| `hyrox-community.jpg` | 1473 KB | NutricionAlimentacion |
| `hyrox-effort.jpg` | 1369 KB | EntrenamientoHyrox, StatementSection |
| `hyrox-group.jpg` | 924 KB | Community, EntrenamientoHyrox, Schedule |
| `hyrox-medball.jpg` | 533 KB | Community, NutricionSuplementacion, disciplines |
| `hyrox-sled.jpg` | 357 KB | Training |
| `hyrox-women.jpg` | 692 KB | Community |
| `icon-192.png` | 7 KB | manifest |
| `icon-512.png` | 24 KB | manifest |
| `jr-skierg.jpg` | 430 KB | EntrenamientoHyrox |
| `mas-que-un-gimnasio.jpg` | 669 KB | Community |
| `nutrition-food.jpg` | 337 KB | NutricionAlimentacion, Nutrition |
| `nutrition-supplements.jpg` | 158 KB | NutricionSuplementacion, Nutrition |
| `nutrition-textil.jpg` | 184 KB | NutricionPlanificacion, Nutrition |
| `og-image.jpg` | 134 KB | layout |
| `portrait-jr.jpg` | 2124 KB | Philosophy |
| `qr-hyrox-grupo.png` | 28 KB | CTASection |
| `relay-jun-26/` | 74 files | Community |
| `relay-may-26/` | 114 files | Community |
| `st-logo-black.png` | 168 KB | layout |
| `st-logo-new.png` | 178 KB | AccesoGate, Footer, Navbar |
| `tienda/` | 5 files | AccesoGate, CartDrawer, Navbar, PackCard, PackDetail, ProductCard, ProductFicha, cart-context, layout, page, products, route, sitemap |
| `trainer-dani.jpg` | 1759 KB | trainers |
| `trainer-jr.jpg` | 2124 KB | Trainers, trainers |
| `trainer-maria.jpg` | 1429 KB | Trainers, trainers |
| `trainer-miguel.jpg` | 1777 KB | Philosophy, Trainers, trainers |
| `trainer-pablo.jpg` | 1759 KB | Trainers |
| `_MG_*.jpg` ×43 | 16 MB | Community — the "Archivo Sport Training" gallery (2024–2025). All 43 are referenced individually |

**Rules for this folder**

- Every file here ships in every deployment. If nothing references it, it does not belong.
- New images follow `docs/image-pipeline.md` — 4000 px long edge, quality 90, unsharp 0.8/90/3.
- **Camera masters never go in here.** They live in the workstation at `photography/web-masters/`.
  `.gitignore` blocks `public/*_orig.jpg` as a backstop.
- `google62b3d7dd09808aac.html` is Google Search Console verification — fetched directly by Google,
  referenced by nothing. **Do not remove.** The same applies to the icons and `og-image.jpg`.

**Cleared 1 Sept 2026** — `public/` went from 990 MB to 143 MB across two commits. 423 MB of
unreferenced assets and every camera master moved to `photography/`; unused images are in
`photography/web-unused/` with a README. The `flash-1` … `flash-7` set, previously listed here as
"Marquee / gallery", was orphaned by commit `db51e75` (27 May 2026) which removed the flash strip —
`components/Marquee.tsx` is a text marquee and never used images at all.

---

## Key Conventions

- Tailwind CSS 4 only — no CSS modules, no inline styles
- Framer Motion for all animations (`motion.div`, `useInView`, `AnimatePresence`)
- Always use Next.js `<Image>` component — never bare `<img>` tags
- **No rounded corners** — `rounded-*` classes are brand violations
- **Gold is `#F1B91E`** — never substitute Tailwind yellow/amber classes
- All new components go in `components/` as `.tsx` files
- Client components need `"use client"` at the top; default to server components

---

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/<feature-slug>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
