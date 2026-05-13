/**
 * Sport Training — Disciplines / Training Modalities Data
 *
 * Source of truth for the four training disciplines displayed in Training.tsx
 * and referenced across the site.
 * Edit here, not inside Training.tsx.
 *
 * Last updated: 2026-05-08
 */

export interface Discipline {
  num: string
  name: string
  tagline: string
  description: string
  href: string
  image: string
  accent: boolean
}

export const disciplines: Discipline[] = [
  {
    num: '01',
    name: 'HYROX',
    tagline: 'Fuerza + Resistencia',
    description: '8km de carrera intercalados con 8 estaciones de trabajo funcional. El estándar global del fitness.',
    href: '/entrenamientos/hyrox',
    image: '/hyrox-medball.jpg',
    accent: true,
  },
  {
    num: '02',
    name: 'FUNCIONAL',
    tagline: 'Base del Movimiento',
    description: 'Patrones naturales: empujar, traccionar, agacharse, rotar. El fundamento de cualquier cuerpo capaz.',
    href: '/entrenamientos/funcional',
    image: '/gym-functional.jpg',
    accent: false,
  },
  {
    num: '03',
    name: 'CROSSTRAINING',
    tagline: 'Alta Intensidad',
    description: 'Halterofilia, gimnasia y trabajo metabólico combinados. Sesiones dinámicas, resultados integrales.',
    href: '/entrenamientos/crosstraining',
    image: '/hyrox-coaching.jpg',
    accent: true,
  },
  {
    num: '04',
    name: 'PERSONAL',
    tagline: 'Atención Individual',
    description: 'Entrenamiento diseñado exclusivamente para ti. Tu entrenador, tu programa, tus resultados.',
    href: '/entrenamientos/personal',
    image: '/gym-crossfit.jpg',
    accent: false,
  },
]
