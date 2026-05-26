import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contacto — Gimnasio Sport Training Murcia',
  description:
    'Contacta con Sport Training Murcia. WhatsApp +34 647 797 693. Visítanos en C. Cisne, 3, 30009 Murcia. Reserva tu sesión de prueba de HYROX, CrossTraining o entrenamiento personal.',
  keywords: [
    'contacto Sport Training Murcia',
    'gimnasio Murcia teléfono',
    'HYROX Murcia contacto',
    'reservar clase prueba Murcia',
    'gimnasio C. Cisne Murcia',
    'WhatsApp Sport Training',
  ],
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: 'Contacto — Sport Training Murcia',
    description:
      'WhatsApp, teléfono y dirección de Sport Training en C. Cisne, 3, Murcia. Reserva una sesión de prueba.',
    url: 'https://sporttraining.es/contacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto — Sport Training Murcia',
    description:
      'WhatsApp, teléfono y dirección de Sport Training en C. Cisne, 3, Murcia. Reserva una sesión de prueba.',
  },
}

export default function ContactoPage() {
  return <ContactPage />
}
