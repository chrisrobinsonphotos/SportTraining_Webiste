# Design system pass — "Nutrición cleanness" + systematized type scale

Status: **SHIPPED** — landed in commit `19db015` (June 2026), refined in `f6cc0b9`. (Historical doc, kept for reference.)
Visual + production-build verification still pending (couldn't render headless in the work environment) — preview on your machine before we ship.

## What this pass did
1. Established one shared design system in `app/globals.css` (additive).
2. Collapsed the site's ~22 ad-hoc font sizes down to a single 8-step scale, applied everywhere.
3. Standardized eyebrows/labels and removed sub-12px micro-text (two intentional exceptions, below).
4. Content-fit the Training section so its two tiles no longer float in a ~600px void.

**No content was added or removed.** Same sections, same disciplines (HYROX + Funcional), same copy, same images. This was purely type / spacing / layout of existing content.

## The system (`app/globals.css`)
Type scale (the only sizes used site-wide):

| token | size | role |
|---|---|---|
| `--fs-display` | clamp(3.5rem,8vw,7.5rem) | hero H1 (was up to 192px) |
| `--fs-h1` | clamp(2.8rem,5.5vw,5rem) | section heading |
| `--fs-h2` | clamp(2rem,3.2vw,2.8rem) | subsection / tile title |
| `--fs-h3` | clamp(1.4rem,1.8vw,1.6rem) | card title |
| `--fs-lead` | clamp(1.05rem,1.3vw,1.2rem) / lh 1.7 | intro copy |
| `--fs-body` | 1rem / lh 1.6 | body |
| `--fs-small` | 0.875rem | meta / secondary |
| `--fs-label` | 0.75rem uppercase | eyebrows / labels (12px floor) |

Plus layout primitives: `--section-pad-y/x`, `--container-max`, and helper classes `.st-section`, `.st-container`, `.st-measure`, `.t-display … .t-label`. `.section-label` now maps to the `label` step, so every eyebrow using it snapped into line at once.

## Per-section changes
- **Hero** — headline capped 192px → `display` (~120px); value-prop line lifted from 17px/weight-300/50%-white and **moved out from under the buttons to directly beneath the headline** as `lead` at 78% white; button + stat labels off micro-text.
- **Training** — removed `min-h-screen` so the section is content-fit (kills the void under the two tiles); heading, note, tile name, body → scale. Still the two real disciplines.
- **Modalities** — heading, tier names, price, features, range, badges, "Empezar" buttons all → scale; faint range/prefix nudged up slightly for legibility.
- **Philosophy, StatementSection, Adaptado, Nutrition, CommunityStatement, Community, Schedule, Trainers, Reviews, CTASection** — recurring heading/subsection/lead sizes mapped to tokens; micro-text lifted.
- **Nutrición sub-pages** (alimentacion / planificacion / suplementacion) — only the sub-12px content labels lifted to the 12px floor so they're on-scale too. Layout, charts, and structure untouched.
- **ContactModal, PruebaPage** — sub-12px labels lifted.

## Deliberately deferred (need your eyes — I couldn't see them)
- **Section-height / dead-space fixes** on the *complex* sections (Philosophy, Adaptado, CTASection, the statement blocks) — these use `min-h-screen` / `100vh` with absolutely-positioned imagery and vertical centering, so removing forced height blind risks breaking layout. Best done with the page in front of us.
- **Color / contrast** tweaks (faint gold taglines, low-opacity greys) — left for the prioritized adjustment phase.

## Intentional exceptions to the 12px floor
- SVG **chart axis labels** on the Nutrición pages (8–9px) — data-viz annotations.
- **AppBadges** store-badge fine print — replicates the official App Store / Google Play lockups.

## To preview
```
cd ~/Developer/CoworkOS/Clients/SportTraining/development/st-web && npm run dev
```
Open http://localhost:3000 — tell me it's up and I'll drive your browser through each section for the before/after. Nothing is committed or pushed.
