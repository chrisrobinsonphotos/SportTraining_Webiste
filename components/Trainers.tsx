'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const trainers = [
  {
    name: 'Miguel Ángel',
    role: 'Fundador · Head Coach',
    since: 'Est. 2007',
    specialities: ['Entrenamiento Funcional', 'HYROX', 'Fuerza'],
    image: '/trainer-miguel.jpg',
    num: '01',
  },
  {
    name: 'Miguel Ángel Jr.',
    role: 'Entrenador Personal',
    since: 'Sport Training',
    specialities: ['CrossTraining', 'Rendimiento', 'HYROX'],
    image: '/trainer-jr.jpg',
    num: '02',
  },
  {
    name: 'María Ruiz Martínez',
    role: 'Entrenadora · Grupo',
    since: 'Sport Training',
    specialities: ['Entrenamiento en Grupo', 'Movilidad', 'Adaptado'],
    image: '/trainer-maria.jpg',
    num: '03',
  },
  {
    name: 'Pablo Spagnuolo',
    role: 'Entrenador Personal',
    since: 'Sport Training',
    specialities: ['Fuerza', 'Acondicionamiento', 'Nutrición'],
    image: '/trainer-dani.jpg',
    num: '04',
  },
]

function TrainerCard({ trainer, index }: { trainer: typeof trainers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative group overflow-hidden"
      style={{ minHeight: '70vh' }}
    >
      {/* Full-bleed portrait */}
      <div className="absolute inset-0">
        <Image
          src={trainer.image}
          alt={`${trainer.name} — Entrenador Sport Training Murcia`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="25vw"
          quality={90}
        />
        {/* Base dark gradient — always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
        {/* Extra overlay on hover */}
        <div className="absolute inset-0 bg-[#0F0F0F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Gold left rule — appears on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F1B91E] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
      </div>

      {/* Content — bottom anchored */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8" style={{ minHeight: '70vh' }}>

        {/* Number — top left */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontStyle: 'italic', textTransform: 'none' }}
            className="text-[#F1B91E]/50 text-[12px] tracking-[0.3em]"
          >
            {trainer.num}
          </span>
        </div>

        {/* Specialities — slide up on hover */}
        <div className="mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex flex-col gap-1.5">
            {trainer.specialities.map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-3 h-[1.5px] bg-[#F1B91E]" />
                <span
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-white/60 text-[11px] tracking-[0.15em] uppercase"
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gold divider */}
        <div className="w-8 h-[2px] bg-[#F1B91E] mb-4 group-hover:w-full transition-all duration-500" />

        {/* Name */}
        <h3
          style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
          className="text-white text-[28px] md:text-[32px] lg:text-[36px] uppercase leading-none mb-2"
        >
          {trainer.name}
        </h3>

        {/* Role */}
        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
          className="text-[#F1B91E] text-[11px] tracking-[0.2em] uppercase mb-1"
        >
          {trainer.role}
        </p>
        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-white/30 text-[11px] tracking-[0.15em] uppercase"
        >
          {trainer.since}
        </p>
      </div>
    </motion.div>
  )
}

export default function Trainers() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="equipo" ref={ref} className="relative bg-[#0F0F0F] min-h-screen flex flex-col overflow-hidden border-b-4 border-[#F1B91E]" style={{ scrollMarginTop: '90px' }}>

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 pt-20 pb-10 flex-shrink-0">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Nuestro Equipo</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            {/* Single semantic H2 for SEO — invisible to sighted users */}
            <h2 className="sr-only">
              Entrenadores Sport Training Murcia — Equipo de HYROX, CrossTraining y entrenamiento funcional
            </h2>

            {/* Decorative animated stack (sighted users) */}
            <div className="overflow-hidden" aria-hidden="true">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="block text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-white"
              >
                COACHES
              </motion.span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 border border-[#F1B91E]/40 text-[#F1B91E] px-6 py-4 hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-300 group"
            >
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[12px] tracking-[0.2em] uppercase">
                Conoce al Equipo
              </span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 4-column portrait grid — fills remaining space */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-0.5 min-h-0">
        {trainers.map((trainer, i) => (
          <TrainerCard key={trainer.num} trainer={trainer} index={i} />
        ))}
      </div>
    </section>
  )
}
