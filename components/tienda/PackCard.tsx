'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Pack } from '@/data/packs'
import { productById } from '@/data/products'
import AddToCart from './AddToCart'
import { formatEUR } from './cart-context'

const brandEase = [0.16, 1, 0.3, 1] as const

export default function PackCard({ pack, index = 0 }: { pack: Pack; index?: number }) {
  const members = pack.productIds.map(productById).filter(Boolean)
  const href = `/tienda/pack/${pack.slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: brandEase, delay: index * 0.08 }}
      className="group flex flex-col bg-[#161616] border border-white/[0.06] border-t-[3px] border-t-[#F1B91E] hover:border-[#F1B91E]/30 hover:border-t-[#F1B91E] transition-colors duration-300"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
            Pack · {pack.category}
          </span>
          {typeof pack.discountPct === 'number' && (
            <span className="bg-[#F1B91E] text-[#191919] px-2 py-1 text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
              −{pack.discountPct}%
            </span>
          )}
        </div>

        <Link href={href}>
          <h3 className="text-[26px] leading-none uppercase text-white group-hover:text-[#F1B91E] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
            {pack.name}
          </h3>
        </Link>
        <p className="mt-2 text-[14px] italic text-[#F1B91E]/90" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>
          {pack.tagline}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-white/55 flex-1" style={{ fontFamily: 'var(--font-inter)' }}>
          {pack.description}
        </p>

        {/* Included products */}
        <div className="flex items-center gap-2 mt-5">
          {members.map((m) => (
            <div key={m!.id} className="relative w-[52px] h-[52px] bg-white" title={m!.name}>
              <Image src={m!.image} alt={m!.imageAlt} fill className="object-contain p-1" sizes="52px" />
            </div>
          ))}
          <span className="text-[12px] text-white/40 ml-1" style={{ fontFamily: 'var(--font-inter)' }}>
            {members.length} productos
          </span>
        </div>

        <div className="flex items-center justify-between mt-5 mb-3">
          <span className="text-[18px] text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
            {typeof pack.priceEUR === 'number' ? formatEUR(pack.priceEUR) : (
              <span className="text-[13px] tracking-[0.1em] uppercase text-white/40" style={{ fontWeight: 600 }}>Próximamente</span>
            )}
          </span>
          <Link href={href} className="text-[12px] tracking-[0.14em] uppercase text-white/60 hover:text-[#F1B91E] transition-colors" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
            Ver pack →
          </Link>
        </div>

        <AddToCart
          variant="compact"
          line={{
            kind: 'pack',
            id: pack.id,
            slug: pack.slug,
            name: pack.name,
            image: members[0]?.image ?? '/tienda/whey-protein.jpg',
            priceEUR: pack.priceEUR,
          }}
        />
      </div>
    </motion.article>
  )
}
