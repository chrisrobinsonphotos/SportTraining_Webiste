'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const values = [
  { num: '01', title: 'CAPACIDAD ANTE LA ESTÉTICA', body: 'Entrenamos para lo que el cuerpo puede hacer, no solo para cómo se ve. Resultados que perduran.' },
  { num: '02', title: 'PROGRESO ESTRUCTURADO', body: 'Cada sesión tiene un propósito. Cada ejercicio, un impacto medible. Sin sesiones perdidas.' },
  { num: '03', title: 'INCLUSIVIDAD RADICAL', body: 'Abierto a todos: atletas de competición, profesionales ocupados y personas en recuperación.' },
  { num: '04', title: 'EXPERIENCIA HONESTA', body: 'Sin tendencias, sin suplementación innecesaria. Orientación honesta, basada en la ciencia.' },
]

const brandEase = [0.16, 1, 0.3, 1] as const

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="filosofia"
      ref={ref}
      className="relative min-h-screen flex overflow-hidden"
      style={{ backgroundColor: '#1E1E1E', scrollMarginTop: '90px' }}
    >
      {/* LEFT: text column */}
      <div
        className="relative z-10 w-full flex flex-col"
        style={{ padding: '6rem clamp(1.5rem,5vw,4rem)', maxWidth: '100%' }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: 'var(--fs-label)',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: '#F1B91E',
            }}
          >
            Nuestra Filosofía
          </span>
        </motion.div>

        {/* Heading: ENTRENA / Para la / VIDA. */}
        <div className="flex-shrink-0">
          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [...brandEase] }}
              className="text-white uppercase"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'var(--fs-h1)',
                lineHeight: '.85',
                letterSpacing: '-.02em',
              }}
            >
              ENTRENA
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.17, ease: [...brandEase] }}
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'var(--fs-h1)',
                lineHeight: '.85',
                letterSpacing: '-.02em',
                color: '#F1B91E',
                fontStyle: 'italic',
                textTransform: 'none',
              }}
            >
              Para la
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.24, ease: [...brandEase] }}
              className="text-white uppercase"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'var(--fs-h1)',
                lineHeight: '.85',
                letterSpacing: '-.02em',
              }}
            >
              VIDA.
            </motion.h2>
          </div>
        </div>

        {/* Values */}
        <div className="flex flex-col flex-1" style={{ marginTop: '2.5rem' }}>
          {values.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease: [...brandEase] }}
              className="flex-1 flex items-center group"
              style={{
                borderBottom: i < values.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none',
                gap: '1.5rem',
                padding: '1.5rem 0',
                transition: 'border-color 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => {
                if (i < values.length - 1) {
                  e.currentTarget.style.borderBottomColor = 'rgba(241,185,30,.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (i < values.length - 1) {
                  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.08)'
                }
              }}
            >
              <span
                className="flex-shrink-0"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 700,
                  fontSize: '.9rem',
                  letterSpacing: '.2em',
                  color: '#F1B91E',
                  width: '2.5rem',
                }}
              >
                {item.num}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-h2)',
                    letterSpacing: '.02em',
                    textTransform: 'uppercase',
                    lineHeight: '1.02',
                    margin: '0 0 .5rem',
                    color: '#FFFFFF',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                    fontSize: 'var(--fs-lead)',
                    lineHeight: '1.5',
                    color: 'rgba(255,255,255,.65)',
                    maxWidth: '44ch',
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: portrait panel — hidden below 1100px */}
      <div
        className="absolute right-0 top-0 bottom-0"
        style={{ width: '58%', display: 'none' }}
      >
        {/* Left mask: 2.5rem wide */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10"
          style={{
            width: '2.5rem',
            background: 'linear-gradient(to right, #1E1E1E, transparent)',
          }}
        />
        {/* Top mask: 4rem tall */}
        <div
          className="absolute inset-x-0 top-0 z-10"
          style={{
            height: '4rem',
            background: 'linear-gradient(to bottom, #1E1E1E, transparent)',
          }}
        />
        {/* Bottom mask: 8rem tall */}
        <div
          className="absolute inset-x-0 bottom-0 z-10"
          style={{
            height: '8rem',
            background: 'linear-gradient(to top, #1E1E1E, transparent)',
          }}
        />

        {/* Two side-by-side images */}
        <div className="h-full w-full flex" style={{ gap: '2px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [...brandEase] }}
            className="relative flex-1 overflow-hidden"
          >
            <Image
              src="/trainer-miguel.jpg"
              alt="Miguel Ángel — Fundador y entrenador de Sport Training Murcia desde 2007"
              fill
              className="object-cover"
              style={{ objectPosition: 'top center' }}
              quality={90}
              sizes="29vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [...brandEase] }}
            className="relative flex-1 overflow-hidden"
          >
            <Image
              src="/portrait-jr.jpg"
              alt="Miguel Ángel Jr. — Director General Sport Training Murcia"
              fill
              className="object-cover"
              style={{ objectPosition: 'top center' }}
              quality={90}
              sizes="29vw"
            />
          </motion.div>
        </div>

        {/* Byline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute z-20 flex items-end justify-between"
          style={{ bottom: '2.5rem', left: '2.5rem', right: '2.5rem', gap: '1.5rem' }}
        >
          {/* Sr. */}
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 overflow-hidden relative"
              style={{ width: '40px', height: '40px', border: '1px solid #F1B91E' }}
            >
              <Image
                src="/trainer-miguel.jpg"
                alt="Miguel Ángel — Fundador Sport Training Murcia"
                fill
                className="object-cover object-top"
                sizes="40px"
              />
            </div>
            <div>
              <p
                className="leading-tight"
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Miguel Ángel
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  fontSize: '10px',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.55)',
                  margin: 0,
                }}
              >
                Fundador · 2007
              </p>
            </div>
          </div>

          {/* Jr. */}
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 overflow-hidden relative"
              style={{ width: '40px', height: '40px', border: '1px solid #F1B91E' }}
            >
              <Image
                src="/portrait-jr.jpg"
                alt="Miguel Ángel Jr. — Entrenador Sport Training Murcia"
                fill
                className="object-cover object-top"
                sizes="40px"
              />
            </div>
            <div>
              <p
                className="leading-tight"
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Miguel Ángel Jr.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  fontSize: '10px',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.55)',
                  margin: 0,
                }}
              >
                Director General
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Responsive: show portrait panel at >=1100px */}
      <style>{`
        @media (min-width: 1100px) {
          #filosofia > div:nth-child(2) {
            display: block !important;
          }
          #filosofia > div:first-child {
            width: 44% !important;
          }
        }
      `}</style>
    </section>
  )
}
