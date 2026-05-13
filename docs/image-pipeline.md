# Image Optimisation Pipeline
**Sport Training Website · st-web**
Last updated: 2026-05-08

---

## Current state — what needs fixing

Several source images in `/public` are raw camera JPEGs at 24–40 MB each. Next.js serves these through the `<Image>` component with on-the-fly optimisation (WebP conversion, resizing), but the source files are still massive. This affects:

- **Build time** on Vercel — large files slow the build
- **Vercel bandwidth** — every unique size/quality combo is generated and cached on first hit
- **Cold-start latency** — uncached images take noticeably longer on first load
- **Repository size** — 870 MB in `public/` is too heavy for a Git-tracked web project

**Worst offenders (confirm before next deploy):**

| File | Current size | Problem |
|---|---|---|
| `flash-3.jpg` | 40 MB | Raw camera JPEG — resize + compress |
| `hyrox-coaching.jpg` | 39 MB | Raw camera JPEG — resize + compress |
| `hyrox-team.jpg` | 36 MB | Raw camera JPEG — resize + compress |
| `flash-1.jpg` / `flash-7.jpg` | 36 / 34 MB | Raw camera JPEG — resize + compress |
| `hyrox-community.jpg` | 33 MB | Raw camera JPEG — resize + compress |
| `mas-que-un-gimnasio.jpg` | 29 MB | Raw camera JPEG — resize + compress |
| *(multiple others 23–31 MB)* | — | Same |

Target: **all source files in `public/` under 500 KB** before Next.js optimisation runs.

---

## How image optimisation works in this project

The site uses Next.js `<Image>` (next/image). The component handles:

- **Automatic WebP/AVIF conversion** on the fly at request time
- **Responsive sizing** via the `sizes` prop (e.g. `sizes="33vw"`)
- **Lazy loading** by default — images off-screen don't load until scroll
- **Caching** — optimised variants are cached in Vercel's CDN after first request

**What it does NOT do automatically:**
- Compress your source files before upload
- Rename or organise your files
- Replace raw camera files with web-ready versions

Everything in this doc describes what you do **before** placing images into `/public`.

---

## Quality settings (current `next.config.ts`)

```ts
images: {
  qualities: [75, 80, 85, 90],
}
```

These are the quality levels available to the Image component when a `quality` prop is passed. Default is 75 if not specified. For most photos on the site, 80 is sufficient and produces good compression without visible loss.

---

## Target specs before uploading to `/public`

| Image type | Max width | Max file size | Format | Notes |
|---|---|---|---|---|
| Hero / full-bleed background | 2400 px | 300 KB | JPEG | Used with `fill` + `object-cover` — this is the largest you need |
| Section background (Philosophy, CTASection, Adaptado) | 1800 px | 200 KB | JPEG | |
| Modality images (Modalities.tsx) | 1200 px | 150 KB | JPEG | |
| Community gallery images | 1200 px | 120 KB | JPEG | |
| Trainer portraits | 800 px wide | 80 KB | JPEG | `portrait-miguel.jpg`, `portrait-jr.jpg`, etc. |
| Avatars (reviews) | 200 px | 20 KB | JPEG | `avatar-1.jpg` through `avatar-6.jpg` |
| Logo (light/dark) | — | 10 KB | PNG or SVG | Use SVG source where possible |
| OG / social card | 1200 × 630 px | 150 KB | PNG | `opengraph-image.png` — already correct |
| Favicon / app icons | per spec | per spec | PNG | Already correct — do not change |

---

## Step-by-step workflow for adding a new image

### 1. Export from Capture One / Lightroom / Finder

- Export as JPEG, sRGB, quality 85–90 (you'll compress further in step 3)
- Export at the correct max width for the use case (table above)
- Do **not** export at original resolution

### 2. Rename before upload

Use the naming convention: `[descriptor]-[use].[ext]` — lowercase, hyphens, no underscores.

Examples:
- `hyrox-sled-push.jpg` — not `IMG_4758.jpg`
- `trainer-pablo-portrait.jpg` — not `pablo spagnuolo.jpg`
- `gym-rig-wide.jpg` — not `_MG_5256.jpg`

The existing `_MG_*.jpg` files need renaming before they can be properly referenced in components.

### 3. Compress with Squash (installed on Mac)

Squash is already in your Applications. Drop the exported image in, target output:
- JPEG quality: **80**
- Target size: within the table above
- Output format: JPEG (not WebP — Next.js handles conversion)

Alternative: use `npx @squoosh/cli` in the terminal if batch processing.

### 4. Place in `/public`

Drop the compressed file into `development/st-web/public/`. Do not create subfolders — Next.js serves from the root of `public/`.

### 5. Reference in the component

```tsx
<Image
  src="/your-new-image.jpg"
  alt="Descriptive alt text — keyword-rich, sentence structure"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
  quality={80}
/>
```

The `sizes` prop is critical — it tells the browser what size the image renders at so it can request the right optimised version. If it's wrong or missing, Next.js defaults to 100vw which wastes bandwidth on mobile.

---

## Priority cleanup pass (do before next major deploy)

Run this as a one-time pass on the worst offenders:

1. Open Squash
2. Drag in every `flash-*.jpg` and `hyrox-*.jpg` — these are the raw camera files
3. Set target: 2400px max width, JPEG 80 quality
4. Replace the originals in `/public`
5. Verify the site builds and loads correctly on localhost
6. Push and deploy

Expected outcome: `public/` goes from ~870 MB to under 30 MB. Every page should load significantly faster.

---

## Files that don't go through the `<Image>` component

Some files in `public/` are used outside Next.js Image — manifest icons, favicon, OG image. These are already correctly sized. Do not resize them.

| File | Use | Size status |
|---|---|---|
| `icon-192.png` / `icon-512.png` | PWA manifest | ✅ Correct |
| `apple-icon.png` | iOS home screen | ✅ Correct |
| `favicon.ico` | Browser tab | ✅ Correct |
| `opengraph-image.png` | OG / social card | ✅ Correct |
| `site.webmanifest` | PWA config | ✅ Not an image |

---

## Next steps

- [ ] Batch-compress the 40MB–24MB JPEGs (see priority cleanup pass above)
- [ ] Rename all `_MG_*.jpg` files using the naming convention
- [ ] Audit `sizes` props across all `<Image>` usages — several components may be missing or using `100vw` across the board
- [ ] Once `public/` is cleaned up, revisit the `public/` vs `website-materials/images/` overlap question (held in system-audit §4 Q4)

---

## Reference

- `development/st-web/next.config.ts` — quality settings
- Next.js Image docs: https://nextjs.org/docs/app/api-reference/components/image
- Squash (macOS): Applications/Squash
