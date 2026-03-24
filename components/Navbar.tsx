'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  {
    label: 'El Gym',
    href: '/#filosofia',
    children: [
      { label: 'Nuestra Filosofía', href: '/#filosofia' },
      { label: 'Nuestro Equipo', href: '/#equipo' },
      { label: 'Instalaciones', href: '/#modalidades' },
    ],
  },
  {
    label: 'Entrenamientos',
    href: '/#entrenamientos',
    children: [
      { label: 'HYROX', href: '/#entrenamientos' },
      { label: 'Funcional', href: '/#entrenamientos' },
      { label: 'CrossTraining', href: '/#entrenamientos' },
      { label: 'Entrenamiento Adaptado', href: '/#adaptado' },
    ],
  },
  {
    label: 'Modalidades',
    href: '/#modalidades',
    children: [
      { label: 'Personal Training · Oro', href: '/#modalidades' },
      { label: 'Entrenamiento en Grupo · Plata', href: '/#modalidades' },
      { label: 'Entrenamiento Libre · Bronce', href: '/#modalidades' },
    ],
  },
  {
    label: 'Nutrición',
    href: '/#nutricion',
    children: [
      { label: 'Alimentación', href: '/#nutricion' },
      { label: 'Suplementación', href: '/#nutricion' },
      { label: 'Ropa', href: '/#nutricion' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#191919]/95 backdrop-blur-md border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[90px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-black/55 via-black/35 to-transparent" />
                <Image
                  src="/st-logo-transparent.png"
                  alt="Sport Training"
                  fill
                  className="object-contain relative z-10"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span
                  className="font-display text-[17px] font-700 tracking-[0.25em] text-white uppercase leading-none block"
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                >
                  Sport Training
                </span>
                <span
                  className="text-[11px] tracking-[0.3em] text-[#F1B91E] uppercase leading-none block mt-[4px]"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                >
                  Est. 2007 · Murcia
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children ? handleMouseEnter(item.label) : undefined}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1 px-3 py-2 group"
                  >
                    <span
                      className="text-[13px] tracking-[0.16em] uppercase text-white/70 group-hover:text-white transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                    >
                      {item.label}
                    </span>
                    {item.children && (
                      <svg
                        className={`w-2.5 h-2.5 text-white/40 group-hover:text-[#F1B91E] transition-all duration-200 ${
                          activeDropdown === item.label ? 'rotate-180 text-[#F1B91E]' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scaleY: 0.96 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: 6, scaleY: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'top' }}
                        className="absolute top-full left-0 pt-2 z-50 min-w-[220px]"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-[#111111] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                          {/* Gold top accent */}
                          <div className="h-[2px] w-full bg-[#F1B91E]" />
                          <div className="py-2">
                            {item.children.map((child, i) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="flex items-center gap-3 px-5 py-3 group/item"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span
                                  className="text-[10px] text-[#F1B91E]/40 group-hover/item:text-[#F1B91E] transition-colors"
                                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                                >
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span
                                  className="text-[12px] tracking-[0.12em] uppercase text-white/60 group-hover/item:text-white transition-colors duration-200"
                                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                                >
                                  {child.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/contacto"
                className="hidden lg:flex items-center gap-2 bg-[#F1B91E] text-[#191919] px-5 py-2.5 group hover:bg-[#C99200] transition-colors duration-200"
              >
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                >
                  Contacto
                </span>
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden flex flex-col gap-[5px] p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`block h-[1.5px] bg-[#F1B91E] transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
                <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#191919] flex flex-col pt-[70px] overflow-y-auto"
          >
            <div className="h-[1px] w-full bg-[#F1B91E]" />
            <nav className="flex-1 px-6 py-8 space-y-1">
              {navItems.map((item, idx) => (
                <div key={item.label}>
                  <button
                    className="flex items-center justify-between w-full py-4 border-b border-white/8 group"
                    onClick={() =>
                      item.children
                        ? setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        : setMobileOpen(false)
                    }
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className="text-[10px] text-[#F1B91E]/60"
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-[15px] tracking-[0.15em] uppercase text-white"
                        style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                      >
                        {item.label}
                      </span>
                    </span>
                    {item.children && (
                      <svg
                        className={`w-4 h-4 text-[#F1B91E] transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  <AnimatePresence>
                    {item.children && mobileExpanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 py-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block py-2.5 text-white/50 hover:text-white transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span
                                className="text-[12px] tracking-[0.15em] uppercase"
                                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                              >
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 w-full bg-[#F1B91E] text-[#191919] py-4"
                onClick={() => setMobileOpen(false)}
              >
                <span
                  className="text-[12px] tracking-[0.25em] uppercase"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                >
                  Contacto
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
