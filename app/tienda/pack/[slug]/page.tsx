import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { packs, packBySlug } from '@/data/packs'
import PackDetail from '@/components/tienda/PackDetail'

export function generateStaticParams() {
  return packs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pack = packBySlug(slug)
  if (!pack) return { title: 'Pack no encontrado — Sport Training' }

  const description = `${pack.tagline}. ${pack.description}`.slice(0, 300)
  return {
    title: `${pack.name} — Tienda Sport Training`,
    description,
    alternates: { canonical: `/tienda/pack/${pack.slug}` },
    openGraph: {
      title: `${pack.name} — Sport Training`,
      description,
      url: `https://sporttraining.es/tienda/pack/${pack.slug}`,
      type: 'website',
    },
  }
}

export default async function PackPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pack = packBySlug(slug)
  if (!pack) notFound()
  return <PackDetail pack={pack} />
}
