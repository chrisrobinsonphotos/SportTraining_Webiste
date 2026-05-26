'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Nutrition detail pages don't exist yet — all three pillar cards route to
// /contacto. Restore per-pillar routes when those pages ship.
const pillars = [
  { num: '01', label: 'ALIMENTACIÓN', href: '/contacto', image: '/nutrition-food.jpg', desc: 'La base real de cualquier progreso. Hábitos sólidos sobre los que construir resultados duraderos.' },
  { num: '02', label: 'SUPLEMENTACIÓN', href: '/contacto', image: '/nutrition-supplements.jpg', desc: 'Solo cuando aporta valor. Pocos productos, calidad contrastada, dosis efectivas.' },
  { num: '03', label: 'ROPA', href: '/contacto', image: '/ropa.png', desc: 'Equipamiento y ropa técnica para rendir al máximo dentro y fuera del gimnasio.' },
]

type Pillar = typeof pillars[number]

function PillarCard({ item, index }: { item: Pillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const cardInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1 }}
      className="relative group overflow-hidden"
      style={{ minHeight: '40vh' }}
    >
      <Link href={item.href} className="block h-full">
        <div className="absolute inset-0">
          <Image src={item.image} alt={`${item.label} — Nutrición deportiva Sport Training Murcia`} fill sizes="33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            quality={80} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-[#191919]/65 to-[#191919]/20" />
        </div>

        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8" style={{ minHeight: '40vh' }}>
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontStyle: 'italic', textTransform: 'none' }}
            className="text-[#F1B91E] text-[12px] tracking-[0.3em] block mb-3">{item.num}</span>
          <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className="text-white text-[32px] md:text-[38px] uppercase leading-none mb-4">{item.label}</h4>
          <div className="w-8 h-[2px] bg-[#F1B91E]/60 mb-4 group-hover:w-full transition-all duration-500" />
          <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-white/70 text-[15px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[280px]">
            {item.desc}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Nutrition() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="nutricion" ref={ref} className="relative bg-[#191919] min-h-screen flex flex-col overflow-hidden" style={{ scrollMarginTop: '90px' }}>

      {/* Header — left-aligned */}
      <div className="px-6 md:px-12 lg:px-16 pt-20 pb-10 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Nutrición & Suplementación</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-white"
            >
              LOS HÁBITOS <span  className="text-[#F1B91E]">transforman.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <Link href="/contacto"
              className="inline-flex items-center gap-3 border border-[#F1B91E]/40 text-[#F1B91E] px-6 py-3.5 hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-300 group">
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[11px] tracking-[0.2em] uppercase">Asesoramiento Nutricional</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

      </div>

      {/* Three image-backed pillar cards */}
      <div className="flex-1 grid md:grid-cols-3 gap-0.5 min-h-0">
        {pillars.map((item, i) => (
          <PillarCard key={item.num} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
