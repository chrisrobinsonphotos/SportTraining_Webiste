# Reviews API — Source Documentation

**File:** `app/api/reviews/route.ts`
**Last updated:** 2026-05-08

---

## What it does

Fetches 5-star Google Reviews for Sport Training from the Google Places API (New) and returns them as JSON. Falls back to hardcoded mock reviews in two cases:
- `GOOGLE_PLACES_API_KEY` is not set or is the placeholder string `your_api_key_here`
- The Places API returns an error

---

## Configuration

| Variable | Where set | Value |
|---|---|---|
| `GOOGLE_PLACES_API_KEY` | `.env.local` | Currently `your_api_key_here` — **needs a real key to show live reviews** |
| `PLACE_ID` | Hardcoded in route.ts line 3 | `ChIJuVi9l42BYw0RSR07cSfzgL0` (Sport Training Murcia GBP ID) |

**To activate live reviews:**
1. Create a Google Cloud project and enable the Places API (New)
2. Generate an API key restricted to the Places API
3. Replace `your_api_key_here` in `.env.local` with the real key
4. On Vercel: add `GOOGLE_PLACES_API_KEY` as an environment variable in the project settings

---

## Data flow

```
Google Places API (New)
  → GET https://places.googleapis.com/v1/places/{PLACE_ID}
  → Filter: rating === 5 only
  → Map to PlaceReview shape: { authorName, authorPhoto, rating, text, relativeDate }
  → Cache: 1 hour (Next.js fetch revalidate)
  → Return: { reviews: PlaceReview[] }
```

If the API key is missing or the call fails, the route returns 11 hardcoded mock reviews in Spanish. The component (`Reviews.tsx`) cannot tell the difference — it just consumes the JSON.

---

## Response shape

```typescript
interface PlaceReview {
  authorName: string
  authorPhoto: string | null  // Google profile photo URL or null
  rating: number              // Always 5 (filtered)
  text: string
  relativeDate: string        // e.g. "hace 1 semana"
}
```

---

## Current status

- **Live reviews:** ❌ Not active — API key is placeholder
- **Mock reviews:** ✅ 11 hardcoded 5-star reviews in Spanish showing on site
- **Cache:** 1 hour when live API is active

---

## To-do before launch

- [ ] Add real `GOOGLE_PLACES_API_KEY` to `.env.local` and Vercel project env vars
- [ ] Confirm Place ID `ChIJuVi9l42BYw0RSR07cSfzgL0` matches the live GBP listing
- [ ] Test live API response and confirm review count (min 5 real 5-star reviews needed)
