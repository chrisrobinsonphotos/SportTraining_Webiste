'use client'

/**
 * Sport Training — Tienda · Cart state
 *
 * Client-side cart backed by localStorage. No account/login. Prices may be null
 * during the pre-launch phase (see data/products.ts) — the cart handles that
 * gracefully: items can be added, but checkout stays disabled until every line
 * has a price. Checkout hand-off to Stripe is wired in /api/checkout (task #5).
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'st-tienda-cart-v1'

export type CartKind = 'product' | 'pack'

export interface CartItem {
  key: string
  kind: CartKind
  id: string
  slug: string
  name: string
  image: string
  priceEUR: number | null
  qty: number
}

export type CartLineInput = Omit<CartItem, 'key' | 'qty'>

interface CartContextValue {
  items: CartItem[]
  count: number
  /** Sum of line prices, or null if any line is unpriced (pre-launch). */
  subtotal: number | null
  allPriced: boolean
  add: (line: CartLineInput, qty?: number) => void
  remove: (key: string) => void
  setQty: (key: string, qty: number) => void
  clear: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const keyFor = (kind: CartKind, id: string) => `${kind}:${id}`

export function formatEUR(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw) as CartItem[])
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [items, hydrated])

  const add: CartContextValue['add'] = (line, qty = 1) => {
    setItems((prev) => {
      const key = keyFor(line.kind, line.id)
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...line, key, qty }]
    })
    setIsOpen(true)
  }

  const remove: CartContextValue['remove'] = (key) =>
    setItems((prev) => prev.filter((i) => i.key !== key))

  const setQty: CartContextValue['setQty'] = (key, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
    )

  const clear = () => setItems([])

  const { count, subtotal, allPriced } = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const allPriced = items.length > 0 && items.every((i) => typeof i.priceEUR === 'number')
    const subtotal = allPriced
      ? items.reduce((s, i) => s + (i.priceEUR as number) * i.qty, 0)
      : null
    return { count, subtotal, allPriced }
  }, [items])

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    allPriced,
    add,
    remove,
    setQty,
    clear,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
