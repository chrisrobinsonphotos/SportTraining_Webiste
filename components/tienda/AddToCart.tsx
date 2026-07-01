'use client'

import { useState } from 'react'
import { useCart, type CartLineInput } from './cart-context'

interface AddToCartProps {
  line: CartLineInput
  /** 'full' = wide primary button; 'compact' = card button. */
  variant?: 'full' | 'compact'
  className?: string
}

/**
 * Adds a product or pack to the cart. Always enabled so the flow is usable
 * pre-launch; checkout is what gates on price (see CartDrawer).
 */
export default function AddToCart({ line, variant = 'full', className = '' }: AddToCartProps) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const handle = () => {
    add(line, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  const base =
    'inline-flex items-center justify-center gap-2 uppercase transition-colors duration-200 cursor-pointer disabled:cursor-default'
  const size =
    variant === 'full'
      ? 'px-7 py-4 text-[13px] tracking-[0.18em] w-full'
      : 'px-4 py-3 text-[11px] tracking-[0.16em] w-full'

  return (
    <button
      type="button"
      onClick={handle}
      aria-live="polite"
      className={`${base} ${size} ${
        added ? 'bg-[#C99200] text-[#191919]' : 'bg-[#F1B91E] text-[#191919] hover:bg-[#C99200]'
      } ${className}`}
      style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
    >
      {added ? (
        <>
          Añadido
          <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="square" d="M5 13l4 4L19 7" />
          </svg>
        </>
      ) : (
        <>
          Añadir a la cesta
          <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  )
}
