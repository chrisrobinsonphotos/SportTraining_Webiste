import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Philosophy from '@/components/Philosophy'
import Training from '@/components/Training'
import Modalities from '@/components/Modalities'
import Adaptado from '@/components/Adaptado'
import Nutrition from '@/components/Nutrition'
import Community from '@/components/Community'
import Trainers from '@/components/Trainers'
import Schedule from '@/components/Schedule'
import CTASection from '@/components/CTASection'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  // The default title from layout.tsx applies here ("Sport Training — Cuerpos Fuertes. Cuerpos Capaces.")
  // We override the description with one tuned for the home page snippet in Google
  description:
    'Centro integral de entrenamiento de alto rendimiento en Murcia desde 2007. HYROX, CrossTraining, Funcional, Personal Training, Entrenamiento Adaptado y nutrición. Cuerpos fuertes, cuerpos capaces.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sport Training — Cuerpos Fuertes. Cuerpos Capaces.',
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
        <Adaptado />
        <Nutrition />
        <Community />
        <Trainers />
        <Schedule />
        <CTASection />
        <Reviews />
      </main>
      <Footer />
    </>
  )
}
