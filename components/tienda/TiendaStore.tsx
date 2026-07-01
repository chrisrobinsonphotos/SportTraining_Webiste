'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { products, productCategories, type ProductCategory } from '@/data/products'
import { packs } from '@/data/packs'
import ProductCard from './ProductCard'
import PackCard from './PackCard'

const brandEase = [0.16, 1, 0.3, 1] as const

type Filter = 'Todos' | ProductCategory

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
      <span className="text-[12px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>
        {text}
      </span>
    </div>
  )
}

export default function TiendaStore() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const filtered = filter === 'Todos' ? products : products.filter((p) => p.category === filter)
  const filters: Filter[] = ['Todos', ...productCategories]

  return (
    <main className="bg-[#191919] min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-[calc(90px+clamp(3rem,7vw,6rem))] pb-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,5vw,4rem)] border-b border-white/[0.06] overflow-hidden">
        <div className="geo-grid absolute inset-0 opacity-60" />
        <div className="max-w-[1200px] mx-auto relative">
          <Eyebrow text="Tienda · Suplementación" />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: brandEase }}
            className="uppercase text-white"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'clamp(2.8rem,7vw,6rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
          >
            Suplementos que<br /><span className="text-[#F1B91E]">sí</span> tienen sentido.
          </motion.h1>
          <p className="mt-6 max-w-[58ch] text-[clamp(1rem,1.1vw,1.15rem)] leading-relaxed text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>
            Sin humo ni promesas mágicas. Cada producto lleva su ficha completa: qué es, para qué sirve, a quién le conviene y cómo tomarlo. Compra con criterio, no por moda.
          </p>
          <Link
            href="/nutricion/suplementacion"
            className="inline-flex items-center gap-2 mt-6 text-[13px] tracking-[0.14em] uppercase text-white/60 hover:text-[#F1B91E] transition-colors"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
          >
            ¿Qué funciona de verdad? Lee nuestra guía de suplementación basada en evidencia →
          </Link>
        </div>
      </section>

      {/* ── Filter + product grid ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 text-[12px] tracking-[0.14em] uppercase transition-colors duration-200 border ${
                  filter === f
                    ? 'bg-[#F1B91E] text-[#191919] border-[#F1B91E]'
                    : 'bg-transparent text-white/60 border-white/15 hover:border-[#F1B91E]/40 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Packs band ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06] bg-[#161616]">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow text="Packs de Objetivos" />
          <h2 className="uppercase text-white max-w-[16ch]" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 0.92 }}>
            Un protocolo <span className="text-[#F1B91E]">completo</span>, no productos sueltos.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[clamp(1rem,1.1vw,1.1rem)] leading-relaxed text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>
            Combinaciones pensadas para trabajar en sinergia, con un descuento exclusivo frente a comprar cada producto por separado.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] mt-10">
            {packs.map((pk, i) => (
              <PackCard key={pk.id} pack={pk} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisory strip ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {[
            { n: '01', t: 'Venta asesorada', d: 'Fichas educativas en cada producto. Sabes qué compras y por qué lo necesitas.' },
            { n: '02', t: 'Respaldo científico', d: 'Priorizamos lo que la evidencia respalda. Sin mezclas propietarias ni dosis ocultas.' },
            { n: '03', t: '100% online', d: 'Pedido y pago desde tu móvil. Recíbelo en casa o recógelo en el gimnasio.' },
          ].map((c) => (
            <div key={c.n} className="bg-[#1E1E1E] p-8">
              <div className="text-[#F1B91E] text-[44px] leading-none" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900 }}>{c.n}</div>
              <h3 className="mt-4 text-[22px] uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>{c.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55" style={{ fontFamily: 'var(--font-inter)' }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
