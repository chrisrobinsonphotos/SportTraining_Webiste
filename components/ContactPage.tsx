'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from './Navbar'
import ContactForm from './ContactForm'

const PHONE = '622443495'
const PHONE_DISPLAY = '622 443 495'
const WHATSAPP_URL = `https://wa.me/34${PHONE}`
const CALL_URL = `tel:+34${PHONE}`
const ADDRESS = 'C. Cisne, 3, 30009 Murcia'
const MAPS_LINK = `https://maps.google.com/?q=Sport+Training+Murcia,+C.+Cisne+3,+30009+Murcia`

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' })

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative px-6 md:px-12 lg:px-16 pb-20 border-b border-white/8"
        style={{ paddingTop: '140px' }}>
        <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[18vw] md:text-[13vw] lg:text-[10vw] leading-[0.85] uppercase"
            >
              <span className="text-white">HABLE</span>
              <span style={{ fontStyle: 'italic' }} className="text-[#F1B91E]">MOS.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="w-2 h-2 bg-[#F1B91E]" />
            <span className="section-label">Contacto · Sport Training Murcia</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className="text-white/45 text-[17px] leading-relaxed mt-10 max-w-[480px]"
          >
            Estamos en Murcia desde 2007. Escríbenos, llámanos o pásate directamente.
          </motion.p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section ref={contentRef} className="flex flex-col lg:flex-row min-h-screen border-b border-white/8">

        {/* ── LEFT COLUMN — 40% ── */}
        <div className="w-full lg:w-[40%] flex-shrink-0 px-6 md:px-12 lg:px-16 py-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/8">

          {/* TELÉFONO */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-xs text-[#F1B91E] uppercase tracking-widest mb-5">
              Teléfono
            </p>
            <a href={CALL_URL}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
              className="block text-white text-5xl md:text-6xl lg:text-7xl uppercase leading-none mb-4 hover:text-[#F1B91E] transition-colors duration-300">
              {PHONE_DISPLAY}
            </a>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-sm text-white/50">
              Llámanos directamente →
            </p>
          </motion.div>

          <div className="border-t border-white/8" />

          {/* WHATSAPP */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="my-20"
          >
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-xs text-[#F1B91E] uppercase tracking-widest mb-5">
              WhatsApp
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
              className="block text-white text-5xl md:text-6xl lg:text-7xl uppercase leading-none mb-4 hover:text-[#F1B91E] transition-colors duration-300">
              {PHONE_DISPLAY}
            </a>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-sm text-white/50">
              Escríbenos por WhatsApp →
            </p>
          </motion.div>

          <div className="border-t border-white/8" />

          {/* DIRECCIÓN */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20"
          >
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-xs text-[#F1B91E] uppercase tracking-widest mb-5">
              Dirección
            </p>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
              className="block text-white text-4xl md:text-5xl lg:text-6xl uppercase leading-tight mb-4 hover:text-[#F1B91E] transition-colors duration-300">
              {ADDRESS}
            </a>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-sm text-white/50">
              Ver en Google Maps →
            </p>
          </motion.div>

        </div>

        {/* ── RIGHT COLUMN — 60% ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={contentInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[60%] px-6 md:px-12 lg:px-16 py-24 flex flex-col justify-center"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-xs text-[#F1B91E] uppercase tracking-widest">
              Formulario de contacto
            </span>
          </div>

          {/* Heading */}
          <div className="mb-16">
            <div className="overflow-hidden">
              <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
                className="text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.95] text-white pb-1">
                Envía un
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontStyle: 'italic' }}
                className="text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.95] text-[#F1B91E] pb-2">
                Mensaje.
              </h2>
            </div>
          </div>

          <ContactForm />
        </motion.div>

      </section>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t-4 border-[#F1B91E] px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-white/25 text-[13px]">
          © 2026 Sport Training Murcia · Todos los derechos reservados
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 text-[#F1B91E] hover:text-white transition-colors duration-300">
          <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className="text-[11px] tracking-[0.2em] uppercase">Volver al inicio</span>
        </Link>
      </div>

    </div>
  )
}
