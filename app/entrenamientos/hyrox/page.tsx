import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import EntrenamientoHyrox from '@/components/EntrenamientoHyrox'

export const metadata: Metadata = {
  title: 'HYROX Murcia — Training Club Oficial',
  description:
    'Entrena el formato oficial de HYROX en Sport Training Murcia: 8 km de carrera y 8 estaciones funcionales. Centro afiliado HYROX Training Club con entrenadores certificados.',
  keywords: [
    'HYROX Murcia',
    'HYROX Training Club Murcia',
    'entrenar HYROX Murcia',
    'competición HYROX',
    'preparación HYROX',
    'Sport Training HYROX',
  ],
  alternates: { canonical: '/entrenamientos/hyrox' },
  openGraph: {
    title: 'HYROX Murcia — Training Club Oficial',
    description:
      'El formato oficial de HYROX en Murcia: 8 km de carrera, 8 estaciones funcionales. Centro afiliado HYROX Training Club.',
    url: 'https://sporttraining.es/entrenamientos/hyrox',
    type: 'website',
  },
}

export default function HyroxPage() {
  return (
    <>
      <Navbar />
      <EntrenamientoHyrox />
      <Footer />
      <ContactModal />
    </>
  )
}
