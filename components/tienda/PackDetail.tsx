'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Pack } from '@/data/packs'
import { productById } from '@/data/products'
import AddToCart from './AddToCart'
import { formatEUR } from './cart-context'

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
      <span className="text-[12px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>{text}</span>
    </div>
  )
}

export default function PackDetail({ pack }: { pack: Pack }) {
  const members = pack.productIds.map(productById).filter(Boolean)

  return (
    <main className="bg-[#191919]">
      <div className="pt-[calc(90px+1.5rem)] px-[clamp(1.5rem,5vw,4rem)]">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-white/40" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
          <Link href="/tienda" className="hover:text-[#F1B91E] transition-colors">Tienda</Link>
          <span>/</span>
          <span className="text-white/70">{pack.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] pt-8 pb-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Eyebrow text={`Pack de Objetivos · ${pack.category}`} />
            {typeof pack.discountPct === 'number' && (
              <span className="bg-[#F1B91E] text-[#191919] px-3 py-1.5 text-[12px] tracking-[0.08em] uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
                −{pack.discountPct}% frente a comprarlos por separado
              </span>
            )}
          </div>
          <h1 className="uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 0.92 }}>{pack.name}</h1>
          <p className="mt-3 text-[18px] italic text-[#F1B91E]/90" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>{pack.tagline}</p>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-white/65" style={{ fontFamily: 'var(--font-inter)' }}>{pack.description}</p>
        </div>
      </section>

      {/* Members */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2rem,5vw,4rem)] border-t border-white/[0.06] bg-[#161616]">
        <div className="max-w-[1000px] mx-auto">
          <Eyebrow text="Qué incluye" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {members.map((m) => (
              <Link key={m!.id} href={`/tienda/${m!.slug}`} className="group bg-[#1E1E1E] hover:border-[#F1B91E]/30 transition-colors flex flex-col">
                <div className="relative aspect-square bg-white">
                  <Image src={m!.image} alt={m!.imageAlt} fill sizes="(max-width:768px) 50vw, 33vw" className="object-contain p-3 group-hover:scale-[1.05] transition-transform duration-700" />
                </div>
                <div className="p-5 border-t border-white/[0.06]">
                  <h3 className="text-[18px] uppercase text-white group-hover:text-[#F1B91E] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>{m!.name}</h3>
                  <p className="mt-1 text-[13px] text-white/50 leading-snug" style={{ fontFamily: 'var(--font-inter)' }}>{m!.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Buy box */}
      <section className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06]">
        <div className="max-w-[560px] mx-auto text-center">
          <div className="text-[36px] text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
            {typeof pack.priceEUR === 'number' ? formatEUR(pack.priceEUR) : (
              <span className="text-[15px] tracking-[0.1em] uppercase text-white/40" style={{ fontWeight: 600 }}>Precio disponible próximamente</span>
            )}
          </div>
          {typeof pack.priceEUR === 'number' && (
            <p className="text-[12px] text-white/40 mt-1 mb-6" style={{ fontFamily: 'var(--font-inter)' }}>IVA incluido</p>
          )}
          <div className="mt-6">
            <AddToCart
              variant="full"
              line={{ kind: 'pack', id: pack.id, slug: pack.slug, name: pack.name, image: members[0]?.image ?? '/tienda/whey-protein.jpg', priceEUR: pack.priceEUR }}
            />
          </div>
          <p className="text-[12px] text-white/40 mt-3" style={{ fontFamily: 'var(--font-inter)' }}>Envío a domicilio o recogida en el gimnasio</p>
        </div>
      </section>
    </main>
  )
}
