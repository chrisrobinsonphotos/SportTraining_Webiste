'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GOALS = ['HYROX', 'Funcional', 'Personal', 'Adaptado'] as const
type Goal = (typeof GOALS)[number]

const NUTRITION_GOALS = ['Pérdida de grasa', 'Rendimiento', 'Planificación', 'Suplementación'] as const
type NutritionGoal = (typeof NUTRITION_GOALS)[number]

type ModalVariant = 'training' | 'nutrition'

const WA_NUMBER = '34622443495'

function buildWhatsAppUrl(name: string, phone: string, goal: string, variant: ModalVariant) {
  const msg = variant === 'nutrition'
    ? `Hola Sport Training, soy ${name} (tel: ${phone}). Me interesa ${goal} y quiero pedir una consulta nutricional.`
    : `Hola Sport Training, soy ${name} (tel: ${phone}). Me interesa ${goal} y quiero pedir mi día de prueba.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

/**
 * Capture the lead server-side before handing off to WhatsApp.
 * Resolves true only when the server accepted the submission — the caller
 * shows the success screen on true and an inline fallback on false, so a
 * rejected capture is never presented to the person as if it had worked.
 */
async function captureLead(name: string, phone: string, goal: string, variant: ModalVariant): Promise<boolean> {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    w.gtag?.('event', variant === 'nutrition' ? 'nutrition_request' : 'trial_request', { method: 'modal' })
    const res = await fetch('/api/prueba', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: name, telefono: phone, interes: goal, canal: variant === 'nutrition' ? 'modal-nutricion' : 'modal' }),
      keepalive: true,
    })
    return res.ok
  } catch {
    return false
  }
}

/* ── SVG icons ─────────────────────────────────────────────────── */

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-[15px] h-[15px]">
      <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-[#191919]">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px] text-[#F1B91E]">
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px] text-[#F1B91E]">
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
  const [variant, setVariant] = useState<ModalVariant>('training')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [goal, setGoal] = useState<Goal>('HYROX')
  const [nutritionGoal, setNutritionGoal] = useState<NutritionGoal>('Pérdida de grasa')
  const [submitted, setSubmitted] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const [shakeFields, setShakeFields] = useState<{ name: boolean; phone: boolean }>({ name: false, phone: false })

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const submittingRef = useRef(false)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = e.target as HTMLElement
      const nutritionTrigger = el.closest('[data-nutrition]')
      const contactTrigger = el.closest('[data-contact]')
      if (nutritionTrigger) {
        e.preventDefault()
        setVariant('nutrition')
        setOpen(true)
      } else if (contactTrigger) {
        e.preventDefault()
        setVariant('training')
        setOpen(true)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

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
    setTimeout(() => {
      setSubmitted(false)
      setSubmitFailed(false)
      setName('')
      setPhone('')
      setGoal('HYROX')
      setNutritionGoal('Pérdida de grasa')
      setShakeFields({ name: false, phone: false })
    }, 300)
  }, [])

  function flashField(field: 'name' | 'phone') {
    setShakeFields(prev => ({ ...prev, [field]: true }))
    setTimeout(() => setShakeFields(prev => ({ ...prev, [field]: false })), 600)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submittingRef.current) return

    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    let valid = true
    if (!trimmedName) { flashField('name'); valid = false }
    if (!trimmedPhone) { flashField('phone'); valid = false }
    if (!valid) return

    submittingRef.current = true
    setSubmitFailed(false)

    const activeGoal = variant === 'nutrition' ? nutritionGoal : goal

    // Opened synchronously, before the await — a window.open() resumed after an
    // async gap is no longer tied to the click and gets blocked as a popup.
    window.open(buildWhatsAppUrl(trimmedName, trimmedPhone, activeGoal, variant), '_blank')

    const captured = await captureLead(trimmedName, trimmedPhone, activeGoal, variant)
    submittingRef.current = false

    if (captured) {
      setSubmitted(true)
    } else {
      // Keep the entered values on screen: the WhatsApp button below is the
      // fallback, and the person should not have to retype anything.
      setSubmitFailed(true)
    }
  }

  function reset() {
    setSubmitted(false)
    setSubmitFailed(false)
    setName('')
    setPhone('')
    setGoal('HYROX')
    setNutritionGoal('Pérdida de grasa')
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

          {/* Modal box — wider, more padding */}
          <motion.div
            className="relative w-full mx-4 bg-[#161616] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-y-auto"
            style={{ maxWidth: '720px', maxHeight: '90vh' }}
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
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/50 hover:text-[#F1B91E] transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* Inner content — generous padding */}
            <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
              {!submitted ? (
                <>
                  {/* Heading */}
                  <h2
                    style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                    className="text-[3rem] leading-[0.95] uppercase text-white mt-2 mb-2"
                  >
                    {variant === 'nutrition' ? (
                      <>TU CONSULTA<br /><em className="text-[#F1B91E] not-italic" style={{ fontStyle: 'italic', textTransform: 'none' }}>Nutricional.</em></>
                    ) : (
                      <>TU DÍA DE<br /><em className="text-[#F1B91E] not-italic" style={{ fontStyle: 'italic', textTransform: 'none' }}>Prueba.</em></>
                    )}
                  </h2>

                  {/* Lead text */}
                  <p
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
                    className="text-white/60 text-[1rem] leading-relaxed mb-10 max-w-[480px]"
                  >
                    {variant === 'nutrition'
                      ? 'Completa el formulario y te contactamos por WhatsApp para agendar tu consulta nutricional. Sin compromiso.'
                      : 'Completa el formulario y te contactamos por WhatsApp para activar tu día de prueba. Gratis, sin compromiso.'}
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Two-column name + phone on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {/* Nombre */}
                      <div>
                        <label
                          style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                          className="block text-[0.75rem] tracking-[.18em] uppercase text-white/40 mb-3"
                        >
                          Nombre
                        </label>
                        <input
                          ref={nameRef}
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full bg-transparent border text-white text-[1rem] outline-none transition-colors duration-200"
                          style={{
                            fontFamily: 'var(--font-inter)',
                            padding: '1rem 1.25rem',
                            borderColor: shakeFields.name ? '#b8920f' : 'rgba(255,255,255,0.12)',
                          }}
                          onFocus={e => e.currentTarget.style.borderColor = '#F1B91E'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                        />
                      </div>

                      {/* Teléfono */}
                      <div>
                        <label
                          style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                          className="block text-[0.75rem] tracking-[.18em] uppercase text-white/40 mb-3"
                        >
                          Teléfono / WhatsApp
                        </label>
                        <input
                          ref={phoneRef}
                          type="text"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full bg-transparent border text-white text-[1rem] outline-none transition-colors duration-200"
                          style={{
                            fontFamily: 'var(--font-inter)',
                            padding: '1rem 1.25rem',
                            borderColor: shakeFields.phone ? '#b8920f' : 'rgba(255,255,255,0.12)',
                          }}
                          onFocus={e => e.currentTarget.style.borderColor = '#F1B91E'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                        />
                      </div>
                    </div>

                    {/* Me interesa — chips with more spacing */}
                    <div className="mb-10">
                      <label
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                        className="block text-[0.75rem] tracking-[.18em] uppercase text-white/40 mb-4"
                      >
                        Me interesa
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {(variant === 'nutrition' ? NUTRITION_GOALS : GOALS).map(g => {
                          const active = variant === 'nutrition' ? nutritionGoal === g : goal === g
                          return (
                            <button
                              key={g}
                              type="button"
                              onClick={() => variant === 'nutrition' ? setNutritionGoal(g as NutritionGoal) : setGoal(g as Goal)}
                              className="transition-all duration-150 cursor-pointer"
                              style={{
                                fontFamily: 'var(--font-inter)',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                padding: '0.85rem 1.5rem',
                                border: active ? '1px solid #F1B91E' : '1px solid rgba(255,255,255,0.12)',
                                background: active ? '#F1B91E' : 'transparent',
                                color: active ? '#191919' : 'rgba(255,255,255,0.6)',
                              }}
                              onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                              onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
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
                      className="w-full bg-[#F1B91E] text-[#191919] flex items-center justify-center gap-3 hover:bg-[#C99200] transition-all duration-200 cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        padding: '1.25rem 2rem',
                      }}
                    >
                      {variant === 'nutrition' ? 'Solicitar Consulta' : 'Solicitar Sesión'}
                      <ArrowRightIcon />
                    </button>
                  </form>

                  {/* ── Contact info — separated clearly ── */}
                  <div
                    className="mt-10 pt-8"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {/* Dirección */}
                      <a
                        href="https://maps.google.com/?q=C.+Cisne+3,+30009+Murcia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 py-3 group"
                      >
                        <span className="w-[36px] h-[36px] flex items-center justify-center border border-[rgba(241,185,30,0.3)] shrink-0">
                          <MapPinIcon />
                        </span>
                        <div>
                          <span
                            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                            className="block text-[0.75rem] tracking-[.18em] uppercase text-white/35 mb-1"
                          >
                            Dirección
                          </span>
                          <span
                            style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
                            className="text-[0.95rem] text-white/60 group-hover:text-white/90 transition-colors"
                          >
                            C. Cisne 3, 30009 Murcia
                          </span>
                        </div>
                      </a>

                      {/* Teléfono */}
                      <a
                        href="tel:+34622443495"
                        className="flex items-center gap-4 py-3 group"
                      >
                        <span className="w-[36px] h-[36px] flex items-center justify-center border border-[rgba(241,185,30,0.3)] shrink-0">
                          <PhoneIcon />
                        </span>
                        <div>
                          <span
                            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                            className="block text-[0.75rem] tracking-[.18em] uppercase text-white/35 mb-1"
                          >
                            Teléfono
                          </span>
                          <span
                            style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
                            className="text-[0.95rem] text-white/60 group-hover:text-white/90 transition-colors"
                          >
                            +34 622 443 495
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Submission failed — values kept, WhatsApp below is the fallback */}
                    {submitFailed && (
                      <div
                        role="alert"
                        className="mb-4"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 400,
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          color: 'rgba(255,255,255,0.75)',
                          border: '1px solid #b8920f',
                          borderLeftWidth: '3px',
                          background: 'rgba(184,146,15,0.08)',
                          padding: '1rem 1.25rem',
                        }}
                      >
                        No hemos podido registrar tu solicitud. Escríbenos por WhatsApp
                        y te atendemos igualmente — tus datos siguen aquí.
                      </div>
                    )}

                    {/* WhatsApp button */}
                    <a
                      href={`https://wa.me/${WA_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        const w = window as unknown as { gtag?: (...args: unknown[]) => void }
                        w.gtag?.('event', 'trial_request', { method: 'modal_whatsapp' })
                      }}
                      className="w-full bg-[#25D366] text-white flex items-center justify-center gap-3 hover:brightness-110 transition-all duration-150"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        padding: '1rem 2rem',
                      }}
                    >
                      <WhatsAppIcon />
                      Escríbenos por WhatsApp
                    </a>
                  </div>
                </>
              ) : (
                /* ── Success state ───────────────────────────────── */
                <div className="flex flex-col items-center text-center py-16">
                  <div className="w-20 h-20 bg-[#F1B91E] flex items-center justify-center mb-8">
                    <CheckIcon />
                  </div>

                  <h2
                    style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                    className="text-[2.5rem] leading-tight uppercase text-white mb-4"
                  >
                    ¡Hecho, {firstName}!
                  </h2>

                  <p
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
                    className="text-white/60 text-[1rem] leading-relaxed max-w-[400px] mb-10"
                  >
                    Se ha abierto WhatsApp con tu mensaje. Si no se ha abierto, puedes contactarnos directamente al{' '}
                    <a href="tel:+34622443495" className="text-white/80 underline">+34 622 443 495</a>.
                  </p>

                  <button
                    onClick={reset}
                    className="border border-[#F1B91E] text-[#F1B91E] hover:bg-[#F1B91E] hover:text-[#191919] transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '1rem 2.5rem',
                    }}
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
