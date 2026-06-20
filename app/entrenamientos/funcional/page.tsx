import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import EntrenamientoFuncional from '@/components/EntrenamientoFuncional'

export const metadata: Metadata = {
  title: 'Entrenamiento Funcional Murcia — Movilidad y Longevidad',
  description:
    'Entrenamiento funcional en Sport Training Murcia: los 7 patrones del movimiento humano, movilidad real y entrenamiento para la longevidad. Fuerza que se traduce en vida, con base científica.',
  keywords: [
    'entrenamiento funcional Murcia',
    'movilidad Murcia',
    'entrenamiento longevidad',
    'patrones de movimiento',
    'entrenamiento funcional gimnasio',
    'Sport Training funcional',
  ],
  alternates: { canonical: '/entrenamientos/funcional' },
  openGraph: {
    title: 'Entrenamiento Funcional Murcia — Movilidad y Longevidad',
    description:
      'Los 7 patrones del movimiento, movilidad real y entrenamiento para la longevidad. Fuerza que se traduce en vida.',
    url: 'https://sporttraining.es/entrenamientos/funcional',
    type: 'website',
  },
}

export default function FuncionalPage() {
  return (
    <>
      <Navbar />
      <EntrenamientoFuncional />
      <Footer />
      <ContactModal />
    </>
  )
}
