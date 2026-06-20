'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Discipline = {
  num: string
  name: string
  tagline: string
  description: string
  image: string
  accent: boolean
  href?: string
}

const disciplines: Discipline[] = [
  {
    num: '01',
    name: 'HYROX',
    tagline: 'Fuerza + Resistencia',
    description:
      '8km de carrera intercalados con 8 estaciones de trabajo funcional. Desde el primer entreno hasta la competición — aquí se construye el rendimiento.',
    image: '/hyrox-sled.jpg',
    accent: true,
    href: '/entrenamientos/hyrox',
  },
  {
    num: '02',
    name: 'FUNCIONAL',
    tagline: 'Base del Movimiento',
    description:
      'Patrones naturales: empujar, traccionar, agacharse, rotar. El fundamento de cualquier cuerpo capaz.',
    image: '/funcional.jpg',
    accent: false,
    href: '/entrenamientos/funcional',
  },
]

function DisciplineCard({
  item,
  index,
}: {
  item: Discipline
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  const cardVisual = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-contact={item.href ? undefined : true}
      className="relative overflow-hidden flex flex-col justify-end cursor-pointer text-left h-full"
      style={{ minHeight: '62vh' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={`${item.name} en Sport Training Murcia`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center"
          style={{
            transition: 'transform .7s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
          quality={80}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, #191919 0%, rgba(25,25,25,.6) 45%, rgba(25,25,25,.2) 100%)',
        }}
      />

      {/* Gold top bar on accent card */}
      {item.accent && (
        <div className="absolute top-0 left-0 right-0 z-10 h-[3px] bg-[#F1B91E]" />
      )}

      {/* Content */}
      <div className="relative z-10 p-[2rem]">
        {/* Number */}
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '.95rem',
            letterSpacing: '.3em',
            marginBottom: '1rem',
            display: 'block',
          }}
          className="text-[#F1B91E]"
        >
          {item.num}
        </span>

        {/* Name */}
        <h3
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 'var(--fs-h2)',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
          className={item.accent ? 'text-[#F1B91E]' : 'text-white'}
        >
          {item.name}
        </h3>

        {/* Tag */}
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: '.95rem',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '.5rem',
          }}
          className="text-white/65"
        >
          {item.tagline}
        </span>

        {/* Gold barline */}
        <div
          className="bg-[#F1B91E]"
          style={{
            height: '1px',
            width: hovered ? '100%' : '48px',
            margin: '1rem 0',
            transition: 'width .5s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* Description — hidden, revealed on hover */}
        <div
          style={{
            maxHeight: hovered ? '160px' : 0,
            overflow: 'hidden',
            transition: 'max-height .5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              fontSize: 'var(--fs-body)',
              lineHeight: 1.6,
              maxWidth: '300px',
            }}
            className="text-white/75"
          >
            {item.description}
          </p>
        </div>

        {/* More CTA */}
        <div
          style={{
            maxHeight: hovered ? '40px' : 0,
            overflow: 'hidden',
            transition: 'max-height .5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div
            className="flex items-center"
            style={{ marginTop: '1rem', gap: '.5rem' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: '.78rem',
                letterSpacing: '.2em',
              }}
              className="text-[#F1B91E]"
            >
              DESCUBRIR
            </span>
            <svg
              className="w-3.5 h-3.5 text-[#F1B91E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (item.href) {
    return (
      <Link href={item.href} aria-label={item.name} className="block">
        {cardVisual}
      </Link>
    )
  }

  return cardVisual
}

export default function Training() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      id="entrenamientos"
      className="relative bg-[#191919] overflow-hidden"
      style={{ scrollMarginTop: '90px' }}
    >
      {/* Header (.sec-head) */}
      <div
        ref={titleRef}
        className="flex flex-wrap items-end justify-between shrink-0"
        style={{
          padding: '5rem clamp(1.5rem,5vw,4rem) 2.5rem',
          gap: '1.5rem',
        }}
      >
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="w-2 h-2 bg-[#F1B91E]" />
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 700,
                fontSize: 'var(--fs-label)',
                letterSpacing: '.22em',
                textTransform: 'uppercase',
              }}
              className="text-[#F1B91E]"
            >
              Disciplinas de Entrenamiento
            </span>
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'var(--fs-h1)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                letterSpacing: '-.02em',
              }}
              className="text-white"
            >
              NUESTROS{' '}
              <span
                style={{
                  color: '#F1B91E',
                  fontStyle: 'italic',
                  textTransform: 'none',
                }}
              >
                entrenamientos
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Sec-note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 400,
            fontSize: 'var(--fs-lead)',
            lineHeight: 1.7,
            maxWidth: '440px',
          }}
          className="text-white/65"
        >
          Dos disciplinas. Una metodología. Un objetivo: construir un cuerpo que
          te permita vivir la vida que quieres.
        </motion.p>
      </div>

      {/* Tile grid — content-fit, no forced full-height void */}
      <div
        style={{
          display: 'grid',
          gap: '2px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
      >
        {disciplines.map((item, i) => (
          <DisciplineCard key={item.num} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
