'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'

type ClassType = 'grupo' | 'hyrox' | 'crossfit' | 'personal'

interface ClassSlot {
  time: string
  name: string
  taken: number
  max: number
  trainer: string
  type: ClassType
}

const typeConfig: Record<ClassType, { label: string; color: string; border: string; glow: string }> = {
  hyrox:    { label: 'HYROX',               color: '#F1B91E', border: 'border-[#F1B91E]/25', glow: 'shadow-[0_0_30px_rgba(241,185,30,0.08)]' },
  crossfit: { label: 'CrossFit',            color: '#E84393', border: 'border-[#E84393]/25', glow: 'shadow-[0_0_30px_rgba(232,67,147,0.08)]' },
  grupo:    { label: 'Entrenamiento Grupo', color: '#4CA3FF', border: 'border-[#4CA3FF]/20', glow: 'shadow-[0_0_30px_rgba(76,163,255,0.06)]' },
  personal: { label: 'Personal Training',  color: '#CCCCCC', border: 'border-white/15',      glow: '' },
}

const schedule: Record<string, ClassSlot[]> = {
  LUN: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Jose Maria Sandoval', type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 10, max: 15, trainer: 'Laura López · Marisa García', type: 'grupo' },
    { time: '09:15', name: 'Entrenamiento en Grupo', taken: 9,  max: 15, trainer: 'Pepa Yepes · Isabel Valcárcel', type: 'grupo' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '16:00', name: 'CrossFit',               taken: 2,  max: 15, trainer: 'Cristina Villa · Borja Roth', type: 'crossfit' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 6,  max: 15, trainer: 'Nuria García · Noe Gil', type: 'grupo' },
    { time: '18:00', name: 'HYROX',                  taken: 7,  max: 15, trainer: 'Maria Ángeles', type: 'hyrox' },
    { time: '19:00', name: 'HYROX',                  taken: 8,  max: 15, trainer: 'Maria Ángeles · Pedro Nicolás', type: 'hyrox' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 8,  max: 15, trainer: 'Dani Montesinos · Laura Guillén', type: 'grupo' },
  ],
  MAR: [
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 7,  max: 15, trainer: 'Laura López · Marisa García', type: 'grupo' },
    { time: '09:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Elena García Puerma', type: 'personal' },
    { time: '09:15', name: 'HYROX',                  taken: 6,  max: 15, trainer: 'Pepa Yepes', type: 'hyrox' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '17:00', name: 'CrossFit',               taken: 3,  max: 15, trainer: 'Beatriz García · José I. Andújar', type: 'crossfit' },
    { time: '18:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Javier Cáscales', type: 'personal' },
    { time: '18:00', name: 'HYROX',                  taken: 6,  max: 15, trainer: 'Mª Ángeles Martínez · Mario Jover', type: 'hyrox' },
    { time: '19:00', name: 'Entrenamiento en Grupo', taken: 5,  max: 15, trainer: 'Nuria García', type: 'grupo' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 5,  max: 15, trainer: 'Laura Guillén · Jesús Bayano', type: 'grupo' },
  ],
  MIÉ: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Jose Maria Sandoval', type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 6,  max: 15, trainer: 'Marisa García · Mª José Moreno', type: 'grupo' },
    { time: '09:15', name: 'Entrenamiento en Grupo', taken: 7,  max: 15, trainer: 'Pepa Yepes · Isabel Valcárcel', type: 'grupo' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '16:00', name: 'HYROX',                  taken: 3,  max: 15, trainer: 'Cristina Villa · Isabel Olivares', type: 'hyrox' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 5,  max: 15, trainer: 'Nuria García · Pedro Nicolás', type: 'grupo' },
    { time: '18:00', name: 'Entrenamiento en Grupo', taken: 4,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '19:00', name: 'CrossFit',               taken: 0,  max: 15, trainer: 'Cristina Villa', type: 'crossfit' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 7,  max: 15, trainer: 'Laura Guillén · Raquel Villaescusa', type: 'grupo' },
  ],
  JUE: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'PAYPA 2012 · SL Molina', type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 6,  max: 15, trainer: 'Marisa García · José A. López', type: 'grupo' },
    { time: '09:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Elena García Puerma', type: 'personal' },
    { time: '09:15', name: 'HYROX',                  taken: 4,  max: 15, trainer: 'Pepa Yepes', type: 'hyrox' },
    { time: '14:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '16:00', name: 'CrossFit',               taken: 0,  max: 15, trainer: 'Cristina Villa', type: 'crossfit' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 3,  max: 15, trainer: 'Dani Montesinos', type: 'grupo' },
    { time: '18:00', name: 'HYROX',                  taken: 5,  max: 15, trainer: 'Maria Ángeles', type: 'hyrox' },
    { time: '18:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Javier Cáscales', type: 'personal' },
    { time: '19:00', name: 'HYROX',                  taken: 5,  max: 15, trainer: 'Cristina Nicolás · Juan Belchi', type: 'hyrox' },
    { time: '20:00', name: 'Entrenamiento en Grupo', taken: 3,  max: 15, trainer: 'Bianca Escámez · Raquel Villaescusa', type: 'grupo' },
  ],
  VIE: [
    { time: '06:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Jose Maria Sandoval', type: 'personal' },
    { time: '07:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '09:15', name: 'Entrenamiento en Grupo', taken: 2,  max: 15, trainer: 'Isabel Valcárcel · Silvia López', type: 'grupo' },
    { time: '16:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '17:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Nuria García', type: 'grupo' },
    { time: '18:00', name: 'CrossFit',               taken: 0,  max: 15, trainer: 'Cristina Villa', type: 'crossfit' },
    { time: '18:00', name: 'Entrenamiento Personal', taken: 1,  max: 2,  trainer: 'Javier Cáscales', type: 'personal' },
    { time: '19:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Laura Guillén', type: 'grupo' },
  ],
  SÁB: [
    { time: '10:00', name: 'Entrenamiento en Grupo', taken: 0,  max: 15, trainer: 'Maria Ángeles', type: 'grupo' },
    { time: '11:00', name: 'HYROX',                  taken: 0,  max: 15, trainer: 'Pepa Yepes', type: 'hyrox' },
  ],
}

const days = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'] as const
type Day = typeof days[number]

/* Visual grid of squares showing spots taken vs available */
function SpotsGrid({ taken, max, color }: { taken: number; max: number; color: string }) {
  const remaining = max - taken
  const isFull = remaining === 0
  const isAlmostFull = !isFull && remaining <= 3

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Dot grid */}
      <div className="hidden md:flex flex-wrap-reverse justify-end gap-[5px]" style={{ maxWidth: max <= 2 ? 32 : 200 }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-[2px] transition-all duration-300"
            style={{
              backgroundColor: i < taken
                ? isFull ? '#ef4444' : isAlmostFull ? color : color
                : 'rgba(255,255,255,0.08)',
              opacity: i < taken ? (isFull ? 1 : 0.85) : 0.4,
            }}
          />
        ))}
      </div>

      {/* Status label */}
      <div className="text-right">
        {isFull ? (
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className="text-red-400 text-[18px] tracking-[0.05em] uppercase">
            COMPLETO
          </span>
        ) : isAlmostFull ? (
          <>
            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, color }}
              className="text-[22px] md:text-[32px] leading-none block">
              {remaining}
            </span>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color }}
              className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase">
              {remaining === 1 ? 'Plaza libre' : 'Plazas libres'}
            </span>
          </>
        ) : (
          <>
            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-white text-[22px] md:text-[32px] leading-none block">
              {remaining}
            </span>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-white/35 text-[11px] tracking-[0.18em] uppercase">
              {remaining === 1 ? 'Plaza libre' : 'Plazas libres'}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default function Schedule() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [activeDay, setActiveDay] = useState<Day>(() => {
    const jsDay = new Date().getDay()
    const map: Record<number, Day> = { 1: 'LUN', 2: 'MAR', 3: 'MIÉ', 4: 'JUE', 5: 'VIE', 6: 'SÁB' }
    return map[jsDay] ?? 'LUN'
  })

  const classes = schedule[activeDay] ?? []

  // Group by time for parallel classes
  const grouped = classes.reduce<Record<string, ClassSlot[]>>((acc, cls) => {
    if (!acc[cls.time]) acc[cls.time] = []
    acc[cls.time].push(cls)
    return acc
  }, {})
  const times = Object.keys(grouped).sort()

  return (
    <section ref={ref} className="relative bg-[#141414] flex flex-col overflow-hidden">

      <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />

      {/* Coming Soon overlay */}
      <div className="absolute inset-0 z-50 bg-[#0F0F0F]/92 flex flex-col items-center justify-center gap-6 pointer-events-none">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className="text-[#F1B91E] text-[12px] tracking-[0.35em] uppercase">Reserva de Clases</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
          className="text-[14vw] md:text-[9vw] lg:text-[7vw] leading-none uppercase text-white text-center tracking-tight">
          PRÓXIMAMENTE
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-white/40 text-[15px] tracking-[0.08em] text-center">
          Reserva tus clases aquí · En breve disponible
        </p>
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-20 pb-0 flex-shrink-0">

        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-6">
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Horario de Clases</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[11vw] md:text-[7vw] lg:text-[5.5vw] leading-[0.88] uppercase text-white"
            >
              ELIGE TU <span style={{ fontStyle: 'italic', textTransform: 'none' }} className="text-[#F1B91E]">sesión.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-white/45 text-[15px] leading-relaxed max-w-[340px] lg:text-right flex-shrink-0 pb-1"
          >
            Entrenadores certificados. Plazas limitadas.<br />Reserva con antelación.
          </motion.p>
        </div>

        {/* ── DAY TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex gap-0.5"
        >
          {days.map((day) => {
            const isActive = day === activeDay
            const count = schedule[day]?.length ?? 0
            return (
              <button key={day} onClick={() => setActiveDay(day)}
                className={`relative flex-1 py-5 px-2 transition-all duration-300 group border-t-2 ${
                  isActive ? 'bg-[#F1B91E] border-[#F1B91E]' : 'bg-white/4 border-transparent hover:bg-white/8 hover:border-white/20'
                }`}
              >
                <div style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className={`text-[18px] md:text-[22px] tracking-[0.08em] uppercase leading-none ${
                    isActive ? 'text-[#191919]' : 'text-white/55 group-hover:text-white'
                  }`}>
                  {day}
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className={`text-[11px] tracking-[0.1em] mt-1.5 ${
                    isActive ? 'text-[#191919]/55' : 'text-white/22'
                  }`}>
                  {count} {count === 1 ? 'clase' : 'clases'}
                </div>
              </button>
            )
          })}
        </motion.div>
        {/* Gold rule below tabs */}
        <div className="h-[3px] w-full bg-[#F1B91E]" />
      </div>

      {/* ── CLASS LIST ── */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {times.map((time, ti) => {
              const slots = grouped[time]
              return (
                <div key={time} className="border-b border-white/6">
                  <div className={`grid gap-0.5 ${slots.length > 1 ? 'lg:grid-cols-2' : ''}`}>
                    {slots.map((cls, ci) => {
                      const cfg = typeConfig[cls.type]
                      const remaining = cls.max - cls.taken
                      const isFull = remaining === 0
                      const isAlmostFull = !isFull && remaining <= 3

                      return (
                        <motion.div
                          key={ci}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: ti * 0.05 + ci * 0.07 }}
                          className={`group relative flex items-center gap-4 md:gap-10 px-0 py-6 md:py-10 ${cfg.glow}
                            hover:bg-white/[0.02] transition-all duration-300 cursor-pointer border-l-0
                            hover:border-l-[3px] hover:pl-4 transition-all duration-200`}
                          style={{ borderLeftColor: cfg.color }}
                        >
                          {/* Left: Time */}
                          <div className="flex-shrink-0 w-[72px] md:w-[110px]">
                            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                              className="text-white/80 text-[26px] md:text-[44px] leading-none tracking-tight tabular-nums">
                              {time}
                            </span>
                          </div>

                          {/* Center: Class info */}
                          <div className="flex-1 min-w-0">
                            {/* Type pill */}
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-[10px] h-[10px] flex-shrink-0"
                                style={{ backgroundColor: cfg.color }} />
                              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: cfg.color }}
                                className="text-[12px] tracking-[0.22em] uppercase">
                                {cfg.label}
                              </span>
                              {isAlmostFull && !isFull && (
                                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: cfg.color, borderColor: cfg.color }}
                                  className="text-[10px] tracking-[0.15em] uppercase border px-2.5 py-1">
                                  ÚLTIMAS PLAZAS
                                </span>
                              )}
                            </div>

                            {/* Class name */}
                            <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                              className={`text-[17px] md:text-[30px] lg:text-[40px] uppercase leading-none mb-2 truncate ${
                                isFull ? 'text-white/35' : 'text-white'
                              }`}>
                              {cls.name}
                            </h4>

                            {/* Trainer */}
                            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                              className="text-white/40 text-[12px] md:text-[15px] truncate">
                              {cls.trainer}
                            </p>

                            {/* Reserve link — appears on hover */}
                            {!isFull && (
                              <div className="mt-4 max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-300">
                                <Link href="/contacto"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[#191919] text-[12px] tracking-[0.2em] uppercase"
                                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, backgroundColor: cfg.color }}>
                                  Reservar Plaza →
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* Right: Spots grid */}
                          <div className="flex-shrink-0 pr-2">
                            <SpotsGrid taken={cls.taken} max={cls.max} color={cfg.color} />
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Bottom CTA */}
            <div className="flex items-center justify-between py-12 border-t border-white/8 mt-4 mb-2">
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-white/30 text-[14px]">
                ¿Necesitas ver el horario completo o gestionar reservas?
              </p>
              <Link href="/contacto"
                className="inline-flex items-center gap-3 border border-[#F1B91E]/40 text-[#F1B91E] px-6 py-4 hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-300 group flex-shrink-0 ml-8">
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                  className="text-[12px] tracking-[0.2em] uppercase">Horario Completo</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
