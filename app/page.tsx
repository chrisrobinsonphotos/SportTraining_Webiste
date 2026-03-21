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
