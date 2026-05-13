# Booking Integration — FitNova
**Sport Training · Website**
Last updated: 2026-05-08

> Sport Training uses **FitNova** as its class booking and member management platform. This document covers what FitNova provides, how it currently connects (or should connect) to the website, and the options for deeper integration.

---

## What FitNova handles

FitNova is Sport Training's all-in-one gym management platform. It covers:

- Member database and profiles
- Class scheduling and capacity management
- Online class booking (member-facing)
- Membership billing and payments
- Check-in / attendance tracking
- Reporting and analytics

The `marketing/_clients_Internal_FitNova/` folder in the workstation contains CRM reference material for working with FitNova data.

---

## Current state

| Item | Status |
|---|---|
| FitNova account | Active |
| Members using FitNova for booking | TBC — confirm with Jr. |
| FitNova booking widget on website | `[TBC: not currently implemented]` |
| Direct API integration | `[TBC: not implemented]` |
| FitNova public booking URL | `[TBC: get from Jr.]` |

---

## Integration options

### Option A — Embedded booking widget (recommended for now)

Most gym software platforms including FitNova provide an embeddable booking widget — a snippet of JavaScript that renders a booking flow inside an `<iframe>` or inline on the page.

**How to implement:**
1. Log into FitNova → Settings → Integrations / Website Widget
2. Copy the embed code snippet
3. Create a `/reserva` or `/clases` page in the Next.js app
4. Drop the embed snippet inside a `use client` component

**Pros:** Fast to ship, no custom backend, FitNova handles all booking logic.
**Cons:** Styling is limited to what FitNova's widget allows — may not match the brand perfectly.

### Option B — Link out to FitNova booking portal

The simplest path: CTA buttons on the website open the FitNova member portal in a new tab.

**How to implement:**
- Get the public FitNova booking URL from Jr. `[TBC]`
- Replace any booking CTAs on the site with `href="[fitnova-url]" target="_blank"`

**Pros:** Zero development work, always in sync with what's in FitNova.
**Cons:** Breaks the user flow — they leave the site to book.

### Option C — FitNova API integration (future)

If FitNova exposes a REST API, we can pull class schedule data directly into the website and render the schedule natively, with a "Book" button that deep-links into FitNova.

**Prerequisites:** Confirm FitNova API availability with Jr. / FitNova support. Requires API key.

---

## Recommended approach

**Now:** Option B — add FitNova booking URL to existing CTA buttons. Zero risk, immediate.
**Next:** Option A — embed the widget on a dedicated `/reserva` page once the booking URL and widget code are confirmed.
**Later:** Option C — only if FitNova API is available and the schedule component needs to stay in sync automatically.

---

## What's needed from Jr. / Sr.

- [ ] FitNova public booking URL (for Option B CTAs)
- [ ] FitNova widget embed code (for Option A)
- [ ] Confirm whether members are already using FitNova to book, or if booking is still manual
- [ ] Confirm which classes should be bookable online vs. contact-only

---

## Website touchpoints

Pages and components that should link to or embed FitNova once connected:

| Location | Component | Current state | Target state |
|---|---|---|---|
| Homepage hero | `Hero.tsx` — "Reserva Tu Plaza" CTA | Links to `/contacto` | Link to FitNova booking |
| Schedule section | `Schedule.tsx` | Displays classes, no booking | Add "Reservar" button per class |
| Memberships section | `Memberships.tsx` | Links to `/contacto` | Keep for leads; add "Reservar clase" for existing members |
| Contact page | `/contacto` | Lead form | Keep as lead capture; booking goes elsewhere |
| New page | `/reserva` | Does not exist | Create as home for the FitNova embed widget |

---

## Reference

- Schedule data file: `data/schedule.ts`
- Class library: `../../business/class-library.md`
- Contact form (lead capture): `../../marketing/` §4.5 in system audit
