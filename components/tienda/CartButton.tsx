'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from './cart-context'

/**
 * Fixed cart trigger (bottom-right). Only surfaces once the cart has items,
 * so it never clutters an empty browsing session.
 */
export default function CartButton() {
  const { count, openCart } = useCart()

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          type="button"
          onClick={openCart}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-label={`Abrir cesta (${count})`}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-[#F1B91E] text-[#191919] pl-5 pr-6 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:bg-[#C99200] transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="square" d="M3 3h2l2 13h11l2-9H6" />
            <path strokeLinecap="square" d="M9 20h.01M17 20h.01" />
          </svg>
          <span className="text-[13px] tracking-[0.14em] uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
            Cesta
          </span>
          <span
            className="min-w-[22px] h-[22px] px-1 flex items-center justify-center bg-[#191919] text-[#F1B91E] text-[12px]"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
          >
            {count}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
