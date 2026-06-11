import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import PruebaPage from '@/components/PruebaPage'

export const metadata: Metadata = {
  title: 'Día de Prueba Gratis — Sport Training Murcia',
  description:
    'Pide tu día de prueba gratis en Sport Training Murcia. Entrena HYROX, CrossTraining o funcional con nosotros antes de decidir. Sin compromiso, sin matrícula. 7 días para venir.',
  keywords: [
    'día de prueba gimnasio Murcia',
    'clase de prueba gratis Murcia',
    'probar gimnasio Murcia',
    'HYROX Murcia prueba',
    'gimnasio sin compromiso Murcia',
    'Sport Training día de prueba',
  ],
  alternates: {
    canonical: '/prueba',
  },
  openGraph: {
    title: 'Día de Prueba Gratis — Sport Training Murcia',
    description:
      'Entrena un día con nosotros antes de decidir nada. Sin compromiso, sin matrícula. Pide tu día de prueba.',
    url: 'https://sporttraining.es/prueba',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Día de Prueba Gratis — Sport Training Murcia',
    description:
      'Entrena un día con nosotros antes de decidir nada. Sin compromiso, sin matrícula.',
  },
}

export default function Prueba() {
  return (
    <>
      <Navbar />
      <PruebaPage />
      <Footer />
      <ContactModal />
    </>
  )
}
