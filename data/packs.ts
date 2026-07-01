/**
 * Sport Training — Tienda · Packs de Objetivos
 *
 * From the Nutrición Dossier, Bloque 5.2: product bundles selected to work in
 * synergy, offered at a discount vs. buying each item individually to incentivise
 * a complete protocol.
 *
 * PLACEHOLDERS until confirmed with María José:
 *   - discountPct   → the exclusive pack discount vs. individual purchase
 *   - priceEUR      → final pack price (or derived from members − discount)
 *   - stripePriceId → Stripe Price ID for the bundle
 * Member composition below is a proposed starting point — confirm with Miguel.
 *
 * Last updated: 2026-07-01
 */

import type { ProductCategory } from './products'

export interface Pack {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  /** Why these products belong together — rendered as "Por qué juntos" on the pack page. */
  synergy: string[]
  /** Product ids (see data/products.ts) included in the bundle. */
  productIds: string[]
  category: ProductCategory
  /** Exclusive discount vs. buying the items separately (%). Placeholder. */
  discountPct: number | null
  priceEUR: number | null
  stripePriceId: string | null
  inStock: boolean
}

export const packs: Pack[] = [
  {
    id: 'pack-fuerza-potencia',
    slug: 'pack-fuerza-y-potencia',
    name: 'Pack Fuerza y Potencia',
    tagline: 'Para entrenar más fuerte y recuperar mejor entre series',
    description:
      'La base para quien busca fuerza y potencia: proteína para cubrir tus necesidades diarias y favorecer la recuperación, más creatina para sostener la intensidad repetición tras repetición.',
    synergy: [
      'Fuerza y recuperación son las dos caras del mismo trabajo. La creatina te permite sostener la intensidad: regenera el ATP con mayor rapidez, así mantienes más repeticiones y más series con calidad.',
      'La proteína cubre lo que viene después: el aporte diario que tus músculos necesitan para recuperarse y adaptarse a ese esfuerzo. Una impulsa el entrenamiento; la otra lo consolida.',
      'Son, además, los dos suplementos con mayor respaldo científico para la fuerza y el rendimiento. No sustituyen al entrenamiento ni a una buena alimentación: los potencian.',
    ],
    productIds: ['whey-protein', 'creatina-gummies'],
    category: 'Rendimiento',
    discountPct: 15, // vs sum of individual charge prices
    priceEUR: 63.23, // 15% off member nets (42,99+29,99), grossed for Stripe
    stripePriceId: null,
    inStock: true,
  },
  {
    id: 'pack-recuperacion-optima',
    slug: 'pack-recuperacion-optima',
    name: 'Pack Recuperación Óptima',
    tagline: 'Recupera, descansa y vuelve a rendir',
    description:
      'Pensado para la recuperación entre sesiones: proteína para reparar el tejido muscular y magnesio bisglicinato para apoyar la función muscular y nerviosa y reducir el cansancio.',
    synergy: [
      'Entrenar es solo la mitad. La otra mitad es recuperar, y ahí es donde se sostiene la constancia.',
      'La proteína repara: aporta los aminoácidos que tus músculos necesitan para reconstruirse tras el esfuerzo. El magnesio actúa por debajo: contribuye al funcionamiento normal de los músculos y del sistema nervioso, y ayuda a reducir el cansancio y la fatiga.',
      'Reparar el tejido y apoyar la función muscular y nerviosa son piezas del mismo proceso. Este pack cubre ambas para que llegues a la siguiente sesión en condiciones, no arrastrando la anterior.',
    ],
    productIds: ['whey-protein', 'magnesio'],
    category: 'Recuperación',
    discountPct: 15, // vs sum of individual charge prices
    priceEUR: 52.01, // 15% off member nets (42,99+16,99), grossed for Stripe
    stripePriceId: null,
    inStock: true,
  },
  {
    id: 'pack-salud-bienestar',
    slug: 'pack-salud-y-bienestar',
    name: 'Pack Salud y Bienestar',
    tagline: 'El cuidado de fondo para quien entrena de forma habitual',
    description:
      'Los fundamentos que la dieta no siempre cubre: Omega-3 de alta concentración, Vitamina D3 + K2 para huesos y músculos, y magnesio para el metabolismo energético y el sistema nervioso.',
    synergy: [
      'No es un pack para rendir más en la sala. Es la base que sostiene lo demás: la salud sobre la que se construye entrenar de forma habitual durante años.',
      'Cubre tres carencias frecuentes en quien entrena. El Omega-3 (EPA y DHA) contribuye al funcionamiento normal del corazón. La Vitamina D3 + K2 favorece el mantenimiento de huesos y músculos y el correcto aprovechamiento del calcio. El magnesio participa en el metabolismo energético y el funcionamiento del sistema nervioso, y ayuda a reducir el cansancio.',
      'Tres fundamentos que la alimentación no siempre cubre, en una sola rutina diaria. No sustituyen una dieta equilibrada: la completan.',
    ],
    productIds: ['omega-3', 'vitamina-d3-k2', 'magnesio'],
    category: 'Salud',
    discountPct: 15, // vs sum of individual charge prices
    priceEUR: 43.38, // 15% off member nets (15,99+16,99+16,99), grossed for Stripe
    stripePriceId: null,
    inStock: true,
  },
]

export const packBySlug = (slug: string): Pack | undefined =>
  packs.find((p) => p.slug === slug)
