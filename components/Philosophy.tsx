'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const values = [
  { num: '01', title: 'CAPACIDAD ANTE LA ESTÉTICA', body: 'Entrenamos para lo que el cuerpo puede hacer, no solo para cómo se ve. Resultados que perduran.' },
  { num: '02', title: 'PROGRESO ESTRUCTURADO', body: 'Cada sesión tiene un propósito. Cada ejercicio, un impacto medible. Sin sesiones perdidas.' },
  { num: '03', title: 'INCLUSIVIDAD RADICAL', body: 'Abierto a todos: atletas de competición, profesionales ocupados y personas en recuperación.' },
  { num: '04', title: 'EXPERIENCIA HONESTA', body: 'Sin tendencias, sin suplementación innecesaria. Orientación honesta, basada en la ciencia.' },
]

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="filosofia" ref={ref} className="relative bg-[#1E1E1E] min-h-screen flex overflow-hidden" style={{ scrollMarginTop: '90px' }}>

      {/* LEFT: text column — full left side */}
      <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-24">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Nuestra Filosofía</span>
        </motion.div>

        {/* Giant left-edge headline */}
        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] lg:text-[8vw] leading-[0.85] uppercase text-white"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
          >
            ENTRENA
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] lg:text-[8vw] leading-[0.85] uppercase text-[#F1B91E]"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
          >
            PARA LA
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-0">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] lg:text-[8vw] leading-[0.85] uppercase text-white"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
          >
            VIDA.
          </motion.h2>
        </div>

        {/* Values list */}
        <div className="flex flex-col gap-[10px]" style={{ marginTop: 'calc(3rem + 100px)' }}>
          {values.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/8 py-11 group hover:border-[#F1B91E]/30 transition-colors duration-400 flex items-start gap-6"
            >
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[#F1B91E] text-[14px] tracking-[0.2em] mt-1 flex-shrink-0 w-8">{item.num}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                  className="text-white text-[22px] md:text-[26px] tracking-[0.06em] mb-3 uppercase leading-tight">
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-white/65 text-[17px] leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: full-bleed portrait image — no padding, bleeds to edge */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[45%]">
        {/* Gradient mask on the left edge of the image */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#1E1E1E] to-transparent" />
        {/* Gradient on top and bottom */}
        <div className="absolute inset-x-0 top-0 h-32 z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full relative"
        >
          <Image
            src="/portrait-miguel.jpg"
            alt="Miguel Ángel — Fundador Sport Training"
            fill
            className="object-cover object-top"
            quality={90}
            sizes="45vw"
          />
          {/* Subtle dark tint */}
          <div className="absolute inset-0 bg-[#1E1E1E]/20" />
        </motion.div>

        {/* Founder byline — bottom-left of image, above gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute bottom-10 left-10 z-20 flex items-center gap-4"
        >
          <div className="w-11 h-11 flex-shrink-0 overflow-hidden relative rounded-sm border border-[#F1B91E]/40">
            <Image src="/portrait-miguel.jpg" alt="Miguel Ángel" fill className="object-cover object-top" sizes="44px" />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
              className="text-white text-[15px] tracking-[0.1em] uppercase leading-tight">Miguel Ángel</p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
              className="text-white/55 text-[11px] tracking-[0.15em] uppercase">Fundador · Sport Training · 2007</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
