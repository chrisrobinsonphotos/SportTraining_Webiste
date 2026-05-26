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

      {/* LEFT: image panel — bleeds from the left edge */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[42%]">
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#191919] to-transparent" />
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
          <div className="absolute inset-0 bg-[#191919]/25" />
        </motion.div>
      </div>

      {/* RIGHT: two-column layout on desktop */}
      <div className="relative z-10 ml-auto w-full lg:w-[58%] flex flex-col lg:flex-row lg:items-stretch min-h-screen">

        {/* ── Col 1: Headline ── */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-16 lg:pr-10 py-24 w-full lg:w-[58%]">

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
              className="text-[13vw] lg:text-[5.5vw] leading-[0.85] uppercase text-white"
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
              className="text-[13vw] lg:text-[5.5vw] leading-[0.85] text-[#F1B91E]"
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
              className="text-[13vw] lg:text-[5.5vw] leading-[0.85] uppercase text-white"
            >
              ES PARA TODOS.
            </motion.h2>
          </div>
        </div>

        {/* ── Col 2: Features ── */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-10 lg:pr-16 py-24 w-full lg:w-[42%] lg:border-l lg:border-white/8">

          <div className="space-y-10 mb-12">
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
                className="border-l-2 border-[#F1B91E]/30 pl-6 hover:border-[#F1B91E] transition-colors duration-400"
              >
                <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                  className="text-white text-[28px] md:text-[32px] tracking-[0.04em] uppercase mb-3 leading-tight">
                  {item.title}
                </h4>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-white/65 text-[19px] leading-relaxed">
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
