# Deploy Configuration

**Project:** st-web (Sport Training website)
**Framework:** Next.js 16.2.0
**Host:** Vercel
**Last updated:** 2026-05-08

---

## Stack

| Layer | Detail |
|---|---|
| Framework | Next.js 16.2.0 (App Router) |
| React | 19.2.4 |
| Animation | Framer Motion 12.38.0 |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Node version | LTS (Vercel default) |

---

## Deploy setup

No `vercel.json` exists — Vercel auto-detects Next.js. Deployments triggered automatically on push to the connected Git branch.

**Build command (auto-detected):** `next build`
**Output directory (auto-detected):** `.next`
**Install command (auto-detected):** `npm install`

### next.config.ts

```ts
reactStrictMode: false        // Disabled — Framer Motion compat
images.qualities: [75, 80, 85, 90]  // Next Image quality ladder
```

---

## Environment variables

| Variable | Required | Where to set | Notes |
|---|---|---|---|
| `GOOGLE_PLACES_API_KEY` | For live reviews | `.env.local` + Vercel project env | Currently placeholder — site works without it (shows mock reviews) |

`.env.local` is gitignored. Set production values in Vercel dashboard → Project → Settings → Environment Variables.

---

## Local development

```bash
cd development/st-web
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build (run before deploying to catch errors)
npm run lint       # ESLint check
```

---

## Repo & branch setup

- Git repo exists for st-web
- Intended for eventual client handoff — keep commit history clean
- Clean up GitHub before handoff: remove debug artifacts, confirm .env.local is gitignored, review README

---

## Placeholder content still needing real data

Before full public launch, swap these placeholders in the codebase:

| Placeholder | Location | What's needed from client |
|---|---|---|
| Razón social | `app/(legal)/aviso-legal/page.tsx` | Legal company name |
| NIF/CIF | Same | Tax ID |
| Registro mercantil | Same | Mercantile registry entry |
| Email protección de datos | Same | Data protection contact email |
| Analytics script | `app/layout.tsx` | Decision: GA4, Plausible, or other — then replace Mailchimp `chimpstatic` snippet |
| Google Reviews API key | `.env.local` | API key from Google Cloud Console |
| aggregateRating values | `app/layout.tsx` JSON-LD | Real review count + avg from GBP |
| Opening hours | Same | Confirm exact Mon–Fri and Sat hours |
