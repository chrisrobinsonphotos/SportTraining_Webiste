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

**Core brand images — used in components:**
| File | Used in |
|---|---|
| `logo-transparent.png` | Navbar, Footer |
| `st-logo-black.png` | Light-bg contexts |
| `og-image.jpg` | OG share image (1200×630, placeholder) |
| `portrait-jr.jpg`, `portrait-miguel.jpg` | Trainer cards |
| `jr-hyrox-win.jpg`, `jr-skierg.jpg`, `jr-sled.jpg`, `jr-wallball.jpg` | Hero / training sections |
| `trainer-maria.jpg`, `trainer-miguel.jpg` | Trainer section |
| `coaching-personal.jpg` | Modalities card |
| `cta-community.jpg`, `cta-group.jpg` | CTA section backgrounds |
| `funcional-wallball.jpg` | Training / modalities |
| `mas-que-un-gimnasio.jpg` | Philosophy / community |
| `nutrition-food.jpg`, `nutrition-supplements.jpg`, `nutrition-textil.jpg` | Nutrition section |
| `avatar-1.jpg` … `avatar-6.jpg` | Reviews avatars |
| `flash-1.jpg` … `flash-7.jpg` | Marquee / gallery |
| `hyrox-team.jpg`, `hyrox-women.jpg` | HYROX sections |

**Event photography (not used in main UI):**
- `_MG_*.jpg` — raw event photos (bulk)
- `relay-may-26/` — Relay Race May 2026 event
- `RelayDay_Mayo_26'/` — same event, alternate folder

**Documents:**
- `SportTraining-Brochure-HQ.pdf` / `_compressed.pdf` — membership brochure
- `google62b3d7dd09808aac.html` — Google Search Console verification (do not remove)

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
