'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="comunidad" ref={ref} className="relative overflow-hidden bg-[#191919]">

      {/* Background image — full bleed */}
      <div className="absolute inset-0">
        <Image
          src="/cta-community.jpg"
          alt="Comunidad Sport Training Murcia — entrenamiento en grupo HYROX, CrossTraining y funcional"
          fill
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#191919]/70" />
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#F1B91E]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191919]/80 to-transparent" />
      </div>

      {/* ── TOP: Headline + buttons — vertically centered in the hero zone ── */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{ minHeight: '100vh', padding: '8rem clamp(1.5rem,5vw,4rem)' }}
      >
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
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(4.2rem,9.6vw,8.4rem)] leading-[0.85] uppercase text-white"
          >
            ÚNETE A LA
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(4.2rem,9.6vw,8.4rem)] leading-[0.85] text-[#F1B91E]"
          >
            Comunidad ST.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-4"
          style={{ marginTop: 'clamp(3rem, 5vw, 5rem)' }}
        >
          <button
            data-contact
            className="group flex items-center gap-3 bg-[#F1B91E] text-[#191919] hover:bg-[#C99200] transition-colors duration-300"
            style={{ padding: '1rem 1.75rem' }}
          >
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[0.7rem] tracking-[0.25em] uppercase">Contactar Ahora</span>
            <svg className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <Link href="/#modalidades"
            className="flex items-center gap-3 border border-white/20 text-white/65 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-all duration-300"
            style={{ padding: '1rem 1.75rem' }}
          >
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-[0.7rem] tracking-[0.25em] uppercase">Ver Modalidades</span>
          </Link>
        </motion.div>
      </div>

      {/* ── BOTTOM: QR Cards — separate section with its own background ── */}
      <div
        className="relative z-10"
        style={{
          padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)',
          background: 'linear-gradient(0deg, rgba(17,17,17,0.95), rgba(17,17,17,0.8))',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-[repeat(2,minmax(0,1fr))] gap-5 max-w-[920px]"
        >
          {[
            {
              tag: 'WhatsApp · Canal de Noticias',
              title: 'SPORTTRAINING NOTICIAS',
              body: 'Novedades, horarios y eventos directamente en tu WhatsApp.',
              qr: '/qr-hyrox-grupo.png',
            },
            {
              tag: 'WhatsApp · Grupo HYROX',
              title: 'GRUPO HYROX',
              body: 'Únete al grupo de la comunidad HYROX de Sport Training.',
              qr: '/qr-hyrox-grupo.png',
            },
          ].map((card) => (
            <div key={card.title} className="flex items-stretch gap-5 bg-[#111111]/72 backdrop-blur-[10px] border border-white/10 p-5 hover:border-[#F1B91E]/50 transition-colors duration-300">
              <div className="flex-shrink-0 w-[104px] h-[104px] bg-white p-[7px] self-start">
                <div className="relative w-full h-full">
                  <Image src={card.qr} alt={`QR — ${card.title}`} fill className="object-contain" />
                </div>
              </div>
              <div className="min-w-0 flex flex-col flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <svg className="w-[15px] h-[15px] text-[#F1B91E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="square" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                    className="text-[#F1B91E] text-[0.62rem] tracking-[0.18em] uppercase"
                  >
                    {card.tag}
                  </span>
                </div>
                <h4
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className="text-white text-[clamp(1.7rem,2.2vw,2.1rem)] uppercase leading-tight mb-2"
                >
                  {card.title}
                </h4>
                <p
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-white/65 text-[1.2rem] leading-snug"
                >
                  {card.body}
                </p>
                <div className="hidden sm:flex items-center gap-2 mt-auto pt-4">
                  <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="square" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                    className="text-white/40 text-[0.6rem] tracking-[0.18em] uppercase"
                  >
                    ESCANEA con tu cámara
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
