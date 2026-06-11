'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

/* ─── Tier data ─── */

interface Tier {
  id: string
  name: string
  badge: string
  badgeBg: string
  tagline: string
  image: string
  imageFilter?: string
  recommended?: boolean
  pricePrefix?: string        // "Desde" — omitted for flat-rate tiers
  priceAmount: string
  pricePeriod: string
  range: string
  rangeWhite?: boolean        // whether range text renders white vs default grey
  features: string[]
  buttonVariant: 'ghost' | 'primary'
}

const tiers: Tier[] = [
  {
    id: 'oro',
    name: 'Coaching\nPersonal',
    badge: 'Oro',
    badgeBg: '#F1B91E',
    tagline: 'La experiencia definitiva',
    image: '/coaching-personal.jpg',
    pricePrefix: 'Desde',
    priceAmount: '€150',
    pricePeriod: '/mes',
    range: '€150 – €450 · de 4 a 16 sesiones PT/mes',
    rangeWhite: true,
    features: [
      'Entrenamiento personal 1:1',
      'Clases en grupo ilimitadas',
      'HYROX · Funcional · CrossTraining',
      'Gimnasio libre ilimitado',
    ],
    buttonVariant: 'ghost',
  },
  {
    id: 'plata',
    name: 'Entrenamiento\nen Grupo',
    badge: 'Plata',
    badgeBg: '#DDDDDD',
    tagline: 'Comunidad y rendimiento',
    image: '/group-training.jpg',
    recommended: true,
    pricePrefix: 'Desde',
    priceAmount: '€50',
    pricePeriod: '/mes',
    range: '€50 – €70 · de 8 sesiones a ilimitado',
    rangeWhite: true,
    features: [
      'Clases HYROX',
      'Funcional',
      'Entrena en comunidad',
      'Gimnasio libre ilimitado',
    ],
    buttonVariant: 'primary',
  },
  {
    id: 'bronce',
    name: 'Entrenamiento\nLibre',
    badge: 'Bronce',
    badgeBg: '#C9966B',
    tagline: 'Autonomía total',
    image: '/gym-wide.jpg',
    imageFilter: 'grayscale(100%) contrast(1.15) brightness(0.9)',
    priceAmount: '€25',
    pricePeriod: '/mes',
    range: 'Tarifa única · acceso libre',
    rangeWhite: false,
    features: [
      'Acceso completo a instalaciones',
      'Espacio amplio con luz natural',
      'Todo el equipamiento',
    ],
    buttonVariant: 'ghost',
  },
]

/* ─── Brand easing ─── */

const brandEase = [0.16, 1, 0.3, 1] as const

/* ─── Checkmark bullet ─── */

function Check() {
  return (
    <span
      className="flex-shrink-0 flex items-center justify-center"
      style={{ width: 24, height: 24, backgroundColor: '#F1B91E' }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={3}>
        <path strokeLinecap="square" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

/* ─── Tier card ─── */

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [...brandEase] }}
      className="tier relative flex flex-col"
      style={{
        backgroundColor: '#1A1A1A',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(241,185,30,0.3)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
    >
      {/* Gold top accent for recommended tier */}
      {tier.recommended && (
        <div className="absolute top-0 left-0 right-0 z-10" style={{ height: 3, backgroundColor: '#F1B91E' }} />
      )}

      {/* ── Photo header ── */}
      <div className="relative overflow-hidden" style={{ height: 300 }}>
        <Image
          src={tier.image}
          alt={`${tier.badge} — Sport Training Murcia`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
          style={tier.imageFilter ? { filter: tier.imageFilter } : undefined}
          quality={80}
        />

        {/* Bottom gradient into card surface */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #1A1A1A 0%, #1A1A1A 5%, transparent 60%)',
          }}
        />

        {/* Badge cluster — bottom-left */}
        <div className="absolute bottom-4 left-6 flex items-center gap-3 z-10">
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '.3em',
              textTransform: 'uppercase' as const,
              backgroundColor: tier.badgeBg,
              color: '#191919',
              padding: '0.45rem 1rem',
            }}
          >
            {tier.badge}
          </span>
          {tier.recommended && (
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '.15em',
                textTransform: 'uppercase' as const,
                color: '#F1B91E',
                border: '1px solid rgba(241,185,30,0.45)',
                padding: '0.35rem 0.75rem',
              }}
            >
              Recomendado
            </span>
          )}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1" style={{ padding: '2rem' }}>

        {/* Tier name */}
        <h3
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 'clamp(3.3rem, 4.8vw, 4.3rem)',
            lineHeight: 0.9,
            textTransform: 'uppercase' as const,
            color: '#fff',
            whiteSpace: 'pre-line',
            marginBottom: '0.5rem',
          }}
        >
          {tier.name}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '.18em',
            textTransform: 'uppercase' as const,
            color: 'rgba(241,185,30,0.55)',
            marginBottom: '1.25rem',
          }}
        >
          {tier.tagline}
        </p>

        {/* Price block */}
        <div style={{ marginBottom: '0.25rem' }}>
          {tier.pricePrefix && (
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 500,
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.5)',
                marginRight: '0.4rem',
              }}
            >
              {tier.pricePrefix}
            </span>
          )}
          <span
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(3.25rem, 5vw, 4.75rem)',
              lineHeight: 1,
              color: '#fff',
            }}
          >
            {tier.priceAmount}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.45)',
              marginLeft: '0.25rem',
            }}
          >
            {tier.pricePeriod}
          </span>
        </div>

        {/* Range line */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.1rem, 1.25vw, 1.3rem)',
            color: tier.rangeWhite ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
            marginBottom: '1.5rem',
            lineHeight: 1.4,
          }}
        >
          {tier.range}
        </p>

        {/* Hairline */}
        <hr
          style={{
            border: 'none',
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.08)',
            marginBottom: '1.5rem',
          }}
        />

        {/* Feature list */}
        <ul className="flex flex-col gap-3 flex-1" style={{ marginBottom: '2rem' }}>
          {tier.features.map((feat) => (
            <li key={feat} className="flex items-center gap-3">
              <Check />
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button
          data-contact
          aria-label={`Empieza con un día de prueba — plan ${tier.badge} (${tier.name.replace('\n', ' ')}) en Sport Training Murcia`}
          className="w-full transition-all duration-200"
          style={
            tier.buttonVariant === 'primary'
              ? {
                  backgroundColor: '#F1B91E',
                  color: '#191919',
                  border: 'none',
                  padding: '1.35rem 1.75rem',
                  fontSize: '1.15rem',
                  letterSpacing: '.25em',
                  textTransform: 'uppercase' as const,
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 700,
                  cursor: 'pointer',
                }
              : {
                  backgroundColor: 'transparent',
                  color: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '1.35rem 1.75rem',
                  fontSize: '1.15rem',
                  letterSpacing: '.25em',
                  textTransform: 'uppercase' as const,
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 700,
                  cursor: 'pointer',
                }
          }
          onMouseEnter={(e) => {
            if (tier.buttonVariant === 'primary') {
              e.currentTarget.style.backgroundColor = '#C99200'
            } else {
              e.currentTarget.style.borderColor = '#F1B91E'
              e.currentTarget.style.color = '#F1B91E'
            }
          }}
          onMouseLeave={(e) => {
            if (tier.buttonVariant === 'primary') {
              e.currentTarget.style.backgroundColor = '#F1B91E'
            } else {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
            }
          }}
        >
          Empezar
        </button>
      </div>
    </motion.article>
  )
}

/* ─── Section ─── */

export default function Modalities() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      id="modalidades"
      className="relative bg-[#161616] flex flex-col overflow-hidden"
      style={{ scrollMarginTop: '90px' }}
    >
      {/* Header */}
      <div ref={titleRef} className="px-6 md:px-12 lg:px-16 pt-20 pb-10 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [...brandEase] }}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Membresías</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [...brandEase] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className="text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-white"
          >
            ELIGE TU{' '}
            <span className="text-[#F1B91E]" style={{ fontStyle: 'italic' }}>
              membresía
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Card grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-[2px] px-6 md:px-12 lg:px-16"
        style={{ paddingBottom: '5rem' }}
      >
        {tiers.map((tier, i) => (
          <TierCard key={tier.id} tier={tier} index={i} />
        ))}
      </div>
    </section>
  )
}
