'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'El Gym', href: '/#filosofia' },
  { label: 'Entrenamientos', href: '/#entrenamientos' },
  { label: 'Membresías', href: '/#modalidades' },
  { label: 'Nutrición', href: '/#nutricion' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#191919]/95 backdrop-blur-md border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
          <div className="flex items-center justify-between h-[90px]">
            <Link href="/" className="flex items-center gap-[14px] flex-shrink-0">
              <div className="relative w-[58px] h-[58px]">
                <Image
                  src="/st-logo-new.png"
                  alt="Sport Training Murcia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span
                  className="block text-[17px] tracking-[0.25em] text-white uppercase leading-none"
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                >
                  Sport Training
                </span>
                <span
                  className="block text-[10px] tracking-[0.3em] text-[#F1B91E] uppercase leading-none mt-1"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                >
                  Est. 2007 · Murcia
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <span
                    className="text-[15px] tracking-[0.14em] uppercase"
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              <button
                data-contact
                className="inline-flex items-center gap-2 bg-[#F1B91E] text-[#191919] px-5 py-[0.7rem] hover:bg-[#C99200] transition-colors duration-200 group"
              >
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                >
                  Contacto
                </span>
                <svg className="w-[13px] h-[13px] group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </nav>

            <button
              className="lg:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[90px] z-40 bg-[#111111] flex flex-col px-[clamp(1.5rem,5vw,4rem)] py-8 gap-2"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 border-b border-white/8"
              >
                <span
                  className="text-[2rem] uppercase text-white"
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <button
              data-contact
              onClick={() => setMobileOpen(false)}
              className="mt-4 py-4 border-b border-white/8 text-left"
            >
              <span
                className="text-[2rem] uppercase text-[#F1B91E]"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              >
                Contacto
              </span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
