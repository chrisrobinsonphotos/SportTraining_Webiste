import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Philosophy from '@/components/Philosophy'
import Training from '@/components/Training'
import Modalities from '@/components/Modalities'
import StatementSection from '@/components/StatementSection'
import Adaptado from '@/components/Adaptado'
import Nutrition from '@/components/Nutrition'
import Community from '@/components/Community'
import Schedule from '@/components/Schedule'
import Trainers from '@/components/Trainers'
import Reviews from '@/components/Reviews'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

export const metadata: Metadata = {
  title: "Sport Training Murcia — HYROX Training Club Oficial",
  description:
    'Centro integral de entrenamiento de alto rendimiento en Murcia desde 2007. HYROX, CrossTraining, Funcional, Personal Training, Entrenamiento Adaptado y nutrición. Cuerpos fuertes, cuerpos capaces.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sport Training Murcia — HYROX Training Club Oficial',
    description:
      'Centro integral de entrenamiento de alto rendimiento en Murcia desde 2007. HYROX, CrossTraining, Funcional, Personal Training, Entrenamiento Adaptado y nutrición.',
    url: 'https://sporttraining.es',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Training />
        <Modalities />
        <StatementSection />
        <Adaptado />
        <Nutrition />
        <Community />
        <Schedule />
        <Trainers />
        <Reviews />
        <CTASection />
      </main>
      <Footer />
      <ContactModal />
    </>
  )
}
