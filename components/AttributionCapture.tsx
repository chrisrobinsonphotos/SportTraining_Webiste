'use client'

import { useEffect } from 'react'
import { captureFirstTouch } from '@/lib/attribution'

/**
 * Records first-touch attribution once per session, then renders nothing.
 *
 * Mounted in the root layout so it runs on whichever page the visitor happens
 * to land on — that page IS the first touch, and it is frequently /prueba or a
 * nutrition page rather than the home page.
 *
 * It only runs after hydration, which is fine: both forms need JavaScript to
 * submit at all, so there is no path where a submission beats this effect. If
 * one ever appeared, `getAttribution()` falls back to reading the live URL.
 */
export default function AttributionCapture() {
  useEffect(() => {
    captureFirstTouch()
  }, [])

  return null
}
