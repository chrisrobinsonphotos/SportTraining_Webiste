/**
 * Sport Training — Class Schedule Data
 *
 * Source of truth for the weekly schedule.
 * Edit here, not inside Schedule.tsx.
 *
 * When ready to decouple the component from hardcoded data,
 * import this file into Schedule.tsx and replace the inline `schedule` const.
 *
 * Last updated: 2026-05-08
 *
 * ⚠️  PLACEHOLDER DATA — trainer names, taken counts, and slot times are
 * illustrative and do not reflect real staff or live availability.
 * Replace with confirmed data from the client before public launch.
 * Real trainers: Miguel Ángel Sr., Miguel Ángel Jr., Pablo, Maria.
 */

export type ClassType = 'grupo' | 'hyrox' | 'crossfit' | 'personal'

export interface ClassSlot {
  time: string
  name: string
  taken: number
  max: number
  trainer: string
  type: ClassType
}

export const typeConfig: Record<ClassType, { label: string; color: string }> = {
  hyrox:    { label: 'HYROX',               color: '#F1B91E' },
  crossfit: { label: 'CrossFit',            color: '#E84393' },
  grupo:    { label: 'Entrenamiento Grupo', color: '#4CA3FF' },
  personal: { label: 'Personal Training',  color: '#CCCCCC' },
}

export const schedule: Record<string, ClassSlot[]> = {
  LUN: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Jose Maria Sandoval',                  type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 10, max: 15, trainer: 'Laura López · Marisa García',          type: 'grupo' },
    { time: '09:15', name: 'Entrenamiento en Grupo', taken: 9,  max: 15, trainer: 'Pepa Yepes · Isabel Valcárcel',        type: 'grupo' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '16:00', name: 'CrossFit',               taken: 2,  max: 15, trainer: 'Cristina Villa · Borja Roth',          type: 'crossfit' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 6,  max: 15, trainer: 'Nuria García · Noe Gil',               type: 'grupo' },
    { time: '18:00', name: 'HYROX',                  taken: 7,  max: 15, trainer: 'Maria Ángeles',                        type: 'hyrox' },
    { time: '19:00', name: 'HYROX',                  taken: 8,  max: 15, trainer: 'Maria Ángeles · Pedro Nicolás',        type: 'hyrox' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 8,  max: 15, trainer: 'Dani Montesinos · Laura Guillén',      type: 'grupo' },
  ],
  MAR: [
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 7,  max: 15, trainer: 'Laura López · Marisa García',          type: 'grupo' },
    { time: '09:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Elena García Puerma',                  type: 'personal' },
    { time: '09:15', name: 'HYROX',                  taken: 6,  max: 15, trainer: 'Pepa Yepes',                           type: 'hyrox' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '17:00', name: 'CrossFit',               taken: 3,  max: 15, trainer: 'Beatriz García · José I. Andújar',     type: 'crossfit' },
    { time: '18:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Javier Cáscales',                      type: 'personal' },
    { time: '18:00', name: 'HYROX',                  taken: 6,  max: 15, trainer: 'Mª Ángeles Martínez · Mario Jover',   type: 'hyrox' },
    { time: '19:00', name: 'Entrenamiento en Grupo', taken: 5,  max: 15, trainer: 'Nuria García',                         type: 'grupo' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 5,  max: 15, trainer: 'Laura Guillén · Jesús Bayano',         type: 'grupo' },
  ],
  MIÉ: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Jose Maria Sandoval',                  type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 6,  max: 15, trainer: 'Marisa García · Mª José Moreno',       type: 'grupo' },
    { time: '09:15', name: 'Entrenamiento en Grupo', taken: 7,  max: 15, trainer: 'Pepa Yepes · Isabel Valcárcel',        type: 'grupo' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '16:00', name: 'HYROX',                  taken: 3,  max: 15, trainer: 'Cristina Villa · Isabel Olivares',     type: 'hyrox' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 5,  max: 15, trainer: 'Nuria García · Pedro Nicolás',         type: 'grupo' },
    { time: '18:00', name: 'Entrenamiento en Grupo', taken: 4,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '19:00', name: 'CrossFit',               taken: 0,  max: 15, trainer: 'Cristina Villa',                       type: 'crossfit' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 7,  max: 15, trainer: 'Laura Guillén · Raquel Villaescusa',   type: 'grupo' },
  ],
  JUE: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'PAYPA 2012 · SL Molina',              type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 6,  max: 15, trainer: 'Marisa García · José A. López',        type: 'grupo' },
    { time: '09:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Elena García Puerma',                  type: 'personal' },
    { time: '09:15', name: 'HYROX',                  taken: 4,  max: 15, trainer: 'Pepa Yepes',                           type: 'hyrox' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '16:00', name: 'CrossFit',               taken: 0,  max: 15, trainer: 'Cristina Villa',                       type: 'crossfit' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 3,  max: 15, trainer: 'Dani Montesinos',                      type: 'grupo' },
    { time: '18:00', name: 'HYROX',                  taken: 5,  max: 15, trainer: 'Maria Ángeles',                        type: 'hyrox' },
    { time: '18:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Javier Cáscales',                      type: 'personal' },
    { time: '19:00', name: 'HYROX',                  taken: 5,  max: 15, trainer: 'Cristina Nicolás · Juan Belchi',       type: 'hyrox' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 3,  max: 15, trainer: 'Bianca Escámez · Raquel Villaescusa',  type: 'grupo' },
  ],
  VIE: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Jose Maria Sandoval',                  type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '09:15', name: 'Entrenamiento en Grupo', taken: 2,  max: 15, trainer: 'Isabel Valcárcel · Silvia López',      type: 'grupo' },
    { time: '16:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Nuria García',                         type: 'grupo' },
    { time: '18:00', name: 'CrossFit',               taken: 0,  max: 15, trainer: 'Cristina Villa',                       type: 'crossfit' },
    { time: '18:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Javier Cáscales',                      type: 'personal' },
    { time: '19:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Laura Guillén',                        type: 'grupo' },
  ],
  SÁB: [
    { time: '10:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles',                        type: 'grupo' },
    { time: '11:00', name: 'HYROX',                  taken: 0,  max: 15, trainer: 'Pepa Yepes',                           type: 'hyrox' },
  ],
}

export const days = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'] as const
export type Day = typeof days[number]
