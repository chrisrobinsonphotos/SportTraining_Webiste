'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const carouselImages = [
  { src: '/mas-que-un-gimnasio.jpg', caption: 'HYROX Murcia — Equipo Sport Training' },
  { src: '/hyrox-group.jpg', caption: 'Sport Training · Comunidad' },
  { src: '/hyrox-women.jpg', caption: 'Entrenamiento en Grupo · Comunidad ST' },
  { src: '/hyrox-medball.jpg', caption: 'Competición HYROX · Intensidad máxima' },
  { src: '/_MG_4351.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4352.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4359.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4372.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4374.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4376.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4404.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4410.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4417.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4513.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4522.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4535.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4578.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4605.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4628.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4670.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4701.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4729.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4758.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4795.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4839.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4918.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_4930.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5004.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5017.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5058.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5103.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5111.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5185.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5196.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5211.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5256.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5312.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5313.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5385.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5386.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5395.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5401.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5408.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5426.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5433.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5438.jpg', caption: 'Sport Training · Murcia' },
  { src: '/_MG_5450.jpg', caption: 'Sport Training · Murcia' },
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
      <div className="relative flex-1 min-h-[65vh] overflow-hidden">
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
              className="object-cover object-left-top"
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
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontStyle: 'italic', textTransform: 'none' }}
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
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
            className="text-[12px] tracking-[0.15em] text-white/50 tabular-nums w-16 text-center">
            {String(activeSlide + 1).padStart(2, '0')} / {String(carouselImages.length).padStart(2, '0')}
          </span>
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

      {/* BOTTOM HALF: Left text + right event list */}
      <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 flex-shrink-0">

        {/* Left: Headline + pillars + CTA */}
        <div>
          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[12vw] md:text-[7vw] leading-[0.88] uppercase text-white"
            >
              PRÓXIMOS
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[12vw] md:text-[7vw] leading-[0.88] uppercase text-[#F1B91E]"
            >
              EVENTOS.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-8 mb-8"
          >
            {['▪ CORAJE', '▪ COMUNIDAD', '▪ EVENTOS'].map(p => (
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
            <Link href="/contacto"
              aria-label="Ver la comunidad de Sport Training Murcia — eventos y galería"
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
        <div className="space-y-3 self-center">
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
