'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden bg-[#191919]">

      {/* Full-bleed background: gym logo wall */}
      <div className="absolute inset-0">
        <Image
          src="/cta-group.jpg"
          alt="Comunidad Sport Training Murcia — entrenamiento en grupo HYROX, CrossTraining y funcional"
          fill
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />
        {/* Dark overlay — strong so gold text pops */}
        <div className="absolute inset-0 bg-[#191919]/70" />
        {/* Gold overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#F1B91E]/20 to-transparent" />
        {/* Left-side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#191919]/80 to-transparent" />
      </div>

      {/* Content — bottom-left */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pb-20 md:pb-28 w-full">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Empieza Hoy</span>
        </motion.div>

        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic', textTransform: 'none' }}
            className="text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] uppercase text-white"
          >
            ÚNETE A LA
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className="text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] uppercase text-[#F1B91E]"
            
          >
            Comunidad ST.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Link href="/contacto"
            aria-label="Contactar con Sport Training Murcia — WhatsApp, teléfono o visita"
            className="group flex items-center gap-3 bg-[#F1B91E] text-[#191919] px-8 py-4 hover:bg-[#C99200] transition-colors duration-300">
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[12px] tracking-[0.25em] uppercase">Contactar Ahora</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/#modalidades"
            aria-label="Ver modalidades y precios de Sport Training Murcia"
            className="flex items-center gap-3 border border-white/20 text-white px-8 py-4 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-all duration-300">
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-[12px] tracking-[0.25em] uppercase">Ver Modalidades</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
