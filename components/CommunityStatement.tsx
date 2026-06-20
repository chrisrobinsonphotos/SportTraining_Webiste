'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function CommunityStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#191919] flex flex-col justify-center"
      style={{ height: '50vh', minHeight: '380px', maxHeight: '520px' }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0" style={{ transform: 'scale(1.1)' }}>
        <Image
          src="/_MG_5426.jpg"
          alt="El esfuerzo real — Sport Training Murcia"
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
      </div>

      {/* Three overlays — matching StatementSection pattern */}
      <div className="absolute inset-0" style={{ background: 'rgba(25,25,25,.72)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(25,25,25,.6), transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(25,25,25,.8), transparent, rgba(25,25,25,.3))' }} />

      {/* Content */}
      <div className="relative z-10" style={{ padding: '0 clamp(1.5rem,5vw,4rem)' }}>
        {/* Accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-[3px] bg-[#F1B91E] mb-8 origin-left"
        />

        {/* Headline */}
        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[length:var(--fs-h1)] leading-[0.88] uppercase text-white"
          >
            MÁS QUE
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic', textTransform: 'none', letterSpacing: '-0.02em' }}
            className="text-[length:var(--fs-h1)] leading-[0.88] text-[#F1B91E]"
          >
            entrenar.
          </motion.h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
          className="text-[length:var(--fs-label)] tracking-[0.18em] uppercase text-white/45 max-w-[28rem] mt-6"
        >
          Eventos, comunidad y el espíritu que hace de Sport Training algo único.
        </motion.p>
      </div>
    </section>
  )
}
