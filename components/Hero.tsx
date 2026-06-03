'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const brandEase = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const inView = useInView(contentRef, { once: true, amount: 0.1 })

  useEffect(() => {
    setMounted(true)
  }, [])

  const show = mounted && inView

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#191919' }}
    >
      {/* Background image with parallax scale */}
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

        {/* .v1 — solid overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: '#191919', opacity: overlayOpacity }}
        />

        {/* .v2 — left-side gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #191919 0%, transparent 42%)',
          }}
        />

        {/* .v3 — bottom gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, #191919 0%, transparent 50%, rgba(25,25,25,0.3) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        ref={contentRef}
        style={{ y: textY, minHeight: '100vh', padding: '0 clamp(1.5rem,5vw,4rem) 120px' }}
        className="relative z-10 flex flex-col justify-end"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: brandEase }}
          className="flex items-center gap-4"
          style={{ marginBottom: '2rem' }}
        >
          <div className="shrink-0" style={{ width: 8, height: 8, background: '#F1B91E' }} />
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: 'clamp(0.85rem, 1vw, 1rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F1B91E',
            }}
          >
            Centro de Entrenamiento · Est. 2007 · Región de Murcia
          </span>
        </motion.div>

        {/* SEO-friendly sr-only h1 */}
        <h1 className="sr-only">
          Sport Training Murcia — Gimnasio HYROX, CrossTraining, Funcional y Entrenamiento Adaptado
        </h1>

        {/* Headline — 3 lines */}
        <div aria-hidden="true">
          {/* Line 1: HYROX — white */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={show ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: brandEase }}
              className="block"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 13vw, 12rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: '#FFFFFF',
              }}
            >
              HYROX
            </motion.span>
          </div>

          {/* Line 2: MURCIA. — gold italic */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={show ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.32, ease: brandEase }}
              className="block"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 13vw, 12rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                color: '#F1B91E',
                fontStyle: 'italic',
              }}
            >
              Murcia.
            </motion.span>
          </div>

          {/* Line 3: CLUB OFICIAL. — outline */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={show ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.44, ease: brandEase }}
              className="block"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 13vw, 12rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.2)',
              }}
            >
              CLUB OFICIAL.
            </motion.span>
          </div>
        </div>

        {/* hero-foot: sub text + buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: brandEase }}
          className="flex flex-wrap items-end justify-between"
          style={{ gap: '2rem', maxWidth: 980, marginTop: '2.5rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              maxWidth: 380,
            }}
          >
            Construye un cuerpo lo suficientemente fuerte para la vida.
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <button
              data-contact
              aria-label="Únete a Sport Training Murcia — contacto y reserva"
              className="group flex items-center gap-3 transition-colors duration-300"
              style={{
                background: '#F1B91E',
                color: '#191919',
                padding: '1rem 1.75rem',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#C99200')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#F1B91E')}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                Únete Ahora
              </span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <Link
              href="/#filosofia"
              aria-label="Conoce el método de entrenamiento de Sport Training Murcia"
              className="group flex items-center gap-3 transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                padding: '1rem 1.75rem',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F1B91E')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              <span
                className="group-hover:text-[#F1B91E] transition-colors"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                Nuestro Método
              </span>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(25,25,25,0.6)',
        }}
      >
        <div style={{ padding: '0 clamp(1.5rem,5vw,4rem)' }}>
          <div className="flex items-center justify-between py-4 overflow-x-auto gap-8">
            {[
              { value: '2007', label: 'Fundado' },
              { value: '3', label: 'Modalidades' },
              { value: '4', label: 'Disciplinas' },
              { value: 'Murcia', label: 'España' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    color: '#F1B91E',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {stat.label}
                </span>
                {i < 3 && (
                  <div
                    className="ml-3"
                    style={{
                      width: 1,
                      height: 16,
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />
                )}
              </div>
            ))}
            {/* Scroll cue */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: brandEase }}
              >
                <svg
                  className="w-4 h-4"
                  style={{ color: '#F1B91E' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="square" d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: '0.55rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                Scroll
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
