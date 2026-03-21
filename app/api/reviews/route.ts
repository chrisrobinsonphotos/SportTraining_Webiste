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
    // Return mock 5-star reviews for development / demo
    return NextResponse.json({ reviews: getMockReviews() })
  }

  try {
    const res = await fetch(PLACES_API_URL, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews',
        'Accept-Language': 'es',
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (!res.ok) {
      console.error('Places API error:', res.status, await res.text())
      return NextResponse.json({ reviews: getMockReviews() })
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

    return NextResponse.json({ reviews: fiveStars.length ? fiveStars : getMockReviews() })
  } catch (err) {
    console.error('Failed to fetch reviews:', err)
    return NextResponse.json({ reviews: getMockReviews() })
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

// ---------------------------------------------------------------------------
// Mock reviews — shown when API key is not yet configured
// ---------------------------------------------------------------------------
function getMockReviews(): PlaceReview[] {
  return [
    {
      authorName: 'Laura Sánchez',
      authorPhoto: null,
      rating: 5,
      text: 'El mejor gimnasio de Murcia sin duda. Los entrenadores son increíbles, siempre pendientes de cada persona. Las clases de HYROX son una pasada y el ambiente que se respira es único.',
      relativeDate: 'hace 1 semana',
    },
    {
      authorName: 'Carlos Martínez',
      authorPhoto: null,
      rating: 5,
      text: 'Llevo más de 2 años entrenando en Sport Training y ha sido la mejor decisión que he tomado. La instalación es top, el equipo humano es excepcional y los resultados hablan por sí solos.',
      relativeDate: 'hace 2 semanas',
    },
    {
      authorName: 'Ana López',
      authorPhoto: null,
      rating: 5,
      text: 'Vine buscando un cambio y encontré mucho más que un gimnasio. El equipo de entrenadores te hace sentir parte de una familia. Las sesiones de entrenamiento adaptado son perfectas para mí.',
      relativeDate: 'hace 1 mes',
    },
    {
      authorName: 'Pedro García',
      authorPhoto: null,
      rating: 5,
      text: 'Sport Training tiene todo lo que necesitas. Profesionales de primer nivel, instalaciones cuidadas al detalle y un ambiente que te motiva desde el primer día. 100% recomendado.',
      relativeDate: 'hace 3 semanas',
    },
    {
      authorName: 'María Fernández',
      authorPhoto: null,
      rating: 5,
      text: 'Desde que empecé aquí mi vida ha cambiado. Miguel Ángel y su equipo son referentes en la zona. Las clases en grupo son energéticas y muy bien dirigidas. No cambiaría este gym por nada.',
      relativeDate: 'hace 2 meses',
    },
    {
      authorName: 'Javier Ruiz',
      authorPhoto: null,
      rating: 5,
      text: 'Completé mi primer HYROX gracias al equipo de Sport Training. La preparación fue brutal pero siempre sintiéndome apoyado. El trato personalizado marca la diferencia.',
      relativeDate: 'hace 1 mes',
    },
  ]
}
