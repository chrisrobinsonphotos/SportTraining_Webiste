'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useCart, formatEUR } from './cart-context'

const brandEase = [0.16, 1, 0.3, 1] as const

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, subtotal, allPriced, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canCheckout = items.length > 0 && allPriced

  async function handleCheckout() {
    if (!canCheckout) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ kind: i.kind, id: i.id, qty: i.qty })),
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.url) {
        window.location.href = data.url as string
        return
      }
      setError(
        data?.error === 'STORE_NOT_CONFIGURED' || data?.error === 'PRICING_PENDING'
          ? 'La tienda todavía no está activa. Vuelve a intentarlo pronto.'
          : 'No se ha podido iniciar el pago. Inténtalo de nuevo en unos segundos.',
      )
      setLoading(false)
    } catch {
      setError('No se ha podido conectar con el pago. Revisa tu conexión e inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: brandEase }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-[440px] bg-[#141414] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#F1B91E]" />
                <span className="text-[13px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>
                  Tu cesta
                </span>
              </div>
              <button onClick={closeCart} aria-label="Cerrar" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="square" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 px-8 text-center">
                  <span className="text-[15px] text-white/50" style={{ fontFamily: 'var(--font-inter)' }}>
                    Tu cesta está vacía.
                  </span>
                </div>
              ) : (
                <ul>
                  {items.map((i) => (
                    <li key={i.key} className="flex gap-4 px-6 py-5 border-b border-white/8">
                      <div className="relative w-[64px] h-[64px] bg-white flex-shrink-0">
                        <Image src={i.image} alt={i.name} fill className="object-contain p-1.5" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[15px] text-white leading-tight uppercase" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>
                            {i.name}
                          </span>
                          <button onClick={() => remove(i.key)} aria-label="Quitar" className="text-white/40 hover:text-[#F1B91E] transition-colors flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="square" d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </div>
                        {i.kind === 'pack' && (
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
                            Pack
                          </span>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/15">
                            <button onClick={() => setQty(i.key, i.qty - 1)} aria-label="Menos" className="w-8 h-8 text-white/70 hover:text-[#F1B91E] transition-colors">−</button>
                            <span className="w-8 text-center text-[14px] text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>{i.qty}</span>
                            <button onClick={() => setQty(i.key, i.qty + 1)} aria-label="Más" className="w-8 h-8 text-white/70 hover:text-[#F1B91E] transition-colors">+</button>
                          </div>
                          <span className="text-[14px] text-white/80" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
                            {typeof i.priceEUR === 'number' ? formatEUR(i.priceEUR * i.qty) : 'Próximamente'}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] tracking-[0.2em] uppercase text-white/50" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
                    Subtotal
                  </span>
                  <span className="text-[22px] text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}>
                    {subtotal !== null ? formatEUR(subtotal) : '—'}
                  </span>
                </div>

                {!allPriced && (
                  <p className="text-[12px] text-white/45 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    La tienda está en preparación. Muy pronto podrás finalizar tu compra online.
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout || loading}
                  className={`w-full px-6 py-4 text-[13px] tracking-[0.18em] uppercase transition-colors duration-200 ${
                    canCheckout && !loading
                      ? 'bg-[#F1B91E] text-[#191919] hover:bg-[#C99200] cursor-pointer'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                >
                  {loading ? 'Redirigiendo…' : 'Finalizar compra'}
                </button>

                {error && (
                  <p className="mt-3 text-[13px] leading-snug text-[#F1B91E] text-center" role="alert" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
                    {error}
                  </p>
                )}

                <p className="text-[11px] text-white/35 text-center mt-3" style={{ fontFamily: 'var(--font-inter)' }}>
                  Pago seguro con Stripe · Envío o recogida en el gimnasio
                </p>

                <button onClick={clear} className="w-full mt-3 text-[11px] tracking-[0.14em] uppercase text-white/40 hover:text-white/70 transition-colors" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
                  Vaciar cesta
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
