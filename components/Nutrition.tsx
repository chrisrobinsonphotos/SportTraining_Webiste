'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const pillars = [
  { num: '01', label: 'ALIMENTACIÓN', image: '/nutrition-food.jpg', href: '/nutricion/alimentacion', desc: 'La base real de cualquier progreso. Hábitos sólidos sobre los que construir resultados duraderos.' },
  { num: '02', label: 'PLANIFICACIÓN', image: '/nutrition-textil.jpg', href: '/nutricion/planificacion', desc: 'Planes nutricionales integrados con tu entrenamiento. Objetivos claros, seguimiento real, sin dietas genéricas.' },
  { num: '03', label: 'SUPLEMENTACIÓN', image: '/nutrition-supplements.jpg', href: '/nutricion/suplementacion', desc: 'Solo cuando aporta valor. Pocos productos, calidad contrastada, dosis efectivas.' },
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
      <div style={{ padding: '4rem clamp(1.5rem,5vw,4rem) 2.25rem', maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[length:var(--fs-label)] tracking-[0.22em] uppercase"
            >
              Nutrición & Suplementación
            </span>
          </div>
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[length:var(--fs-h1)] leading-[0.88] uppercase text-white"
          >
            LOS HÁBITOS{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              transforman.
            </span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, maxWidth: '540px' }}
            className="mt-5 text-[1.05rem] leading-[1.55] text-white/60"
          >
            No hay progreso en el gimnasio sin estructura fuera de él. Alimentación, planificación y suplementación trabajando con tu entrenamiento — no contra él.
          </p>
        </motion.div>
      </div>

      {/* Pillar cards */}
      <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-[2px]">
        {pillars.map((item, i) => (
          <Link key={item.num} href={item.href}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group overflow-hidden flex flex-col justify-end cursor-pointer"
            style={{ minHeight: '60vh', padding: '2.5rem' }}
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
                className="text-white text-[length:var(--fs-h2)] uppercase leading-none mb-4"
              >
                {item.label}
              </h4>
              <div className="h-[2px] bg-[#F1B91E]/60 w-8 mb-4 group-hover:w-full transition-all duration-500" />
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[length:var(--fs-lead)] leading-[1.5] text-white/70 max-w-[300px]"
              >
                {item.desc}
              </p>
            </div>

            {/* Hover CTA bar — desktop only */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 hidden min-[860px]:flex items-center justify-center gap-2 bg-[#F1B91E] translate-y-full group-hover:translate-y-0"
              style={{ height: '44px', transition: 'transform .3s cubic-bezier(0.16,1,0.3,1)' }}
            >
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[#191919] text-[0.72rem] tracking-[0.2em] uppercase"
              >
                Descubre más
              </span>
              <svg className="w-3.5 h-3.5 text-[#191919]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between flex-wrap gap-6 border-t border-white/[0.07]"
        style={{ padding: '2.25rem clamp(1.5rem,5vw,4rem)' }}
      >
        <span
          style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.01em' }}
          className="text-[clamp(20px,2vw,28px)] uppercase text-white"
        >
          ¿Por dónde empezar?{' '}
          <span className="text-[#F1B91E]">Te lo planificamos.</span>
        </span>
        <button
          data-nutrition
          className="inline-flex items-center gap-3 bg-[#F1B91E] text-[#191919] hover:bg-[#C99200] transition-colors duration-200 group"
          style={{ padding: '1.05rem 2rem' }}
        >
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className="text-[0.72rem] tracking-[0.22em] uppercase"
          >
            Asesoramiento Nutricional
          </span>
          <svg className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </section>
  )
}
