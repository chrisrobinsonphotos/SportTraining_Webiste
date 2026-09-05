import type { Metadata } from 'next'
import AccesoGate from '@/components/AccesoGate'
import { gateForPath, GATES } from '@/lib/gates'

export const metadata: Metadata = {
  title: 'Acceso — Sport Training',
  robots: { index: false, follow: false },
}

/**
 * One password screen, two gated areas. Which one is being opened is read from
 * the destination the middleware redirected with — an unrecognised destination
 * falls back to the store gate, which is the older of the two and the one every
 * pre-existing link means.
 */
export default async function AccesoPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const target = typeof next === 'string' ? next.split('?')[0] : ''
  const gate = gateForPath(target) ?? GATES.find((g) => g.id === 'tienda')!

  return (
    <AccesoGate
      next={next ?? gate.home}
      copy={{
        eyebrow: gate.eyebrow,
        heading: gate.heading,
        accent: gate.accent,
        blurb: gate.blurb,
        home: gate.home,
      }}
    />
  )
}
