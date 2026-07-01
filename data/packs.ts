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
    productIds: ['whey-protein', 'creatina-gummies'],
    category: 'Rendimiento',
    discountPct: 15, // ~PLACEHOLDER
    priceEUR: 49.9, // ~PLACEHOLDER — confirm with María José
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
    productIds: ['whey-protein', 'magnesio'],
    category: 'Recuperación',
    discountPct: 15, // ~PLACEHOLDER
    priceEUR: 44.9, // ~PLACEHOLDER — confirm con María José
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
    productIds: ['omega-3', 'vitamina-d3-k2', 'magnesio'],
    category: 'Salud',
    discountPct: 15, // ~PLACEHOLDER
    priceEUR: 46.9, // ~PLACEHOLDER — confirm con María José
    stripePriceId: null,
    inStock: true,
  },
]

export const packBySlug = (slug: string): Pack | undefined =>
  packs.find((p) => p.slug === slug)
