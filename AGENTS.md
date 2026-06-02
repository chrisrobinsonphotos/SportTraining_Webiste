<!-- BEGIN:nextjs-agent-rules -->
# Agent Guidelines — Sport Training Website

## Before you write any code
Read `CLAUDE.md` — it has the full project brief, component inventory, design tokens, and image asset index.  
Read `SITE_MAP.md` — it has the route inventory and open action items.

## Stack
- **Framework:** Next.js 16.2 with App Router (not Pages Router)
- **Language:** TypeScript — no plain `.js` or `.jsx` files
- **Styling:** Tailwind CSS v4 — config in `postcss.config.mjs`, not `tailwind.config.js`
- **Animations:** Framer Motion — use `motion.*` components and `useInView` hook
- **Images:** Next.js `<Image>` component only — never `<img>` tags
- **Email:** Resend (via `app/api/contact/route.ts`)

## Design rules — non-negotiable
- **Gold is `#F1B91E`** — never use Tailwind yellow/amber/orange as a substitute
- **No rounded corners** — `rounded-*` classes are brand violations
- **Dark backgrounds only** — `#0a0a0a`, `#111111`, or `#191919`
- **Barlow Condensed uppercase** for all display/heading type
- **Hard-edged, industrial aesthetic** — no softness, no gradients, no pastel tones

## Component and data conventions
- Check `data/` files before hardcoding any content (trainers, schedule, disciplines are all data-driven)
- Check `components/` before creating a new component — it may already exist
- New components go in `components/` as `.tsx` files
- Default to server components; add `"use client"` only when needed (event handlers, hooks, animations)

## Next.js 16.2 notes
This version may have breaking changes from your training data. If in doubt about an API:
1. Check `node_modules/next/dist/` for the actual implementation
2. Check existing working code in this repo before writing new patterns
<!-- END:nextjs-agent-rules -->
