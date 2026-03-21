'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const tiers = [
  {
    tier: 'ORO',
    name: 'Personal Training',
    tagline: 'La experiencia definitiva',
    description: 'Entrenamiento completamente personalizado, diseñado en función de tus objetivos, condición física y necesidades. En instalaciones o a domicilio.',
    features: ['Programa 100% personalizado', 'Seguimiento continuo de progreso', 'Flexibilidad de horario', 'A domicilio disponible'],
    href: '/modalidades/personal',
    highlight: true,
    tierColor: '#F1B91E',
    image: '/hyrox-bw.jpg',
  },
  {
    tier: 'PLATA',
    name: 'Entrenamiento en Grupo',
    tagline: 'Comunidad y rendimiento',
    description: 'Sesiones dinámicas en grupos reducidos donde se combina motivación, técnica y acompañamiento profesional.',
    features: ['Grupos reducidos', 'Atención personalizada', 'Amplio horario disponible', 'Comunidad motivadora'],
    href: '/modalidades/grupo',
    highlight: false,
    tierColor: '#DDDDDD',
    image: '/hyrox-women.jpg',
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
    image: '/gym-rig.jpg',
  },
]

type Tier = typeof tiers[number]

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const cardInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12 }}
      className="relative group overflow-hidden"
      style={{ minHeight: '55vh' }}
    >
      <Link href={tier.href} className="block h-full">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src={tier.image} alt={tier.name} fill sizes="33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            quality={80} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/75 to-[#161616]/30" />
          {tier.highlight && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F1B91E]" />}
        </div>

        {/* Content — bottom aligned */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8 lg:p-10" style={{ minHeight: '55vh' }}>
          {/* Tier badge */}
          <div className="flex items-center gap-3 mb-5">
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

          <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
            className="text-white text-[36px] md:text-[40px] lg:text-[44px] uppercase leading-none mb-2">
            {tier.name}
          </h3>

          <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
            className="text-[#F1B91E]/60 text-[10px] tracking-[0.2em] uppercase mb-5">
            {tier.tagline}
          </p>

          <div className={`h-[1px] mb-5 ${tier.highlight ? 'bg-[#F1B91E]/40' : 'bg-white/10'}`} />

          <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className="text-white/50 text-[13px] leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[280px]">
            {tier.description}
          </p>

          <ul className="space-y-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            {tier.features.map((feat) => (
              <li key={feat} className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center ${tier.highlight ? 'bg-[#F1B91E]' : 'border border-white/20'}`}>
                  <svg className={`w-2 h-2 ${tier.highlight ? 'text-[#191919]' : 'text-white/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-white/55 text-[12px]">{feat}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className={`text-[11px] tracking-[0.2em] uppercase ${tier.highlight ? 'text-[#F1B91E]' : 'text-white/50 group-hover:text-white/80'} transition-colors`}>
              Más Información
            </span>
            <svg className="w-3.5 h-3.5 text-[#F1B91E] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Modalities() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative bg-[#161616] min-h-screen flex flex-col overflow-hidden">

      {/* Header — left-aligned */}
      <div ref={titleRef} className="px-6 md:px-12 lg:px-16 pt-20 pb-10 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Elige Tu Modalidad</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
            className="text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-white"
          >
            ENTRENA A TU <span className="text-[#F1B91E]">MANERA</span>
          </motion.h2>
        </div>
      </div>

      {/* Three tier cards — horizontal fill */}
      <div className="flex-1 grid md:grid-cols-3 gap-0.5 min-h-0">
        {tiers.map((tier, i) => (
          <TierCard key={tier.tier} tier={tier} index={i} />
        ))}
      </div>
    </section>
  )
}
