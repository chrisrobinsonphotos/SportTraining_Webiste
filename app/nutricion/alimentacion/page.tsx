import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import NutricionAlimentacion from '@/components/NutricionAlimentacion'

export const metadata: Metadata = {
  title: 'Alimentación Deportiva — Sport Training Murcia',
  description:
    'La base real de cualquier progreso. Macronutrientes, timing nutricional e hidratación para atletas funcionales. Nutrición deportiva con respaldo científico en Sport Training Murcia.',
  keywords: [
    'alimentación deportiva Murcia',
    'nutrición deportiva gimnasio',
    'macronutrientes entrenamiento',
    'dieta HYROX',
    'nutrición funcional Murcia',
    'Sport Training nutrición',
  ],
  alternates: {
    canonical: '/nutricion/alimentacion',
  },
  openGraph: {
    title: 'Alimentación Deportiva — Sport Training Murcia',
    description:
      'La base real de cualquier progreso. Nutrición deportiva con respaldo científico.',
    url: 'https://sporttraining.es/nutricion/alimentacion',
    type: 'website',
  },
}

export default function Alimentacion() {
  return (
    <>
      <Navbar />
      <NutricionAlimentacion />
      <Footer />
      <ContactModal />
    </>
  )
}
