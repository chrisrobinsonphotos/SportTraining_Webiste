'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'

type ClassType = 'funcional' | 'hyrox' | 'crossfit' | 'personal'

interface ClassSlot {
  time: string
  name: string
  taken: number
  max: number
  trainer: string
  type: ClassType
}

const typeConfig: Record<ClassType, { label: string; color: string }> = {
  hyrox:     { label: 'HYROX',             color: '#F1B91E' },
  funcional: { label: 'Funcional',         color: '#4CA3FF' },
  crossfit:  { label: 'CrossFit',          color: '#E84393' },
  personal:  { label: 'Personal Training', color: '#CCCCCC' },
}

// Trainers
const MIGUEL = 'Miguel Ángel Barrionuevo Oliveira'
const PABLO  = 'Pablo Spagnuolo Glerean'
const MARIA  = 'María Ruiz Martínez'

const schedule: Record<string, ClassSlot[]> = {
  LUN: [
    { time: '07:00', name: 'HYROX',    taken: 0, max: 20, trainer: MIGUEL, type: 'hyrox' },
    { time: '09:15', name: 'Funcional', taken: 0, max: 20, trainer: PABLO,  type: 'funcional' },
    { time: '14:00', name: 'Funcional', taken: 0, max: 20, trainer: MIGUEL, type: 'funcional' },
    { time: '16:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '17:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '18:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '19:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '20:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
  ],
  MAR: [
    { time: '07:00', name: 'Funcional', taken: 0, max: 20, trainer: MIGUEL, type: 'funcional' },
    { time: '09:15', name: 'HYROX',    taken: 0, max: 20, trainer: MIGUEL, type: 'hyrox' },
    { time: '14:00', name: 'Funcional', taken: 0, max: 20, trainer: MIGUEL, type: 'funcional' },
    { time: '16:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '17:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '18:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '19:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '20:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
  ],
  MIÉ: [
    { time: '07:00', name: 'HYROX',    taken: 0, max: 20, trainer: MIGUEL, type: 'hyrox' },
    { time: '09:15', name: 'Funcional', taken: 0, max: 20, trainer: MIGUEL, type: 'funcional' },
    { time: '14:00', name: 'Funcional', taken: 0, max: 20, trainer: PABLO,  type: 'funcional' },
    { time: '16:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '17:00', name: 'Funcional', taken: 0, max: 20, trainer: PABLO,  type: 'funcional' },
    { time: '18:00', name: 'Funcional', taken: 0, max: 20, trainer: PABLO,  type: 'funcional' },
    { time: '19:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '20:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
  ],
  JUE: [
    { time: '07:00', name: 'Funcional', taken: 0, max: 20, trainer: MIGUEL, type: 'funcional' },
    { time: '09:15', name: 'HYROX',    taken: 0, max: 20, trainer: MIGUEL, type: 'hyrox' },
    { time: '14:00', name: 'Funcional', taken: 0, max: 20, trainer: MIGUEL, type: 'funcional' },
    { time: '16:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '17:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '18:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '19:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '20:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
  ],
  VIE: [
    { time: '07:00', name: 'HYROX',    taken: 0, max: 20, trainer: MIGUEL, type: 'hyrox' },
    { time: '09:15', name: 'Funcional', taken: 0, max: 20, trainer: MIGUEL, type: 'funcional' },
    { time: '16:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '17:00', name: 'Funcional', taken: 0, max: 20, trainer: MARIA,  type: 'funcional' },
    { time: '18:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
    { time: '19:00', name: 'HYROX',    taken: 0, max: 20, trainer: MARIA,  type: 'hyrox' },
  ],
  SÁB: [
    { time: '10:00', name: 'HYROX', taken: 0, max: 20, trainer: 'Miguel Ángel Barrionuevo', type: 'hyrox' },
    { time: '11:00', name: 'HYROX', taken: 0, max: 20, trainer: 'Miguel Ángel Barrionuevo', type: 'hyrox' },
  ],
}

const days = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'] as const
type Day = typeof days[number]

export default function Schedule() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [activeDay, setActiveDay] = useState<Day>(() => {
    const jsDay = new Date().getDay()
    const map: Record<number, Day> = { 1: 'LUN', 2: 'MAR', 3: 'MIÉ', 4: 'JUE', 5: 'VIE', 6: 'SÁB' }
    return map[jsDay] ?? 'LUN'
  })

  const classes = schedule[activeDay] ?? []

  return (
    <section ref={ref} className="relative bg-[#141414] overflow-hidden">

      {/* ── RIGHT PHOTO PANEL — desktop only ── */}
      <div className="hidden xl:block absolute right-0 top-0 bottom-0 w-[42%]">
        <Image
          src="/hyrox-group.jpg"
          alt="Clase de entrenamiento en Sport Training Murcia"
          fill
          className="object-cover"
          style={{ objectPosition: 'center top' }}
          sizes="42vw"
          quality={85}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#141414]/30" />
        {/* Left fade mask — blends into schedule bg */}
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: '16rem', background: 'linear-gradient(90deg, #141414, transparent)' }}
        />
        {/* Top fade */}
        <div
          className="absolute left-0 right-0 top-0"
          style={{ height: '6rem', background: 'linear-gradient(180deg, #141414, transparent)' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{ height: '10rem', background: 'linear-gradient(0deg, #141414, transparent)' }}
        />
      </div>

      {/* ── HEADER ── */}
      <div
        className="relative z-10"
        style={{ padding: '5rem clamp(1.5rem,5vw,4rem) 0' }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: 'clamp(.85rem,1vw,1rem)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: '#F1B91E',
            }}
          >
            Horario de Clases
          </span>
        </motion.div>

        {/* Title row — constrained width on desktop so it doesn't bleed into photo */}
        <div className="xl:max-w-[58%]">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 800,
                  fontSize: 'clamp(3.6rem,7.8vw,7.2rem)',
                  lineHeight: '.88',
                  letterSpacing: '-.02em',
                  textTransform: 'uppercase',
                }}
                className="text-white"
              >
                ELIGE TU{' '}
                <span style={{ color: '#F1B91E', fontStyle: 'italic', textTransform: 'none' }}>
                  sesión.
                </span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                fontSize: 'clamp(1.3rem,1.5vw,1.55rem)',
                lineHeight: '1.55',
                color: 'rgba(255,255,255,.45)',
                maxWidth: '440px',
              }}
            >
              Entrenadores certificados.{' '}
              <span className="whitespace-nowrap">Plazas limitadas.</span>
              <br />
              Reserva con antelación.
            </motion.p>
          </div>
        </div>

        {/* ── DAY TABS — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex xl:max-w-[58%]"
          style={{ gap: '2px' }}
        >
          {days.map((day) => {
            const isActive = day === activeDay
            const count = schedule[day]?.length ?? 0
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className="flex-1 transition-all duration-300 group"
                style={{
                  padding: '1.25rem .5rem',
                  background: isActive ? '#F1B91E' : 'rgba(255,255,255,.04)',
                  borderTop: isActive
                    ? '2px solid #F1B91E'
                    : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,.08)'
                    e.currentTarget.style.borderTopColor = 'rgba(255,255,255,.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,.04)'
                    e.currentTarget.style.borderTopColor = 'transparent'
                  }
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.1rem,2vw,1.5rem)',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    color: isActive ? '#191919' : 'rgba(255,255,255,.55)',
                  }}
                >
                  {day}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    fontSize: '.7rem',
                    letterSpacing: '.1em',
                    marginTop: '.4rem',
                    color: isActive ? 'rgba(25,25,25,.55)' : 'rgba(255,255,255,.22)',
                  }}
                >
                  {count} {count === 1 ? 'clase' : 'clases'}
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* Gold rule below tabs */}
        <div className="bg-[#F1B91E] xl:max-w-[58%]" style={{ height: '3px' }} />
      </div>

      {/* ── CLASS LIST — constrained to left on desktop ── */}
      <div
        className="relative z-10"
        style={{ padding: '0 clamp(1.5rem,5vw,4rem)' }}
      >
        <div className="xl:max-w-[58%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {classes.map((cls, i) => {
                const cfg = typeConfig[cls.type]
                const remaining = cls.max - cls.taken

                return (
                  <motion.div
                    key={`${cls.time}-${cls.type}-${i}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="border-b border-white/[0.06] cursor-pointer transition-all duration-200 scls-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto',
                      gap: '1.5rem',
                      padding: '1.6rem 0',
                      borderLeft: '0px solid transparent',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.02)'
                      e.currentTarget.style.borderLeft = `3px solid ${cfg.color}`
                      e.currentTarget.style.paddingLeft = '1rem'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderLeft = '0px solid transparent'
                      e.currentTarget.style.paddingLeft = '0'
                    }}
                  >
                    {/* Time */}
                    <div
                      style={{
                        fontFamily: 'var(--font-barlow)',
                        fontWeight: 800,
                        fontSize: 'clamp(1.75rem,2.6vw,2.5rem)',
                        color: '#FFFFFF',
                        minWidth: '92px',
                        whiteSpace: 'nowrap',
                        fontVariantNumeric: 'tabular-nums',
                        lineHeight: 1,
                      }}
                      className="scls-time"
                    >
                      {cls.time}
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className="flex-shrink-0"
                          style={{ width: '10px', height: '10px', backgroundColor: cfg.color }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 700,
                            fontSize: '.82rem',
                            letterSpacing: '.22em',
                            textTransform: 'uppercase',
                            color: cfg.color,
                          }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-barlow)',
                          fontWeight: 800,
                          fontSize: 'clamp(1.8rem,2.6vw,2.4rem)',
                          textTransform: 'uppercase',
                          lineHeight: 1,
                          color: '#FFFFFF',
                          marginBottom: '.25rem',
                        }}
                        className="truncate"
                      >
                        {cls.name}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 400,
                          fontSize: '.95rem',
                          color: 'rgba(255,255,255,.45)',
                        }}
                        className="truncate"
                      >
                        {cls.trainer}
                      </p>
                    </div>

                    {/* Spots */}
                    <div className="text-right scls-spots" style={{ flexShrink: 0 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-barlow)',
                          fontWeight: 800,
                          fontSize: 'clamp(1.4rem,2.5vw,2rem)',
                          color: '#FFFFFF',
                          lineHeight: 1,
                          display: 'block',
                        }}
                      >
                        {remaining}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 600,
                          fontSize: '.7rem',
                          letterSpacing: '.16em',
                          color: 'rgba(255,255,255,.35)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {remaining === 1 ? 'Plaza libre' : 'Plazas libres'}
                      </span>
                    </div>
                  </motion.div>
                )
              })}

              {/* Footer */}
              <div
                className="flex flex-wrap items-center justify-between"
                style={{
                  gap: '1.5rem',
                  padding: '3rem 0',
                  borderTop: '1px solid rgba(255,255,255,.08)',
                  marginTop: '1rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                    fontSize: '.9rem',
                    color: 'rgba(255,255,255,.3)',
                  }}
                >
                  ¿Necesitas ver el horario completo o gestionar reservas?
                </p>
                <button
                  data-contact
                  className="inline-flex items-center gap-3 transition-all duration-300 group flex-shrink-0"
                  style={{
                    border: '1px solid rgba(241,185,30,.4)',
                    color: '#F1B91E',
                    padding: '1rem 1.75rem',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 700,
                    fontSize: '.7rem',
                    letterSpacing: '.25em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F1B91E'
                    e.currentTarget.style.color = '#191919'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#F1B91E'
                  }}
                >
                  <span>Horario Completo</span>
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive: hide spots below 560px */}
      <style jsx>{`
        @media (max-width: 560px) {
          .scls-spots {
            display: none !important;
          }
          .scls-row {
            grid-template-columns: auto 1fr !important;
          }
          .scls-time {
            min-width: 72px !important;
          }
        }
      `}</style>
    </section>
  )
}
