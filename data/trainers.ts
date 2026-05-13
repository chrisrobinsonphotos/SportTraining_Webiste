/**
 * Sport Training — Trainer Data
 *
 * Source of truth for trainer profiles displayed on the website.
 * Edit here, not inside Trainers.tsx.
 *
 * ⚠️  Trainer last names and specialities are placeholders.
 * Confirm full names, roles, and specialities with Jr. before launch.
 * Real team: Miguel Ángel Sr., Miguel Ángel Jr., Pablo, Maria.
 *
 * Last updated: 2026-05-08
 */

export interface Trainer {
  num: string
  name: string
  role: string
  since: string
  specialities: string[]
  image: string
}

export const trainers: Trainer[] = [
  {
    num: '01',
    name: 'Miguel Ángel',
    role: 'Fundador · Head Coach',
    since: 'Est. 2007',
    specialities: ['Entrenamiento Funcional', 'HYROX', 'Fuerza'],
    image: '/trainer-miguel.jpg',
  },
  {
    num: '02',
    name: 'Miguel Ángel Jr.',
    role: 'Entrenador Personal',
    since: 'Sport Training',
    specialities: ['CrossTraining', 'Rendimiento', 'HYROX'],
    image: '/trainer-jr.jpg',
  },
  {
    num: '03',
    name: 'María',           // ⚠️ Confirm full name
    role: 'Entrenadora · Grupo',
    since: 'Sport Training',
    specialities: ['Entrenamiento en Grupo', 'Movilidad', 'Adaptado'],
    image: '/trainer-maria.jpg',
  },
  {
    num: '04',
    name: 'Pablo',           // ⚠️ Confirm full name
    role: 'Entrenador Personal',
    since: 'Sport Training',
    specialities: ['Fuerza', 'Acondicionamiento', 'Nutrición'],
    image: '/trainer-dani.jpg', // ⚠️ Confirm correct image file
  },
]
