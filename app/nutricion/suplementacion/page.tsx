import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import NutricionSuplementacion from '@/components/NutricionSuplementacion'

export const metadata: Metadata = {
  title: 'Suplementación Deportiva — Sport Training Murcia',
  description:
    'La evidencia manda. Guía de suplementación deportiva basada en ciencia real — qué funciona, qué no, y cómo distinguir el marketing de la evidencia. ISSN, EFSA y sentido común.',
  keywords: [
    'suplementación deportiva evidencia',
    'creatina entrenamiento',
    'suplementos HYROX',
    'suplementos gimnasio Murcia',
    'nutrición deportiva suplementos',
    'Sport Training suplementación',
  ],
  alternates: {
    canonical: '/nutricion/suplementacion',
  },
  openGraph: {
    title: 'Suplementación Deportiva — Sport Training Murcia',
    description:
      'La evidencia manda. Suplementación deportiva basada en ciencia real.',
    url: 'https://sporttraining.es/nutricion/suplementacion',
    type: 'website',
  },
}

export default function Suplementacion() {
  return (
    <>
      <Navbar />
      <NutricionSuplementacion />
      <Footer />
      <ContactModal />
    </>
  )
}
