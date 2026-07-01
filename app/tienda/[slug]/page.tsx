import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, productBySlug } from '@/data/products'
import ProductFicha from '@/components/tienda/ProductFicha'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = productBySlug(slug)
  if (!product) return { title: 'Producto no encontrado — Sport Training' }

  const description = `${product.tagline}. ${product.intro[0]}`.slice(0, 300)
  return {
    title: `${product.fullName} — Tienda Sport Training`,
    description,
    alternates: { canonical: `/tienda/${product.slug}` },
    openGraph: {
      title: `${product.fullName} — Sport Training`,
      description,
      url: `https://sporttraining.es/tienda/${product.slug}`,
      type: 'website',
      images: [{ url: product.image }],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = productBySlug(slug)
  if (!product) notFound()
  return <ProductFicha product={product} />
}
