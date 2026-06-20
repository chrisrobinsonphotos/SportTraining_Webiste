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
      className="relative overflow-hidden bg-[#191919] flex flex-col justify-center"
      style={{ height: '80vh', minHeight: '520px' }}
    >
      {/* Parallax image — scaled 1.1 */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: 1.1 }}>
        <Image
          src="/hyrox-effort.jpg"
          alt="Sport Training — el esfuerzo que nadie ve"
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
      </motion.div>

      {/* Three overlays matching prototype exactly */}
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
            className="text-[length:var(--fs-display)] leading-[0.88] uppercase text-white"
          >
            ASÍ SE
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic', textTransform: 'none', letterSpacing: '-0.02em' }}
            className="text-[length:var(--fs-display)] leading-[0.88] text-[#F1B91E]"
          >
            CONSTRUYE.
          </motion.h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
          className="text-[length:var(--fs-label)] tracking-[0.18em] uppercase text-white/45 max-w-[24rem] mt-6"
        >
          Un cuerpo lo suficientemente fuerte para la vida.
        </motion.p>
      </div>
    </section>
  )
}
