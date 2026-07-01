import type { Metadata } from 'next'
import TiendaStore from '@/components/tienda/TiendaStore'

export const metadata: Metadata = {
  title: 'Tienda de Suplementos — Sport Training Murcia',
  description:
    'Suplementación deportiva con criterio. Proteína, creatina, magnesio, omega-3 y vitaminas con ficha completa y respaldo científico. Compra online con envío o recogida en el gimnasio.',
  keywords: [
    'comprar suplementos Murcia',
    'tienda suplementos deportivos',
    'proteína whey Murcia',
    'creatina gominolas',
    'suplementación Sport Training',
    'omega 3 magnesio vitamina D3 K2',
  ],
  alternates: { canonical: '/tienda' },
  openGraph: {
    title: 'Tienda de Suplementos — Sport Training Murcia',
    description: 'Suplementación deportiva con criterio y respaldo científico. Envío o recogida en el gimnasio.',
    url: 'https://sporttraining.es/tienda',
    type: 'website',
  },
}

export default function TiendaPage() {
  return <TiendaStore />
}
