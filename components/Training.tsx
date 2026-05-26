'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Discipline detail pages don't exist yet — cards link to /contacto so users
// can request a trial session. Swap to per-discipline routes once those pages
// ship.
const disciplines = [
  {
    num: '01',
    name: 'HYROX',
    tagline: 'Fuerza + Resistencia',
    description: '8km de carrera intercalados con 8 estaciones de trabajo funcional. El estándar global del fitness.',
    href: '/contacto',
    image: '/hyrox-medball.jpg',
    accent: true,
  },
  {
    num: '02',
    name: 'FUNCIONAL',
    tagline: 'Base del Movimiento',
    description: 'Patrones naturales: empujar, traccionar, agacharse, rotar. El fundamento de cualquier cuerpo capaz.',
    href: '/contacto',
    image: '/gym-functional.jpg',
    accent: false,
  },
  {
    num: '03',
    name: 'CROSSTRAINING',
    tagline: 'Alta Intensidad',
    description: 'Halterofilia, gimnasia y trabajo metabólico combinados. Sesiones dinámicas, resultados integrales.',
    href: '/contacto',
    image: '/hyrox-coaching.jpg',
    accent: true,
  },
  {
    num: '04',
    name: 'PERSONAL',
    tagline: 'Atención Individual',
    description: 'Entrenamiento diseñado exclusivamente para ti. Tu entrenador, tu programa, tus resultados.',
    href: '/contacto',
    image: '/gym-crossfit.jpg',
    accent: false,
  },
]

function DisciplineCard({ item, index }: { item: typeof disciplines[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group overflow-hidden"
      style={{ minHeight: '60vh', height: '100%' }}
    >
      <Link href={item.href} className="block" style={{ height: '100%', minHeight: '60vh' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={`${item.name} en Sport Training Murcia`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            quality={80}
          />
          {/* Dark overlay — heavier at bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-[#191919]/60 to-[#191919]/20" />
          {/* Gold top bar on accent card */}
          {item.accent && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F1B91E] z-10" />}
        </div>

        {/* Content — absolutely anchored to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col p-6 md:p-8">
          {/* Number */}
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className="text-[#F1B91E] text-[13px] tracking-[0.3em] block mb-4">
            {item.num}
          </span>

          {/* Name */}
          <h3
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className={`text-[48px] md:text-[56px] lg:text-[64px] leading-none tracking-tight uppercase mb-3 ${item.accent ? 'text-[#F1B91E]' : 'text-white'}`}
          >
            {item.name}
          </h3>

          {/* Tagline — fixed min-height so all 4 cards align regardless of wrapping */}
          <div className="min-h-[2.5rem] mb-3 flex items-start">
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-[13px] tracking-[0.2em] uppercase text-white/65">
              {item.tagline}
            </span>
          </div>

          {/* Gold line that expands on hover */}
          <div className="overflow-hidden h-[1px] mb-4">
            <motion.div
              className="h-full bg-[#F1B91E]"
              initial={{ scaleX: 0.15 }}
              whileInView={{ scaleX: 0.15 }}
              style={{ transformOrigin: 'left' }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Description — appears on hover, h-0 when hidden so it doesn't affect layout */}
          <div className="overflow-hidden max-h-0 group-hover:max-h-[120px] transition-all duration-500">
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-white/75 text-[15px] leading-relaxed max-w-[280px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              {item.description}
            </p>
          </div>

          {/* CTA arrow */}
          <div className="overflow-hidden max-h-0 group-hover:max-h-[40px] transition-all duration-500">
          <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className={`text-[13px] tracking-[0.2em] uppercase ${item.accent ? 'text-[#F1B91E]' : 'text-white/70'}`}>
              Descubrir
            </span>
            <svg className="w-3.5 h-3.5 text-[#F1B91E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Training() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="entrenamientos" className="relative bg-[#191919] min-h-screen flex flex-col overflow-hidden" style={{ scrollMarginTop: '90px' }}>

      {/* Header strip — left-aligned, not centered */}
      <div ref={titleRef} className="px-6 md:px-12 lg:px-16 pt-20 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 flex-shrink-0">

        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-4 mb-5"
          >
            <div className="w-2 h-2 bg-[#F1B91E]" />
            <span className="section-label">Disciplinas de Entrenamiento</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-white"
            >
              NUESTROS <span style={{ fontStyle: 'italic', textTransform: 'none' }} className="text-[#F1B91E]">entrenamientos</span>
            </motion.h2>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
          className="text-white/60 text-[16px] leading-relaxed max-w-[340px] md:text-right flex-shrink-0"
        >
          Cuatro disciplinas. Una metodología. Un objetivo: construir un cuerpo que te permita vivir la vida que quieres.
        </motion.p>
      </div>

      {/* Image card grid — fills all remaining space */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 min-h-0 items-stretch auto-rows-fr">
        {disciplines.map((item, i) => (
          <DisciplineCard key={item.num} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
