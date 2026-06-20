'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const brandEase = [0.16, 1, 0.3, 1] as const

/* ─── Official HYROX affiliations Sport Training holds ─── */
const affiliations = [
  { src: '/hyrox/tc-white.png', w: 4173, h: 231, alt: 'HYROX Training Club Oficial', label: 'Training Club' },
  { src: '/hyrox/perfcoach-white.png', w: 4172, h: 177, alt: 'HYROX Performance Coach', label: 'Performance Coach' },
  { src: '/hyrox/osih-white.png', w: 3381, h: 254, alt: 'Official HYROX', label: 'Centro Oficial' },
]

/* ─── The race: 8 functional stations, a 1 km run before each ─── */
const stations = [
  { num: '01', name: 'SkiErg', metric: '1000 m', desc: 'Tracción vertical de cuerpo completo. Marca el ritmo de salida.' },
  { num: '02', name: 'Empuje de Trineo', metric: '50 m', desc: 'Potencia de piernas bajo carga máxima. El primer gran muro.' },
  { num: '03', name: 'Arrastre de Trineo', metric: '50 m', desc: 'Tracción explosiva. Cadena posterior a pleno rendimiento.' },
  { num: '04', name: 'Burpees con Salto', metric: '80 m', desc: 'Coordinación y resistencia cuando el cuerpo ya pide parar.' },
  { num: '05', name: 'Remo', metric: '1000 m', desc: 'Potencia aeróbica de cuerpo completo. Recuperar sin perder ritmo.' },
  { num: '06', name: 'Farmers Carry', metric: '200 m', desc: 'Fuerza de agarre y core bajo carga sostenida.' },
  { num: '07', name: 'Zancadas con Saco', metric: '100 m', desc: 'Piernas y estabilidad al límite con el saco a la espalda.' },
  { num: '08', name: 'Wall Balls', metric: '100 reps', desc: 'El muro final. Piernas, hombros y cabeza hasta cruzar la meta.' },
]

/* ─── Race divisions ─── */
const divisions = [
  { name: 'Individual', tag: 'Open / Pro', desc: 'Tú contra el crono. Open con pesos estándar; Pro con cargas de élite.' },
  { name: 'Dobles', tag: 'Parejas', desc: 'Dos atletas se reparten cada estación. La mitad del trabajo, el doble de estrategia.' },
  { name: 'Relevos', tag: 'Equipos de 4', desc: 'Cuatro atletas, dos rondas cada uno. El formato más explosivo y de equipo.' },
  { name: 'Adaptado', tag: 'HYROX Adaptive', desc: 'El mismo reto, adaptado: la competición también para atletas con discapacidad.' },
]

/* ─── PFT achievement tiers (official HYROX patches) ─── */
const pftTiers = [
  { src: '/hyrox/pft-bronze.jpg', name: 'Bronce', desc: 'Tu punto de partida. Estableces la base de fuerza y resistencia sobre la que construir.' },
  { src: '/hyrox/pft-silver.jpg', name: 'Plata', desc: 'Rendimiento sólido. Llegas a la línea de salida con confianza.' },
  { src: '/hyrox/pft-gold.jpg', name: 'Oro', desc: 'Nivel alto. El estándar de quien entrena para el podio.' },
]

export default function EntrenamientoHyrox() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const afRef = useRef<HTMLDivElement>(null)
  const afInView = useInView(afRef, { once: true, margin: '-80px' })
  const raceRef = useRef<HTMLDivElement>(null)
  const raceInView = useInView(raceRef, { once: true, margin: '-80px' })
  const queRef = useRef<HTMLDivElement>(null)
  const queIn = useInView(queRef, { once: true, margin: '-80px' })
  const divRef = useRef<HTMLDivElement>(null)
  const divIn = useInView(divRef, { once: true, margin: '-80px' })
  const pftRef = useRef<HTMLDivElement>(null)
  const pftIn = useInView(pftRef, { once: true, margin: '-80px' })
  const progRef = useRef<HTMLDivElement>(null)
  const progIn = useInView(progRef, { once: true, margin: '-80px' })

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight: '82vh', backgroundColor: '#0a0a0a', scrollMarginTop: '90px' }}
      >
        <div className="absolute inset-0">
          <Image
            src="/hyrox-effort.jpg"
            alt="Atleta de HYROX en Sport Training Murcia"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            quality={88}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0.5) 45%, transparent 80%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0a0a0a 4%, transparent 55%)' }} />
        </div>

        <div
          className="relative z-10 w-full"
          style={{ padding: 'var(--section-pad-y-hero) var(--section-pad-x) var(--section-pad-y)' }}
        >
          <div className="st-container">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [...brandEase] }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
              <span className="section-label">HYROX · Training Club Oficial</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [...brandEase] }}
                className="text-white uppercase"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-display)', lineHeight: 0.85, letterSpacing: '-0.03em' }}
              >
                HYROX
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.span
                initial={{ y: 120, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.18, ease: [...brandEase] }}
                className="block italic"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-display)', lineHeight: 0.85, letterSpacing: '-0.03em', color: '#F1B91E' }}
              >
                Murcia.
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.34, ease: [...brandEase] }}
              className="t-lead text-white/80"
              style={{ maxWidth: '50ch' }}
            >
              El fitness convertido en deporte. Ocho kilómetros de carrera, ocho estaciones
              funcionales, un solo crono. En Sport Training entrenas el formato oficial —
              desde tu primera sesión hasta la línea de meta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [...brandEase] }}
              className="mt-10"
            >
              <button
                data-contact
                className="group inline-flex items-center gap-3"
                style={{ background: '#F1B91E', color: '#191919', padding: '1rem 1.75rem' }}
              >
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'var(--fs-label)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  Pide tu Día de Prueba
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ OFFICIAL AFFILIATIONS ═══════════════ */}
      <section ref={afRef} style={{ backgroundColor: '#111111', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={afInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span className="section-label">Centro Oficial HYROX</span>
          </motion.div>

          <div className="grid items-center gap-x-12 gap-y-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {affiliations.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 20 }}
                animate={afInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [...brandEase] }}
                className="flex flex-col gap-4"
              >
                <Image src={a.src} alt={a.alt} width={a.w} height={a.h} style={{ height: 26, width: 'auto' }} />
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 'var(--fs-label)', letterSpacing: '0.2em', textTransform: 'uppercase' }} className="text-white/40">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={afInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [...brandEase] }}
            className="t-small text-white/45 mt-12"
            style={{ maxWidth: '60ch' }}
          >
            Sport Training es centro afiliado HYROX en Murcia: instalaciones, equipamiento y
            entrenadores certificados bajo el estándar oficial de la competición.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ EL RECORRIDO — 8 STATIONS ═══════════════ */}
      <section ref={raceRef} style={{ backgroundColor: '#0a0a0a', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={raceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span className="section-label">El Recorrido</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={raceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-4"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
          >
            8 estaciones.{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>8 kilómetros.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={raceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
            className="t-body text-white/60 mb-16"
            style={{ maxWidth: '58ch' }}
          >
            El mismo recorrido en todo el mundo. Una carrera de 1 km antes de cada estación —
            sin descanso entre medias. Así se entrena en Sport Training, en el orden exacto de la competición.
          </motion.p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
            {stations.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                animate={raceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [...brandEase] }}
                className="group relative flex flex-col"
                style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(1.5rem,2vw,2rem)' }}
              >
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'var(--fs-label)', letterSpacing: '0.2em' }} className="text-[#F1B91E]/70 mb-6">
                  Carrera 1 km →
                </span>
                <div className="flex items-baseline justify-between mb-3">
                  <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h2)', lineHeight: 1 }} className="text-white/15">
                    {s.num}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 'var(--fs-small)' }} className="text-[#F1B91E]">
                    {s.metric}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h3)', textTransform: 'uppercase', lineHeight: 1.05 }} className="text-white mb-3">
                  {s.name}
                </h3>
                <div className="bg-[#F1B91E]/50 mb-3" style={{ height: 2, width: 32 }} />
                <p className="t-small text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={raceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [...brandEase] }}
            className="t-small text-white/40 mt-10"
            style={{ maxWidth: '64ch' }}
          >
            Total: 8 km de carrera + 8 estaciones funcionales, sin pausa. El crono no para hasta Wall Balls.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ ¿QUÉ ES HYROX? ═══════════════ */}
      <section ref={queRef} style={{ backgroundColor: '#111111', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={queIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [...brandEase] }} className="flex items-center gap-3 mb-8">
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span className="section-label">¿Qué es HYROX?</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={queIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }} className="text-white uppercase mb-6" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
            El deporte del{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>fitness.</span>
          </motion.h2>
          <div className="grid gap-x-16 gap-y-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={queIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }} className="t-lead text-white/70">
              HYROX nació en 2017 y es hoy la competición de fitness que más crece del mundo. Un único formato,
              idéntico en cada ciudad: 8 km de carrera y 8 estaciones funcionales, siempre en pista cubierta.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={queIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: [...brandEase] }} className="t-body text-white/60">
              Por eso tu tiempo en Murcia se compara con el de cualquier atleta en Berlín o Nueva York: mismo
              recorrido, mismas cargas, mismo estándar. Y está pensado para todos — del que nunca ha competido al
              deportista de élite. No es una clase: es un deporte, con una marca que batir.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════ DIVISIONES ═══════════════ */}
      <section ref={divRef} style={{ backgroundColor: '#0a0a0a', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={divIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [...brandEase] }} className="flex items-center gap-3 mb-8">
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span className="section-label">Divisiones</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={divIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }} className="text-white uppercase mb-4" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
            Una carrera.{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>varias formas de correrla.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={divIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }} className="t-body text-white/60 mb-16" style={{ maxWidth: '58ch' }}>
            Eliges cómo competir según tu nivel y con quién: solo, en pareja o en equipo. El reto es el mismo;
            la estrategia cambia.
          </motion.p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
            {divisions.map((d, i) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 30 }} animate={divIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [...brandEase] }} className="flex flex-col" style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(1.5rem,2vw,2rem)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-small)' }} className="text-[#F1B91E]/70 mb-3">{d.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h3)', textTransform: 'uppercase', lineHeight: 1.05 }} className="text-white mb-3">{d.name}</h3>
                <div className="bg-[#F1B91E]/50 mb-3" style={{ height: 2, width: 32 }} />
                <p className="t-small text-white/60">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HYROX PFT ═══════════════ */}
      <section ref={pftRef} style={{ backgroundColor: '#111111', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={pftIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [...brandEase] }} className="flex items-center gap-3 mb-8">
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span className="section-label">HYROX PFT</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={pftIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }} className="text-white uppercase mb-4" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
            Mide dónde{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>estás.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={pftIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }} className="t-body text-white/60 mb-16" style={{ maxWidth: '60ch' }}>
            El HYROX PFT (Physical Fitness Test) es una prueba estandarizada que mide tu condición física frente
            al estándar oficial de HYROX. Te da un punto de partida claro y tres niveles de logro para seguir tu
            progreso, entreno a entreno.
          </motion.p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px' }}>
            {pftTiers.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={pftIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [...brandEase] }} className="flex flex-col items-start" style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(1.75rem,2.2vw,2.25rem)' }}>
                <div className="relative mb-5" style={{ width: 84, height: 84 }}>
                  <Image src={t.src} alt={`HYROX PFT ${t.name}`} fill sizes="84px" className="object-contain" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h3)', textTransform: 'uppercase' }} className="text-white mb-3">{t.name}</h3>
                <div className="bg-[#F1B91E]/50 mb-3" style={{ height: 2, width: 32 }} />
                <p className="t-small text-white/60">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CÓMO ENTRENAMOS + CTA ═══════════════ */}
      <section ref={progRef} className="relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="absolute inset-0">
          <Image src="/hyrox-coaching.jpg" alt="Entrenamiento HYROX guiado en Sport Training Murcia" fill sizes="100vw" className="object-cover object-center" quality={85} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0a0a0a 8%, rgba(10,10,10,0.82) 50%, rgba(10,10,10,0.7) 100%)' }} />
        </div>
        <div className="relative z-10" style={{ padding: 'var(--section-pad-y-hero) var(--section-pad-x)' }}>
          <div className="st-container">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={progIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [...brandEase] }} className="flex items-center gap-3 mb-8">
              <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
              <span className="section-label">En Sport Training</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={progIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }} className="text-white uppercase mb-6" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
              Del primer entreno a la{' '}
              <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>línea de meta.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={progIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }} className="t-lead text-white/75 mb-10" style={{ maxWidth: '54ch' }}>
              Como HYROX Training Club oficial, entrenas el formato real con el equipamiento de competición
              — SkiErg, trineos, wall balls — y simulacros de carrera dirigidos por entrenadores certificados.
              Tanto si es tu primera HYROX como si buscas podio, te llevamos hasta la meta.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={progIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: [...brandEase] }} className="flex flex-wrap items-center gap-4">
              <button data-contact className="group inline-flex items-center gap-3" style={{ background: '#F1B91E', color: '#191919', padding: '1rem 1.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'var(--fs-label)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Pide tu Día de Prueba</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button data-contact className="inline-flex items-center" style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '1rem 1.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 'var(--fs-label)', letterSpacing: '0.25em', textTransform: 'uppercase' }} className="text-white/80">Habla con un entrenador</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
