'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function StatementSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#191919]"
      style={{ height: '80vh', minHeight: '520px' }}
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: imageY }}
      >
        <Image
          src="/hyrox-effort.jpg"
          alt="Sport Training — el esfuerzo que nadie ve"
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#191919]/72" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#191919]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/80 via-transparent to-[#191919]/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-16">

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-12 h-[3px] bg-[#F1B91E] mb-8"
        />

        {/* Headline */}
        <div className="overflow-hidden mb-1">
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.88] uppercase text-white"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
          >
            ASÍ SE
          </motion.span>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.88] uppercase text-[#F1B91E]"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic' }}
          >
            CONSTRUYE.
          </motion.span>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-white/45 text-[13px] md:text-[15px] tracking-[0.18em] uppercase max-w-xs"
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
        >
          Un cuerpo lo suficientemente fuerte para la vida.
        </motion.p>
      </div>
    </section>
  )
}
