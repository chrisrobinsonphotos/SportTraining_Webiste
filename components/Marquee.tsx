'use client'

import { motion } from 'framer-motion'

const items = [
  'HYROX',
  '·',
  'FUNCIONAL',
  '·',
  'CROSSTRAINING',
  '·',
  'ADAPTADO',
  '·',
  'COMUNIDAD',
  '·',
  'PERSONAL TRAINING',
  '·',
  'CUERPOS FUERTES',
  '·',
  'MURCIA',
  '·',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <section className="relative bg-[#F1B91E] overflow-hidden py-4 border-y border-[#C99200]">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F1B91E] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F1B91E] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex items-center gap-0 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-block ${
              item === '·'
                ? 'px-4 text-[#191919]/50 text-lg'
                : 'px-3 text-[#191919] text-[13px] tracking-[0.22em]'
            }`}
            style={{
              fontFamily: item === '·' ? 'inherit' : 'var(--font-barlow)',
              fontWeight: item === '·' ? 400 : 800,
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
