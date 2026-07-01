'use client'

import { useEffect } from 'react'
import { useCart } from './cart-context'

/** Empties the cart once the order-confirmation page loads. */
export default function ClearCartOnMount() {
  const { clear } = useCart()
  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
