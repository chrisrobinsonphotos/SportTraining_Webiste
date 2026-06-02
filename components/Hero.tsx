'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // Trigger animations immediately on mount
    const timer = setTimeout(() => setInView(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#191919]"
    >
      {/* Full-bleed background image */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src="/hero-gym.jpg"
          alt="Sport Training Murcia — gimnasio de HYROX, CrossTraining y entrenamiento funcional"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: overlayOpacity }}
        >
          <div className="absolute inset-0 bg-[#191919]" />
        </motion.div>
        {/* Left-side gradient so left text reads clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#191919] via-[#191919]/80 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-transparent to-[#191919]/30" />
      </motion.div>

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <motion.line x1="1100" y1="0" x2="1440" y2="500"
            stroke="#F1B91E" strokeWidth="0.6" strokeOpacity="0.2"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 1.5 }} />
          <motion.path d="M20 40 L20 20 L40 20" stroke="#F1B91E" strokeWidth="1.5" strokeOpacity="0.6" fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: 2 }} />
        </svg>
      </div>

      {/* Content — bottom-left anchored, Nike-style */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex flex-col justify-end min-h-screen pb-20 md:pb-24 px-6 md:px-12 lg:px-16"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Centro de Entrenamiento · Est. 2007 · Región de Murcia</span>
        </motion.div>

        {/*
          One semantic, keyword-rich H1 for SEO + screen readers.
          Visually hidden but indexed by Google. The decorative animated stack
          below preserves the visual brand design 1:1 (now aria-hidden so it
          isn't double-read by screen readers).
        */}
        <h1 className="sr-only">
          Sport Training Murcia — Gimnasio HYROX, CrossTraining, Funcional y Entrenamiento Adaptado
        </h1>

        {/* Giant headline — left-aligned, bleeds off right (decorative) */}
        <div className="overflow-hidden mb-[-8px]" aria-hidden="true">
          <motion.span
            initial={{ y: 120, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="block text-[18vw] md:text-[16vw] lg:text-[13vw] xl:text-[11vw] leading-[0.85] tracking-[-0.03em] text-white uppercase sm:whitespace-nowrap"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
          >
            HYROX
          </motion.span>
        </div>

        <div className="overflow-hidden mb-[-8px]" aria-hidden="true">
          <motion.span
            initial={{ y: 120, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.32 }}
            className="block text-[18vw] md:text-[16vw] lg:text-[13vw] xl:text-[11vw] leading-[0.85] tracking-[-0.03em] text-[#F1B91E] uppercase sm:whitespace-nowrap"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic' }}
          >
            MURCIA.
          </motion.span>
        </div>

        <div className="overflow-hidden mb-10" aria-hidden="true">
          <motion.span
            initial={{ y: 120, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.44 }}
            className="block text-[18vw] md:text-[16vw] lg:text-[13vw] xl:text-[11vw] leading-[0.85] tracking-[-0.03em] uppercase sm:whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              WebkitTextStroke: '2px rgba(255,255,255,0.2)',
              color: 'transparent',
            }}
          >
            CLUB OFICIAL.
          </motion.span>
        </div>

        {/* Bottom row: tagline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 max-w-[900px]"
        >
          <p
            className="text-white/50 text-[15px] md:text-[17px] leading-relaxed max-w-[380px]"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
          >
            Construye un cuerpo lo suficientemente fuerte para la vida.
          </p>

          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              data-contact
              aria-label="Únete a Sport Training Murcia — contacto y reserva"
              className="group flex items-center gap-3 bg-[#F1B91E] text-[#191919] px-7 py-4 hover:bg-[#C99200] transition-colors duration-300"
            >
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[11px] tracking-[0.25em] uppercase">
                Únete Ahora
              </span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <Link
              href="/#filosofia"
              aria-label="Conoce el método de entrenamiento de Sport Training Murcia"
              className="group flex items-center gap-3 border border-white/20 text-white px-7 py-4 hover:border-[#F1B91E] transition-all duration-300"
            >
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                className="text-[11px] tracking-[0.25em] uppercase text-white/70 group-hover:text-[#F1B91E] transition-colors">
                Nuestro Método
              </span>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip — bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/8"
        style={{ backdropFilter: 'blur(10px)', background: 'rgba(25,25,25,0.6)' }}
      >
        <div className="px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between py-4 overflow-x-auto gap-8">
            {[
              { value: '2007', label: 'Fundado' },
              { value: '3', label: 'Modalidades' },
              { value: '4', label: 'Disciplinas' },
              { value: 'Murcia', label: 'España' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className="text-[#F1B91E] text-lg">{stat.value}</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-white/35 text-[10px] tracking-[0.2em] uppercase">{stat.label}</span>
                {i < 3 && <div className="w-[1px] h-4 bg-white/10 ml-3" />}
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                <svg className="w-4 h-4 text-[#F1B91E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="square" d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                className="text-white/25 text-[9px] tracking-[0.25em] uppercase">Scroll</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
