import { NextResponse } from 'next/server'

const PLACE_ID = 'ChIJuVi9l42BYw0RSR07cSfzgL0'
const PLACES_API_URL = `https://places.googleapis.com/v1/places/${PLACE_ID}`

export interface PlaceReview {
  authorName: string
  authorPhoto: string | null
  rating: number
  text: string
  relativeDate: string
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey || apiKey === 'your_api_key_here') {
    console.error('GOOGLE_PLACES_API_KEY is not configured — serving no reviews')
    return NextResponse.json({ reviews: [] })
  }

  try {
    const res = await fetch(PLACES_API_URL, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews',
        'Accept-Language': 'es',
      },
      next: { revalidate: 86400 }, // cache for 24h — reviews change a few times a month,
      // and the `reviews` field mask bills at the highest Places SKU. 24h keeps this
      // to ~30 calls/month, well inside the free allowance. A new review appears
      // on the site within a day.
    })

    if (!res.ok) {
      console.error('Places API error:', res.status, await res.text())
      return NextResponse.json({ reviews: [] })
    }

    const data = await res.json()
    const raw: GoogleReview[] = data.reviews ?? []

    const fiveStars: PlaceReview[] = raw
      .filter((r) => r.rating === 5)
      .map((r) => ({
        authorName: r.authorAttribution?.displayName ?? 'Anónimo',
        authorPhoto: r.authorAttribution?.photoUri ?? null,
        rating: r.rating,
        text: r.text?.text ?? r.originalText?.text ?? '',
        relativeDate: r.relativePublishTimeDescription ?? '',
      }))

    return NextResponse.json({ reviews: fiveStars })
  } catch (err) {
    console.error('Failed to fetch reviews:', err)
    return NextResponse.json({ reviews: [] })
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface GoogleReview {
  name: string
  rating: number
  relativePublishTimeDescription?: string
  text?: { text: string; languageCode: string }
  originalText?: { text: string; languageCode: string }
  authorAttribution?: {
    displayName: string
    uri?: string
    photoUri?: string
  }
  publishTime?: string
}
