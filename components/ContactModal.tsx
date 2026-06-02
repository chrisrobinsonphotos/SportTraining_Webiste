'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GOALS = ['HYROX', 'Funcional', 'CrossTraining', 'Personal', 'Adaptado'] as const
type Goal = (typeof GOALS)[number]

const WA_NUMBER = '34622443495'

function buildWhatsAppUrl(name: string, phone: string, goal: string) {
  const msg = `Hola Sport Training, soy ${name} (tel: ${phone}). Me interesa ${goal} y me gustaría reservar una sesión de prueba.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

/* ── SVG icons (inline to avoid extra deps) ─────────────────────── */

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.19l-3.22-3.22a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#191919]">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#F1B91E]">
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#F1B91E]">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ── Component ───────────────────────────────────────────────────── */

export default function ContactModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [goal, setGoal] = useState<Goal>('HYROX')
  const [submitted, setSubmitted] = useState(false)
  const [shakeFields, setShakeFields] = useState<{ name: boolean; phone: boolean }>({ name: false, phone: false })

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  // Listen for clicks on any [data-contact] element
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const trigger = (e.target as HTMLElement).closest('[data-contact]')
      if (trigger) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ESC to close
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const close = useCallback(() => {
    setOpen(false)
    // Reset after exit animation
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setPhone('')
      setGoal('HYROX')
      setShakeFields({ name: false, phone: false })
    }, 300)
  }, [])

  function flashField(field: 'name' | 'phone') {
    setShakeFields(prev => ({ ...prev, [field]: true }))
    setTimeout(() => setShakeFields(prev => ({ ...prev, [field]: false })), 600)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    let valid = true
    if (!trimmedName) { flashField('name'); valid = false }
    if (!trimmedPhone) { flashField('phone'); valid = false }
    if (!valid) return

    window.open(buildWhatsAppUrl(trimmedName, trimmedPhone, goal), '_blank')
    setSubmitted(true)
  }

  function reset() {
    setSubmitted(false)
    setName('')
    setPhone('')
    setGoal('HYROX')
  }

  const firstName = name.trim().split(' ')[0] || ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[rgba(10,10,10,0.85)] backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal box */}
          <motion.div
            className="relative w-full max-w-[480px] mx-4 bg-[#161616] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold top bar */}
            <div className="h-[3px] bg-[#F1B91E] w-full" />

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-[#F1B91E] transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Inner content */}
            <div className="px-10 pb-10 pt-0">
              {!submitted ? (
                <>
                  {/* Heading */}
                  <h2 className="font-barlow font-extrabold text-[2.5rem] leading-[1.05] uppercase text-white mt-6 mb-2">
                    RESERVA TU<br />
                    <em className="text-[#F1B91E] italic">Sesión.</em>
                  </h2>

                  {/* Lead text */}
                  <p className="font-inter font-light text-white/65 text-[0.9rem] leading-relaxed mb-8">
                    Completa el formulario y te contactaremos por WhatsApp para confirmar tu primera sesión.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Nombre */}
                    <div className="mb-5">
                      <label className="block font-inter font-semibold text-[0.6rem] tracking-[.18em] uppercase text-white/40 mb-2">
                        Nombre
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-transparent border text-white font-inter text-[0.9rem] py-[.85rem] px-4 outline-none transition-colors duration-200"
                        style={{
                          borderColor: shakeFields.name
                            ? '#b8920f'
                            : 'rgba(255,255,255,0.15)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#F1B91E'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="mb-5">
                      <label className="block font-inter font-semibold text-[0.6rem] tracking-[.18em] uppercase text-white/40 mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        ref={phoneRef}
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-transparent border text-white font-inter text-[0.9rem] py-[.85rem] px-4 outline-none transition-colors duration-200"
                        style={{
                          borderColor: shakeFields.phone
                            ? '#b8920f'
                            : 'rgba(255,255,255,0.15)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#F1B91E'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                      />
                    </div>

                    {/* Me interesa — chip group */}
                    <div className="mb-8">
                      <label className="block font-inter font-semibold text-[0.6rem] tracking-[.18em] uppercase text-white/40 mb-3">
                        Me interesa
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {GOALS.map(g => {
                          const active = goal === g
                          return (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setGoal(g)}
                              className={`
                                px-4 py-2 font-inter font-semibold text-[0.7rem] tracking-[.12em] uppercase
                                border transition-all duration-150 cursor-pointer
                                ${active
                                  ? 'bg-[#F1B91E] border-[#F1B91E] text-[#191919]'
                                  : 'bg-transparent border-white/15 text-white/65 hover:border-white/30'
                                }
                              `}
                            >
                              {g}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-[#F1B91E] text-black font-inter font-bold text-[0.7rem] tracking-[.25em] uppercase py-4 flex items-center justify-center gap-3 hover:brightness-110 transition-all duration-150 cursor-pointer"
                    >
                      Solicitar Sesión
                      <ArrowRightIcon />
                    </button>
                  </form>

                  {/* Contact info block */}
                  <div className="border-t border-white/10 mt-7 pt-6">
                    {/* Dirección */}
                    <a
                      href="https://maps.google.com/?q=C.+Cisne+3,+30009+Murcia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-[.85rem] py-[.7rem] group"
                    >
                      <span className="w-[30px] h-[30px] flex items-center justify-center border border-[rgba(241,185,30,0.3)] shrink-0">
                        <MapPinIcon />
                      </span>
                      <span className="font-inter text-[0.85rem] text-white/60 group-hover:text-white/90 transition-colors">
                        C. Cisne 3, 30009 Murcia
                      </span>
                    </a>

                    {/* Teléfono */}
                    <a
                      href="tel:+34622443495"
                      className="flex items-center gap-[.85rem] py-[.7rem] group"
                    >
                      <span className="w-[30px] h-[30px] flex items-center justify-center border border-[rgba(241,185,30,0.3)] shrink-0">
                        <PhoneIcon />
                      </span>
                      <span className="font-inter text-[0.85rem] text-white/60 group-hover:text-white/90 transition-colors">
                        +34 622 443 495
                      </span>
                    </a>

                    {/* WhatsApp button */}
                    <a
                      href={`https://wa.me/${WA_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full bg-[#25D366] text-white font-inter font-semibold text-[0.75rem] tracking-[.08em] py-3 flex items-center justify-center gap-2.5 hover:brightness-110 transition-all duration-150"
                    >
                      <WhatsAppIcon />
                      Escríbenos por WhatsApp
                    </a>
                  </div>
                </>
              ) : (
                /* ── Success state ───────────────────────────────── */
                <div className="flex flex-col items-center text-center pt-10 pb-4">
                  {/* Gold square with check */}
                  <div className="w-[72px] h-[72px] bg-[#F1B91E] flex items-center justify-center mb-6">
                    <CheckIcon />
                  </div>

                  <h2 className="font-barlow font-extrabold text-[2.25rem] leading-tight uppercase text-white mb-3">
                    ¡Hecho, {firstName}!
                  </h2>

                  <p className="font-inter font-light text-white/65 text-[0.95rem] leading-relaxed max-w-[320px] mb-8">
                    Se ha abierto WhatsApp con tu mensaje. Si no se ha abierto, puedes contactarnos directamente al{' '}
                    <a href="tel:+34622443495" className="text-white/80 underline">+34 622 443 495</a>.
                  </p>

                  <button
                    onClick={reset}
                    className="border border-[#F1B91E] text-[#F1B91E] font-inter font-semibold text-[0.7rem] tracking-[.2em] uppercase px-8 py-3 hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-200 cursor-pointer"
                  >
                    Volver
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
