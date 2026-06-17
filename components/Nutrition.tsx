'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const pillars = [
  { num: '01', label: 'ALIMENTACIÓN', image: '/nutrition-food.jpg', desc: 'La base real de cualquier progreso. Hábitos sólidos sobre los que construir resultados duraderos.' },
  { num: '02', label: 'PLANIFICACIÓN', image: '/nutrition-textil.jpg', desc: 'Planes nutricionales integrados con tu entrenamiento. Objetivos claros, seguimiento real, sin dietas genéricas.' },
  { num: '03', label: 'SUPLEMENTACIÓN', image: '/nutrition-supplements.jpg', desc: 'Solo cuando aporta valor. Pocos productos, calidad contrastada, dosis efectivas.' },
]

export default function Nutrition() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="nutricion"
      ref={ref}
      className="relative bg-[#191919] flex flex-col overflow-hidden"
      style={{ minHeight: 'auto' }}
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-end justify-between gap-6"
        style={{ padding: '5rem clamp(1.5rem,5vw,4rem) 2.5rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[clamp(0.85rem,1vw,1rem)] tracking-[0.22em] uppercase"
            >
              Nutrición & Suplementación
            </span>
          </div>
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(3.6rem,7.8vw,7.2rem)] leading-[0.88] uppercase text-white"
          >
            LOS HÁBITOS{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              transforman.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <button
            data-contact
            className="inline-flex items-center gap-3 bg-transparent text-[#F1B91E] border border-[#F1B91E]/40 hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-300 group"
            style={{ padding: '1rem 1.75rem' }}
          >
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[0.7rem] tracking-[0.25em] uppercase"
            >
              Asesoramiento Nutricional
            </span>
            <svg className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Pillar cards */}
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {pillars.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group overflow-hidden flex flex-col justify-end cursor-pointer"
            style={{ minHeight: '46vh', padding: '2rem' }}
            data-contact
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={`${item.label} — Nutrición deportiva Sport Training Murcia`}
                fill
                sizes="33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                quality={80}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #191919, rgba(25,25,25,.65) 45%, rgba(25,25,25,.2))' }} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontStyle: 'italic', textTransform: 'none' }}
                className="text-[#F1B91E] text-[0.95rem] tracking-[0.3em] block mb-3"
              >
                {item.num}
              </span>
              <h4
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-white text-[clamp(2.3rem,3.4vw,3.1rem)] uppercase leading-none mb-4"
              >
                {item.label}
              </h4>
              <div className="h-[2px] bg-[#F1B91E]/60 w-8 mb-4 group-hover:w-full transition-all duration-500" />
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[clamp(1.3rem,1.5vw,1.55rem)] leading-[1.5] text-white/70 max-w-[300px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
