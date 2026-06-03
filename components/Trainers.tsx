'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const trainers = [
  {
    name: 'Miguel Ángel',
    role: 'Fundador · Head Coach',
    since: 'Est. 2007',
    specialities: ['Entrenamiento Funcional', 'HYROX', 'Fuerza'],
    image: '/trainer-miguel.jpg',
    num: '01',
  },
  {
    name: 'Miguel Ángel Jr.',
    role: 'Entrenador Personal',
    since: 'Sport Training',
    specialities: ['CrossTraining', 'Rendimiento', 'HYROX'],
    image: '/trainer-jr.jpg',
    num: '02',
  },
  {
    name: 'María Ruiz Martínez',
    role: 'Entrenadora · Grupo',
    since: 'Sport Training',
    specialities: ['Entrenamiento en Grupo', 'Movilidad', 'Adaptado'],
    image: '/trainer-maria.jpg',
    num: '03',
  },
  {
    name: 'Pablo Spagnuolo',
    role: 'Entrenador Personal',
    since: 'Sport Training',
    specialities: ['Fuerza', 'Acondicionamiento', 'Nutrición'],
    image: '/trainer-pablo.jpg',
    num: '04',
  },
]

function TrainerCard({ trainer, index }: { trainer: typeof trainers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="trainer-card group"
    >
      {/* Full-bleed portrait */}
      <div className="absolute inset-0">
        <Image
          src={trainer.image}
          alt={`${trainer.name} — Entrenador Sport Training Murcia`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: 'top center' }}
          sizes="(min-width:1024px) 25vw, 50vw"
          quality={90}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, #0F0F0F 0%, rgba(15,15,15,0.4) 50%, transparent 100%)',
          }}
        />
        <div className="trainer-gold-rule" />
      </div>

      {/* Number */}
      <span
        className="absolute"
        style={{
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'var(--font-inter)',
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: '.75rem',
          letterSpacing: '.3em',
          color: 'rgba(241,185,30,.5)',
        }}
      >
        {trainer.num}
      </span>

      {/* Content */}
      <div className="relative z-10">
        {/* Specs */}
        <div className="trainer-specs">
          {trainer.specialities.map((s) => (
            <div key={s} className="flex items-center" style={{ gap: '.5rem' }}>
              <div style={{ width: '12px', height: '1.5px', background: '#F1B91E', flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: '.62rem',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.6)',
                }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="trainer-divider" />

        {/* Name */}
        <h3
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 'clamp(2.3rem,3.1vw,2.9rem)',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: '0 0 .5rem',
            color: '#fff',
          }}
        >
          {trainer.name}
        </h3>

        {/* Role */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: '.82rem',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: '#F1B91E',
            margin: 0,
          }}
        >
          {trainer.role}
        </p>

        {/* Since */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 400,
            fontSize: '.82rem',
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,.3)',
            margin: 0,
          }}
        >
          {trainer.since}
        </p>
      </div>
    </motion.div>
  )
}

export default function Trainers() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="equipo"
      ref={ref}
      className="relative bg-[#0F0F0F] overflow-hidden"
      style={{ borderBottom: '4px solid #F1B91E', scrollMarginTop: '90px' }}
    >
      <style>{`
        .trainers-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        @media (min-width: 1024px) {
          .trainers-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .trainer-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 64vh;
          padding: 1.75rem;
        }
        .trainer-gold-rule {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #F1B91E;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .trainer-card:hover .trainer-gold-rule {
          transform: scaleY(1);
        }
        .trainer-specs {
          display: flex;
          flex-direction: column;
          gap: .35rem;
          margin-bottom: 1rem;
          opacity: 0;
          transform: translateY(1rem);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .trainer-card:hover .trainer-specs {
          opacity: 1;
          transform: translateY(0);
        }
        .trainer-divider {
          width: 32px;
          height: 2px;
          background: #F1B91E;
          margin-bottom: 1rem;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .trainer-card:hover .trainer-divider {
          width: 100%;
        }
      `}</style>

      {/* Header */}
      <div
        className="flex flex-wrap items-end justify-between"
        style={{ padding: '5rem clamp(1.5rem,5vw,4rem) 2.5rem', gap: '1.5rem' }}
      >
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center mb-6"
            style={{ gap: '1rem' }}
          >
            <div style={{ width: '8px', height: '8px', background: '#F1B91E' }} />
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
              Nuestro Equipo
            </span>
          </motion.div>

          {/* SEO heading */}
          <h2 className="sr-only">
            Entrenadores Sport Training Murcia — Equipo de HYROX, CrossTraining y entrenamiento funcional
          </h2>

          {/* Display heading */}
          <div className="overflow-hidden" aria-hidden="true">
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-white"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(3.6rem,7.8vw,7.2rem)',
                textTransform: 'uppercase',
                lineHeight: 0.85,
                letterSpacing: '-.02em',
              }}
            >
              COACHES
            </motion.span>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <button
            data-contact
            className="inline-flex items-center border border-[#F1B91E]/40 text-[#F1B91E] hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-300 group/btn"
            style={{ padding: '1rem 1.75rem', gap: '.75rem' }}
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
              Conoce al Equipo
            </span>
            <svg
              className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="trainers-grid">
        {trainers.map((trainer, i) => (
          <TrainerCard key={trainer.num} trainer={trainer} index={i} />
        ))}
      </div>
    </section>
  )
}
