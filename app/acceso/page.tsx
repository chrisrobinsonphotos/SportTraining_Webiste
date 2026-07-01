import type { Metadata } from 'next'
import AccesoGate from '@/components/tienda/AccesoGate'

export const metadata: Metadata = {
  title: 'Acceso — Tienda Sport Training',
  robots: { index: false, follow: false },
}

export default async function AccesoPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  return <AccesoGate next={next ?? '/tienda'} />
}
