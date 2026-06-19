import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import NutricionPlanificacion from '@/components/NutricionPlanificacion'

export const metadata: Metadata = {
  title: 'Planificación Nutricional — Sport Training Murcia',
  description:
    'El sistema que funciona. Planificación semanal, periodización nutricional y preparación de comidas para atletas funcionales. Sin dietas genéricas — planes que se adaptan a tu entrenamiento.',
  keywords: [
    'planificación nutricional deportiva',
    'meal prep atletas',
    'periodización nutricional',
    'plan alimentación HYROX',
    'nutrición entrenamiento Murcia',
    'Sport Training planificación',
  ],
  alternates: {
    canonical: '/nutricion/planificacion',
  },
  openGraph: {
    title: 'Planificación Nutricional — Sport Training Murcia',
    description:
      'El sistema que funciona. Planes nutricionales integrados con tu entrenamiento.',
    url: 'https://sporttraining.es/nutricion/planificacion',
    type: 'website',
  },
}

export default function Planificacion() {
  return (
    <>
      <Navbar />
      <NutricionPlanificacion />
      <Footer />
      <ContactModal />
    </>
  )
}
