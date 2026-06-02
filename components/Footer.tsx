'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Single-page site for now — all in-section links point to homepage anchors,
// and anything without a dedicated section routes to /contacto. Restore deep
// routes here once the corresponding pages exist.
const footerNav = [
  {
    title: 'El Gym',
    links: [
      { label: 'Filosofía', href: '/#filosofia' },
      { label: 'Equipo', href: '/#equipo' },
      { label: 'Instalaciones', href: '/#modalidades' },
    ],
  },
  {
    title: 'Entrenamientos',
    links: [
      { label: 'HYROX', href: '/#entrenamientos' },
      { label: 'Funcional', href: '/#entrenamientos' },
      { label: 'CrossTraining', href: '/#entrenamientos' },
      { label: 'Adaptado', href: '/#adaptado' },
    ],
  },
  {
    title: 'Modalidades',
    links: [
      { label: 'Personal Training', href: '/#modalidades' },
      { label: 'Entrenamiento en Grupo', href: '/#modalidades' },
      { label: 'Entrenamiento Libre', href: '/#modalidades' },
    ],
  },
  {
    title: 'Más',
    links: [
      { label: 'Nutrición', href: '/#nutricion' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] overflow-hidden">
      {/* Top gold line */}
      <div className="h-[2px] bg-gradient-to-r from-[#F1B91E] via-[#F1B91E]/60 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Main footer content */}
        <div className="py-16 md:py-20 grid grid-cols-2 md:grid-cols-[1.5fr_repeat(4,1fr)] gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/st-logo-black.png"
                  alt="Sport Training Murcia — Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span
                  className="block text-[14px] tracking-[0.2em] text-white uppercase"
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                >
                  Sport Training
                </span>
                <span
                  className="block text-[9px] tracking-[0.25em] text-[#F1B91E] uppercase mt-0.5"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                >
                  Est. 2007 · Murcia
                </span>
              </div>
            </Link>

            <p
              className="text-white/35 text-[13px] leading-relaxed mb-6 max-w-[260px]"
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            >
              Construye un cuerpo lo suficientemente fuerte para la vida.
            </p>

            <div className="flex items-center gap-4 mb-8">
              {/* Social icons */}
              {[
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/sporttraining.mu',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/sporttrainingbymab',
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#F1B91E] hover:border-[#F1B91E]/30 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#F1B91E]" />
              <a
                href="https://sporttraining.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F1B91E]/60 hover:text-[#F1B91E] text-[11px] tracking-[0.15em] uppercase transition-colors"
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              >
                sporttraining.es
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((section) => (
            <div key={section.title}>
              <h5
                className="text-white text-[11px] tracking-[0.25em] uppercase mb-5"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
              >
                {section.title}
              </h5>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/35 hover:text-white text-[12px] tracking-[0.08em] uppercase transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/20 text-[11px] tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          >
            © {new Date().getFullYear()} Sport Training. Región de Murcia, España. Est. 2007.
          </p>

          <div className="flex items-center gap-6">
            {['Privacidad', 'Cookies', 'Legal'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-white/20 hover:text-white/50 text-[10px] tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
