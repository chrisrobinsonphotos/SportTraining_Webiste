'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    title: 'Entrenamiento Real',
    body: 'No hablamos de rehabilitación clínica, sino de entrenamiento real, adaptado y guiado por profesionales.',
  },
  {
    title: 'Metodología Adaptada',
    body: 'Cada ejercicio, cada carga y cada progresión se ajusta a las necesidades de cada persona.',
  },
  {
    title: 'Confianza y Seguridad',
    body: 'Un lugar donde entrenar con seguridad, confianza y acompañamiento profesional.',
  },
]

export default function Adaptado() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="adaptado"
      ref={ref}
      className="relative min-h-screen flex overflow-hidden"
      style={{ backgroundColor: '#191919', scrollMarginTop: '90px' }}
    >
      {/* ── Image panel — left 55%, hidden below 1100px ── */}
      <div
        className="absolute left-0 top-0 bottom-0 hidden"
        style={{ width: '55%' }}
        /* show at >=1100px via inline media query below */
      >
        {/* Right-edge gradient mask — 18rem wide, #191919 → transparent */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10"
          style={{
            width: '18rem',
            background: 'linear-gradient(270deg, #191919, transparent)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full relative"
        >
          <Image
            src="/gym-wide.jpg"
            alt="Entrenamiento adaptado en Murcia para personas con discapacidad — Sport Training"
            fill
            className="object-cover object-center"
            quality={85}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(25,25,25,.4)' }}
          />
        </motion.div>
      </div>

      {/* ── Content wrapper ── */}
      <div
        className="relative z-10 w-full flex flex-col min-h-screen"
        /* row layout at >=1100px handled via style block */
      >
        {/* ── Head column: headline ── */}
        <div
          className="flex flex-col justify-center"
          style={{
            padding: '6rem clamp(1.5rem,5vw,4rem)',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
            style={{ marginBottom: '2.5rem' }}
          >
            <div style={{ width: 8, height: 8, backgroundColor: '#F1B91E' }} />
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
              Entrenamiento Adaptado
            </span>
          </motion.div>

          {/* Heading lines */}
          <div className="overflow-hidden" style={{ marginBottom: '1px' }}>
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(3.6rem,7.8vw,7.2rem)',
                lineHeight: 0.85,
                letterSpacing: '-.02em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              EL
            </motion.h2>
          </div>

          <div className="overflow-hidden" style={{ marginBottom: '1px' }}>
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(3.6rem,7.8vw,7.2rem)',
                lineHeight: 0.85,
                letterSpacing: '-.02em',
                fontStyle: 'italic',
                textTransform: 'none',
                color: '#F1B91E',
                margin: 0,
              }}
            >
              Entrenamiento
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.26,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(3.6rem,7.8vw,7.2rem)',
                lineHeight: 0.85,
                letterSpacing: '-.02em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              ES PARA TODOS.
            </motion.h2>
          </div>
        </div>

        {/* ── Features column ── */}
        <div
          className="flex flex-col justify-center"
          style={{
            paddingTop: '6rem',
            paddingLeft: 'clamp(1.5rem,5vw,4rem)',
            paddingRight: 'clamp(1.5rem,5vw,4rem)',
            paddingBottom: '6rem',
          }}
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.35 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                marginBottom: i < features.length - 1 ? '3rem' : '2.5rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.3rem,3.4vw,3.1rem)',
                  letterSpacing: '.03em',
                  textTransform: 'uppercase',
                  lineHeight: 1.05,
                  margin: '0 0 22px',
                  color: '#FFFFFF',
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.3rem,1.5vw,1.55rem)',
                  lineHeight: 1.5,
                  color: 'rgba(255,255,255,.65)',
                  maxWidth: '44ch',
                  margin: 0,
                }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '1rem' }}
          >
            <button
              data-contact
              className="inline-flex items-center gap-3 transition-all duration-300 group"
              style={{
                padding: '1rem 1.75rem',
                backgroundColor: 'transparent',
                color: '#F1B91E',
                border: '1px solid rgba(241,185,30,.4)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F1B91E'
                e.currentTarget.style.color = '#191919'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#F1B91E'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 700,
                  fontSize: '.7rem',
                  letterSpacing: '.25em',
                  textTransform: 'uppercase',
                }}
              >
                Conocer el Programa
              </span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="square"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Responsive overrides for >=1100px ── */}
      <style>{`
        @media (min-width: 1100px) {
          #adaptado > div:first-child {
            display: block !important;
          }
          #adaptado > div:nth-child(2) {
            flex-direction: row;
            align-items: stretch;
          }
          #adaptado > div:nth-child(2) > div:first-child {
            width: 50%;
            padding-right: 2rem;
          }
          #adaptado > div:nth-child(2) > div:nth-child(2) {
            width: 50%;
            border-left: 1px solid rgba(255,255,255,.08);
            padding-left: 3.5rem;
          }
          #adaptado > div:nth-child(2) > div:nth-child(2) > div:not(:last-child) {
            padding-left: 1.75rem;
          }
          #adaptado > div:nth-child(2) > div:nth-child(2) > div:last-child {
            padding-left: 1.75rem;
          }
        }
      `}</style>
    </section>
  )
}
