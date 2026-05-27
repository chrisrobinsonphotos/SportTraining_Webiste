'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from './Navbar'
import ContactForm from './ContactForm'

const PHONE = '622443495'
const PHONE_DISPLAY = '622 443 495'
const WHATSAPP_URL = `https://wa.me/34${PHONE}`
const CALL_URL = `tel:+34${PHONE}`
const ADDRESS = 'C. Cisne, 3, 30009 Murcia'
const MAPS_LINK = `https://maps.google.com/?q=Sport+Training+Murcia,+C.+Cisne+3,+30009+Murcia`

const contactItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Teléfono',
    value: PHONE_DISPLAY,
    sub: 'Llámanos directamente',
    href: CALL_URL,
    cta: 'Llamar ahora',
    color: '#F1B91E',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: 'WhatsApp',
    value: PHONE_DISPLAY,
    sub: 'Escríbenos por WhatsApp',
    href: WHATSAPP_URL,
    cta: 'Abrir WhatsApp',
    color: '#25D366',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="square" strokeLinejoin="miter" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Dirección',
    value: ADDRESS,
    sub: 'Murcia, Región de Murcia',
    href: MAPS_LINK,
    cta: 'Ver en Google Maps',
    color: '#F1B91E',
  },
]

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' })

  return (
    <div className="bg-[#191919] min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative px-6 md:px-12 lg:px-16 pb-20 border-b border-white/8"
        style={{ paddingTop: '140px' }}>

        {/* Background texture */}
        <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-[900px]">
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[18vw] md:text-[13vw] lg:text-[10vw] leading-[0.85] uppercase"
            >
              <span className="text-white">HABLE</span><span style={{ fontStyle: 'italic' }} className="text-[#F1B91E]">MOS.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="w-2 h-2 bg-[#F1B91E]" />
            <span className="section-label">Contacto · Sport Training Murcia</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className="text-white/45 text-[17px] leading-relaxed mt-10 max-w-[480px]"
          >
            Estamos en Murcia desde 2007. Escríbenos, llámanos o pásate directamente.
          </motion.p>
        </div>
      </section>

      {/* ── MAIN CONTENT: contact info left, form right ── */}
      <section ref={contentRef} className="grid lg:grid-cols-[1fr_1fr] border-b border-white/8">

        {/* Left: Contact cards */}
        <div className="px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center gap-6 border-r border-white/8">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label !== 'Teléfono' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start gap-5 border border-white/8 p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white/25 transition-colors duration-300"
                style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-[11px] tracking-[0.25em] uppercase text-white/35 mb-1">
                  {item.label}
                </p>
                <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className="text-white text-[22px] md:text-[26px] uppercase leading-tight truncate">
                  {item.value}
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                  className="text-white/40 text-[13px] mt-1">
                  {item.sub}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: item.color }}
                  className="text-[11px] tracking-[0.2em] uppercase whitespace-nowrap">
                  {item.cta}
                </span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke={item.color} strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-white/25 text-[13px] mt-2"
          >
            Sport Training · Est. 2007 · Región de Murcia
          </motion.p>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={contentInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 md:px-12 lg:px-14 py-16 flex flex-col justify-center"
        >
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-2 bg-[#F1B91E]" />
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                className="text-[11px] tracking-[0.25em] uppercase text-white/35">
                Formulario de contacto
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[42px] md:text-[52px] uppercase leading-[0.9] text-white">
              Envía un<br />
              <span style={{ fontStyle: 'italic', color: '#F1B91E' }}>mensaje.</span>
            </h2>
          </div>
          <ContactForm />
        </motion.div>
      </section>


      {/* ── BOTTOM BAR ── */}
      <div className="border-t-4 border-[#F1B91E] px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-white/25 text-[13px]">
          © 2026 Sport Training Murcia · Todos los derechos reservados
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 text-[#F1B91E] hover:text-white transition-colors duration-300">
          <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className="text-[11px] tracking-[0.2em] uppercase">Volver al inicio</span>
        </Link>
      </div>
    </div>
  )
}
