'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/data/products'
import { packs } from '@/data/packs'
import AddToCart from './AddToCart'
import { formatEUR } from './cart-context'

const brandEase = [0.16, 1, 0.3, 1] as const

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
      <span className="text-[12px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>{text}</span>
    </div>
  )
}

function GoldCheck() {
  return (
    <svg className="w-[15px] h-[15px] text-[#F1B91E] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="square" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function ProductFicha({ product }: { product: Product }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const relatedPack = packs.find((pk) => pk.productIds.includes(product.id))

  return (
    <main className="bg-[#191919]">
      {/* Breadcrumb */}
      <div className="pt-[calc(90px+1.5rem)] px-[clamp(1.5rem,5vw,4rem)]">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-white/40" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
          <Link href="/tienda" className="hover:text-[#F1B91E] transition-colors">Tienda</Link>
          <span>/</span>
          <span className="text-white/70">{product.name}</span>
        </div>
      </div>

      {/* ── Top: image + buy box ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] pt-8 pb-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-px bg-white/[0.06]">
          <div className="relative aspect-square bg-white">
            <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain p-6" priority />
            {product.badge && (
              <span className="absolute top-0 left-0 bg-[#F1B91E] text-[#191919] px-4 py-2 text-[11px] tracking-[0.12em] uppercase max-w-[80%] leading-tight" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>
                {product.badge}
              </span>
            )}
          </div>

          <div className="bg-[#1E1E1E] p-[clamp(1.5rem,4vw,3rem)] flex flex-col">
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>{product.category}</span>
            <h1 className="mt-3 uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 0.92 }}>
              {product.fullName}
            </h1>
            <p className="mt-3 text-[16px] italic text-[#F1B91E]/90" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>{product.tagline}</p>

            <div className="h-px bg-white/10 my-6" />

            <p className="text-[15px] leading-relaxed text-white/65" style={{ fontFamily: 'var(--font-inter)' }}>{product.intro[0]}</p>

            {product.variantNote && (
              <p className="mt-4 text-[13px] text-white/50" style={{ fontFamily: 'var(--font-inter)' }}>{product.variantNote}</p>
            )}

            <div className="mt-auto pt-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[32px] text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
                  {typeof product.priceEUR === 'number' ? formatEUR(product.priceEUR) : (
                    <span className="text-[15px] tracking-[0.1em] uppercase text-white/40" style={{ fontWeight: 600 }}>Precio disponible próximamente</span>
                  )}
                </span>
                {typeof product.priceEUR === 'number' && (
                  <span className="text-[12px] text-white/40" style={{ fontFamily: 'var(--font-inter)' }}>IVA incluido</span>
                )}
              </div>
              <AddToCart
                variant="full"
                line={{ kind: 'product', id: product.id, slug: product.slug, name: product.name, image: product.image, priceEUR: product.priceEUR }}
              />
              <p className="text-[12px] text-white/40 text-center mt-3" style={{ fontFamily: 'var(--font-inter)' }}>
                Envío a domicilio o recogida en el gimnasio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06] bg-[#161616]">
        <div className="max-w-[1000px] mx-auto">
          <Eyebrow text="¿Qué beneficios aporta?" />
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {product.benefits.map((b, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-white/75" style={{ fontFamily: 'var(--font-inter)' }}>
                <GoldCheck /> <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── For whom ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto">
          <Eyebrow text="¿Para quién está recomendado?" />
          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
            {product.forWho.map((f, i) => (
              <div key={i} className="bg-[#1E1E1E] p-6">
                <h3 className="text-[18px] uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55" style={{ fontFamily: 'var(--font-inter)' }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06] bg-[#161616]">
        <div className="max-w-[820px] mx-auto space-y-10">
          {product.education.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: brandEase }}>
              <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, lineHeight: 1 }}>{e.heading}</h3>
              <div className="mt-4 space-y-3">
                {e.body.map((p, j) => (
                  <p key={j} className="text-[15px] leading-relaxed text-white/65" style={{ fontFamily: 'var(--font-inter)' }}>{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How to take + recommended if ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <Eyebrow text="¿Cómo tomarlo?" />
            <div className="space-y-3">
              {product.howTo.map((h, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-white/65" style={{ fontFamily: 'var(--font-inter)' }}>{h}</p>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow text="Lo recomendamos si…" />
            <ul className="space-y-3">
              {product.recommendedIf.map((r, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-white/75" style={{ fontFamily: 'var(--font-inter)' }}>
                  <GoldCheck /> <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06] bg-[#161616]">
        <div className="max-w-[820px] mx-auto">
          <Eyebrow text="Preguntas frecuentes" />
          <div className="border-t border-white/10">
            {product.faq.map((f, i) => (
              <div key={i} className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                  <span className="text-[17px] uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>{f.q}</span>
                  <span className={`text-[#F1B91E] text-[22px] leading-none transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`} style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400 }}>+</span>
                </button>
                {openFaq === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pb-5 text-[15px] leading-relaxed text-white/60 overflow-hidden" style={{ fontFamily: 'var(--font-inter)' }}>
                    {f.a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related pack ── */}
      {relatedPack && (
        <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06]">
          <div className="max-w-[1000px] mx-auto bg-[#161616] border border-white/[0.06] border-l-[3px] border-l-[#F1B91E] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>Combínalo</span>
              <h3 className="mt-2 text-[26px] uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>{relatedPack.name}</h3>
              <p className="mt-1 text-[14px] text-white/55" style={{ fontFamily: 'var(--font-inter)' }}>{relatedPack.tagline}</p>
            </div>
            <Link href={`/tienda/pack/${relatedPack.slug}`} className="inline-flex items-center gap-2 bg-[#F1B91E] text-[#191919] px-6 py-4 text-[13px] tracking-[0.16em] uppercase hover:bg-[#C99200] transition-colors flex-shrink-0" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>
              Ver el pack →
            </Link>
          </div>
        </section>
      )}

      {/* ── Disclaimer ── */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] pb-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-[820px] mx-auto border-t border-white/10 pt-6">
          {product.disclaimer.map((d, i) => (
            <p key={i} className="text-[12px] leading-relaxed text-white/35" style={{ fontFamily: 'var(--font-inter)' }}>{d}</p>
          ))}
        </div>
      </section>
    </main>
  )
}
