'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const carouselImages = [
  { src: '/hyrox-team.jpg', caption: 'HYROX Murcia — Equipo Sport Training' },
  { src: '/hyrox-women.jpg', caption: 'Entrenamiento en Grupo · Comunidad ST' },
  { src: '/hyrox-medball.jpg', caption: 'Competición HYROX · Intensidad máxima' },
  { src: '/hyrox-community.jpg', caption: 'Coraje. Comunidad. Eventos.' },
  { src: '/hyrox-event.jpg', caption: 'Evento Sport Training · Murcia' },
]

const events = [
  { type: 'Competición', title: 'HYROX Murcia', date: 'Próximamente', desc: 'Compite junto a la comunidad ST en el mayor evento de fitness funcional.' },
  { type: 'Reto', title: 'Challenge Mensual', date: 'Cada mes', desc: 'Retos grupales que fortalecen el equipo y miden tu progreso.' },
  { type: 'Formación', title: 'Talleres Técnicos', date: 'Periódicos', desc: 'Sesiones especiales de técnica, nutrición y rendimiento.' },
]

export default function Community() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  const paginate = (newIndex: number) => {
    setDirection(newIndex > activeSlide ? 1 : -1)
    setActiveSlide((newIndex + carouselImages.length) % carouselImages.length)
  }

  return (
    <section ref={ref} className="relative bg-[#0D0D0D] min-h-screen flex flex-col overflow-hidden border-b-4 border-[#F1B91E]">

      {/* TOP HALF: Carousel — full width, no padding */}
      <div className="relative flex-1 min-h-[50vh] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[activeSlide].src}
              alt={carouselImages[activeSlide].caption}
              fill
              className="object-cover object-top"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-transparent to-[#0D0D0D]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute bottom-6 left-6 md:left-12 lg:left-16 z-20">
          <motion.p
            key={activeSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
            className="text-white/70 text-[13px] tracking-[0.2em] uppercase"
          >
            {carouselImages[activeSlide].caption}
          </motion.p>
        </div>

        {/* Carousel controls — bottom right */}
        <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-3">
          <button onClick={() => paginate(activeSlide - 1)}
            className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#F1B91E] hover:text-[#F1B91E] text-white/40 transition-all duration-300">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            {carouselImages.map((_, i) => (
              <button key={i} onClick={() => paginate(i)}
                className={`transition-all duration-300 ${i === activeSlide ? 'w-6 h-1 bg-[#F1B91E]' : 'w-1 h-1 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
          <button onClick={() => paginate(activeSlide + 1)}
            className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#F1B91E] hover:text-[#F1B91E] text-white/40 transition-all duration-300">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Big label top-left */}
        <div className="absolute top-8 left-6 md:left-12 lg:left-16 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-4"
          >
            <div className="w-2 h-2 bg-[#F1B91E]" />
            <span className="section-label">Eventos & Comunidad</span>
          </motion.div>
        </div>
      </div>

      {/* FLASH STRIP: Horizontally scrollable flash photos */}
      <div className="w-full overflow-x-auto no-scrollbar flex-shrink-0 border-t border-white/5">
        <div className="flex gap-0.5" style={{ width: 'max-content' }}>
          {[
            { src: '/flash-1.jpg', caption: 'Equipo ST · HYROX' },
            { src: '/flash-2.jpg', caption: 'Comunidad' },
            { src: '/flash-3.jpg', caption: 'Wall Ball' },
            { src: '/flash-4.jpg', caption: 'Esfuerzo' },
            { src: '/flash-5.jpg', caption: 'Intensidad' },
            { src: '/flash-6.jpg', caption: 'El Trabajo' },
            { src: '/flash-7.jpg', caption: 'Pasión' },
          ].map((img, i) => (
            <div key={i} className="relative flex-shrink-0 overflow-hidden group"
              style={{ width: '28vw', height: '22vw', maxWidth: 400, maxHeight: 320 }}>
              <Image src={img.src} alt={img.caption} fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                quality={80} />
              <div className="absolute inset-0 bg-[#0D0D0D]/40 group-hover:bg-[#0D0D0D]/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-white/50 text-[10px] tracking-[0.2em] uppercase">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM HALF: Left text + right event list */}
      <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 flex-shrink-0">

        {/* Left: Headline + pillars + CTA */}
        <div>
          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
              className="text-[12vw] md:text-[7vw] leading-[0.88] uppercase text-white"
            >
              MÁS QUE
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}
              className="text-[12vw] md:text-[7vw] leading-[0.88] uppercase text-[#F1B91E]"
            >
              UN GIMNASIO.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-8 mb-8"
          >
            {['⚡ CORAJE', '◈ COMUNIDAD', '◉ EVENTOS'].map(p => (
              <div key={p} className="border border-white/10 px-4 py-2.5">
                <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                  className="text-white text-[12px] tracking-[0.2em] uppercase">{p}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Link href="/comunidad"
              className="inline-flex items-center gap-3 bg-[#F1B91E] text-[#191919] px-7 py-4 hover:bg-[#C99200] transition-colors duration-300 group">
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[11px] tracking-[0.25em] uppercase">Ver Comunidad</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Right: Event cards */}
        <div className="space-y-3">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/8 p-6 hover:border-[#F1B91E]/30 transition-colors duration-400 group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-[10px] tracking-[0.2em] uppercase text-[#F1B91E] border border-[#F1B91E]/30 px-2.5 py-1">
                  {event.type}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-[10px] tracking-[0.15em] uppercase text-white/25">{event.date}</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-white text-[24px] md:text-[28px] uppercase leading-tight mb-2">
                {event.title}
              </h4>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
                className="text-white/55 text-[15px] leading-relaxed">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
