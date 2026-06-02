'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const tiers = [
  {
    tier: 'ORO',
    name: 'Coaching Personal',
    tagline: 'La experiencia definitiva',
    description: 'Entrenamiento completamente personalizado, diseñado en función de tus objetivos, condición física y necesidades. En instalaciones o a domicilio.',
    features: ['Programa 100% personalizado', 'Seguimiento continuo de progreso', 'Flexibilidad de horario', 'A domicilio disponible'],
    href: '/modalidades/personal',
    highlight: true,
    tierColor: '#F1B91E',
    image: '/jr-sled.jpg',
    splitImage: undefined,
    pricing: {
      subtitle: 'Coaching personal incluido',
      plans: [
        { label: 'ORO 4',  price: '€150', period: '/mes', detail: '4 PT / mes' },
        { label: 'ORO 8',  price: '€250', period: '/mes', detail: '8 PT / mes' },
        { label: 'ORO 12', price: '€350', period: '/mes', detail: '12 PT / mes' },
        { label: 'ORO 16', price: '€450', period: '/mes', detail: '16 PT / mes' },
      ],
      included: ['Grupos ilimitados', 'HYROX · Funcional', 'Gimnasio libre ilimitado'],
      note: 'Todos los planes Oro incluyen grupos ilimitados y gimnasio libre.',
    },
  },
  {
    tier: 'PLATA',
    name: 'Entrenamiento en Grupo',
    tagline: 'Comunidad y rendimiento',
    description: 'Sesiones dinámicas en grupos reducidos donde se combina motivación, técnica y acompañamiento profesional.',
    features: ['Clases de HYROX', 'Clases en grupo', 'Atención personalizada', 'Comunidad motivadora'],
    href: '/modalidades/grupo',
    highlight: false,
    tierColor: '#DDDDDD',
    image: '/group-training.jpg',
    splitImage: undefined,
    pricing: {
      subtitle: 'Clases en grupo y acceso libre',
      plans: [
        { label: 'PLATA 8',   price: '€50', period: '/mes', detail: '8 sesiones' },
        { label: 'PLATA 12',  price: '€60', period: '/mes', detail: '12 sesiones' },
        { label: 'ILIMITADA', price: '€70', period: '/mes', detail: 'Sin límite', popular: true },
      ],
      included: ['HYROX · Funcional', 'Gimnasio libre ilimitado'],
      note: 'No incluye Entrenamiento Personal.',
    },
  },
  {
    tier: 'BRONCE',
    name: 'Entrenamiento Libre',
    tagline: 'Autonomía total',
    description: 'Acceso libre a todo el gimnasio. Espacio amplio, equipado y con luz natural para entrenar a tu ritmo.',
    features: ['Acceso libre al gimnasio', 'Espacio amplio y luminoso', 'Equipamiento de alto rendimiento', 'Horario flexible'],
    href: '/modalidades/libre',
    highlight: false,
    tierColor: '#C9966B',
    image: '/gym-wide.jpg',
    splitImage: '/gym-machines.jpg',
    pricing: {
      subtitle: 'Acceso libre al gimnasio',
      plans: [
        { label: 'BRONCE', price: '€25', period: '/mes', detail: 'Gimnasio libre' },
      ],
      included: ['Acceso completo a instalaciones', 'Espacio amplio con luz natural', 'Todo el equipamiento disponible'],
      note: 'Créditos sueltos: 8€ / grupo · 30€ / sesión PT',
    },
  },
]

type Tier = typeof tiers[number]

function PricingBack({ tier }: { tier: Tier }) {
  const bg = tier.tierColor
  const textDark = '#191919'

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between px-8 md:px-16 lg:px-20 py-10 overflow-hidden"
      style={{ backgroundColor: bg, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    >
      {/* Top: Tier label */}
      <div>
        <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: textDark, fontStyle: 'italic', textTransform: 'none' }}
          className="text-[12px] tracking-[0.35em] uppercase opacity-60">
          {tier.tier}
        </span>
        <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, color: textDark }}
          className="text-[32px] md:text-[36px] uppercase leading-tight mt-1">
          {tier.name}
        </h3>
        <div className="h-[1px] mt-4" style={{ backgroundColor: `${textDark}25` }} />
      </div>

      {/* Middle: Plan rows — fills available space */}
      <div className="flex flex-col gap-4 flex-1 py-6">
        {tier.pricing.plans.map((plan) => (
          <div key={plan.label}
            className="relative flex flex-col items-center justify-center flex-1 py-3 gap-1"
            style={{
              backgroundColor: `${'popular' in plan && plan.popular ? `${textDark}20` : `${textDark}12`}`,
              border: `${'popular' in plan && plan.popular ? `3px solid ${textDark}` : `1px solid ${textDark}25`}`
            }}>
            {'popular' in plan && plan.popular && (
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: bg, backgroundColor: textDark }}
                className="absolute -top-3 right-4 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 whitespace-nowrap">
                + popular
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, color: textDark }}
              className="text-[32px] md:text-[36px] tracking-[0.06em] uppercase leading-none text-center">
              {plan.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, color: textDark }}
                className="text-[56px] md:text-[64px] leading-none">
                {plan.price}
              </span>
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: textDark }}
                className="text-[15px] opacity-55 pb-1">
                {plan.period}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: textDark }}
              className="text-[13px] tracking-[0.08em] uppercase opacity-65 text-center">
              {plan.detail}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom: features + CTA */}
      <div>
        <div className="h-[1px] mb-4" style={{ backgroundColor: `${textDark}25` }} />
        <ul className="flex flex-col gap-2 mb-5">
          {tier.pricing.included.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: textDark }}>
                <svg className="w-2 h-2" viewBox="0 0 24 24" fill="none" stroke={bg} strokeWidth={3.5}>
                  <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, color: textDark }}
                className="text-[14px] opacity-80">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <a href="/contacto"
          aria-label={`Contratar plan ${tier.tier} — ${tier.name} en Sport Training Murcia`}
          className="flex items-center justify-center gap-2 py-4 px-5 transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: textDark, fontFamily: 'var(--font-inter)', fontWeight: 700, color: bg }}>
          <span className="text-[13px] tracking-[0.25em] uppercase">Contratar</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const cardInView = useInView(ref, { once: true, margin: '-60px' })
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12 }}
      style={{ height: '100%', minHeight: '60vh', perspective: '1200px' }}
      onClick={() => setFlipped(f => !f)}
    >
      {/* Flip container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '60vh',
        transformStyle: 'preserve-3d',
        transition: 'transform 1.37s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* ── FRONT FACE ── */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}
          className="overflow-hidden">

          {/* Background image */}
          <div className="absolute inset-0">
            {tier.splitImage ? (
              <>
                <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                  <Image src={tier.image} alt={`${tier.name} — Sport Training Murcia`} fill sizes="17vw"
                    className="object-cover object-center"
                    quality={85} />
                </div>
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                  <Image src={tier.splitImage} alt="Sala de máquinas — Sport Training Murcia" fill sizes="17vw"
                    className="object-cover object-left"
                    quality={85} />
                </div>
              </>
            ) : (
              <Image src={tier.image} alt={`${tier.name} — Sport Training Murcia`} fill sizes="33vw"
                className="object-cover object-center"
                quality={80} />
            )}
            <div className={`absolute inset-0 bg-gradient-to-t ${tier.splitImage ? 'from-[#161616]/85 via-[#161616]/35 to-transparent' : 'from-[#161616] via-[#161616]/75 to-[#161616]/30'}`} />
            {tier.highlight && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F1B91E]" />}
          </div>

          {/* Front content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8 lg:p-10">

            {/* Top: tier badge */}
            <div className="flex items-center gap-3 pt-1">
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, backgroundColor: tier.tierColor }}
                className="text-[10px] tracking-[0.3em] uppercase text-[#191919] px-3 py-1.5"
              >
                {tier.tier}
              </span>
              {tier.highlight && (
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-[10px] tracking-[0.15em] uppercase text-[#F1B91E] border border-[#F1B91E]/40 px-2.5 py-1">
                  Recomendado
                </span>
              )}
            </div>

            {/* Middle: Ver Precios CTA */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3 cursor-pointer px-7 py-4 border border-white/25 bg-[#191919]/60 hover:border-[#F1B91E]/70 hover:bg-[#191919]/80 transition-all duration-200">
                <svg className="w-4 h-4 text-[#F1B91E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="square" d="M4 4h6v6H4zM14 4h6v6h-6zM14 14h6v6h-6zM4 14h6v6H4z" />
                </svg>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                  className="text-[12px] tracking-[0.25em] uppercase text-white">
                  Ver Precios
                </span>
                <svg className="w-3.5 h-3.5 text-[#F1B91E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Bottom: name + tagline */}
            <div>
              <div className={`h-[1px] mb-5 ${tier.highlight ? 'bg-[#F1B91E]/40' : 'bg-white/10'}`} />
              <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-white text-[36px] md:text-[40px] lg:text-[44px] uppercase leading-none mb-2">
                {tier.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                className="text-[#F1B91E]/60 text-[10px] tracking-[0.2em] uppercase">
                {tier.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <PricingBack tier={tier} />
      </div>
    </motion.div>
  )
}

export default function Modalities() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="modalidades" className="relative bg-[#161616] min-h-screen flex flex-col overflow-hidden" style={{ scrollMarginTop: '90px' }}>

      {/* Header */}
      <div ref={titleRef} className="px-6 md:px-12 lg:px-16 pt-20 pb-10 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Membresías</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className="text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-white"
          >
            ELIGE TU <span className="text-[#F1B91E]">membresía</span>
          </motion.h2>
        </div>
      </div>

      {/* Three tier cards */}
      <div className="flex-1 grid md:grid-cols-3 gap-0.5" style={{ minHeight: '60vh' }}>
        {tiers.map((tier, i) => (
          <TierCard key={tier.tier} tier={tier} index={i} />
        ))}
      </div>
    </section>
  )
}
