import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contacto — Sport Training Murcia',
  description: 'Contacta con Sport Training Murcia. Llámanos, escríbenos por WhatsApp o visítanos en C. Cisne, 3, 30009 Murcia.',
}

export default function ContactoPage() {
  return <ContactPage />
}
