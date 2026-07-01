'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/data/products'
import AddToCart from './AddToCart'
import { formatEUR } from './cart-context'

const brandEase = [0.16, 1, 0.3, 1] as const

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const href = `/tienda/${product.slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: brandEase, delay: (index % 3) * 0.08 }}
      className="group flex flex-col bg-[#1E1E1E] border border-white/[0.06] hover:border-[#F1B91E]/30 transition-colors duration-300"
    >
      <Link href={href} className="block relative aspect-square bg-white overflow-hidden">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span className="absolute top-0 left-0 bg-[#F1B91E] text-[#191919] px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase max-w-[75%] leading-tight" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5 border-t border-white/[0.06]">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#F1B91E] mb-2" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
          {product.category}
        </span>
        <Link href={href}>
          <h3 className="text-[20px] leading-none uppercase text-white group-hover:text-[#F1B91E] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-[13px] leading-snug text-white/55 flex-1" style={{ fontFamily: 'var(--font-inter)' }}>
          {product.tagline}
        </p>

        <div className="flex items-center justify-between mt-4 mb-3">
          <span className="text-[18px] text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
            {typeof product.priceEUR === 'number' ? formatEUR(product.priceEUR) : (
              <span className="text-[13px] tracking-[0.1em] uppercase text-white/40" style={{ fontWeight: 600 }}>Próximamente</span>
            )}
          </span>
        </div>

        <AddToCart
          variant="compact"
          line={{
            kind: 'product',
            id: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            priceEUR: product.priceEUR,
          }}
        />
      </div>
    </motion.article>
  )
}
