'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Adaptado() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="adaptado" ref={ref} className="relative bg-[#191919] min-h-screen flex overflow-hidden" style={{ scrollMarginTop: '90px' }}>

      {/* Image — left 55%, gradient bleeds right, darker overlay for text legibility */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[55%]">
        <div className="absolute right-0 top-0 bottom-0 w-72 z-10 bg-gradient-to-l from-[#191919] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 z-10 bg-gradient-to-b from-[#191919] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 z-10 bg-gradient-to-t from-[#191919] to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full relative"
        >
          <Image
            src="/hyrox-coaching.jpg"
            alt="Entrenamiento adaptado en Murcia para personas con discapacidad — Sport Training"
            fill
            className="object-cover object-center"
            quality={85}
          />
          <div className="absolute inset-0 bg-[#191919]/40" />
        </motion.div>
      </div>

      {/* Content: full-width flex row — headline left (50%), features right (50%) */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-stretch min-h-screen">

        {/* ── Left col: Headline — 50% of page, sits over image zone ── */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-16 lg:pr-8 py-24 w-full lg:w-1/2">

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-2 h-2 bg-[#F1B91E]" />
            <span className="section-label">Entrenamiento Adaptado</span>
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[13vw] lg:text-[4.5vw] leading-[0.85] uppercase text-white"
            >
              EL
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic' }}
              className="text-[13vw] lg:text-[4.5vw] leading-[0.85] text-[#F1B91E]"
            >
              ENTRENAMIENTO
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[13vw] lg:text-[4.5vw] leading-[0.85] uppercase text-white"
            >
              ES PARA TODOS.
            </motion.h2>
          </div>
        </div>

        {/* ── Right col: Features — 50% of page, always on pure dark bg ── */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-14 lg:pr-20 py-24 w-full lg:w-1/2 lg:border-l lg:border-white/8">

          <div className="mb-16">
            {[
              { title: 'Entrenamiento Real', body: 'No hablamos de rehabilitación clínica, sino de entrenamiento real, adaptado y guiado por profesionales.' },
              { title: 'Metodología Adaptada', body: 'Cada ejercicio, cada carga y cada progresión se ajusta a las necesidades de cada persona.' },
              { title: 'Confianza y Seguridad', body: 'Un lugar donde entrenar con seguridad, confianza y acompañamiento profesional.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`pl-7 pb-20 ${i > 0 ? 'border-t border-t-white/8 pt-20 mt-0' : ''}`}
              >
                <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                  className="text-white text-[42px] md:text-[50px] tracking-[0.03em] uppercase mb-6 leading-tight">
                  {item.title}
                </h4>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-white/65 text-[20px] leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Link href="/contacto"
              aria-label="Conocer el programa de entrenamiento adaptado en Sport Training Murcia"
              className="inline-flex items-center gap-3 border border-[#F1B91E]/40 text-[#F1B91E] px-7 py-4 hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-300 group">
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[11px] tracking-[0.25em] uppercase">Conocer el Programa</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
