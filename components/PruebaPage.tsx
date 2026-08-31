'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { getAttribution } from '@/lib/attribution'

// Origin token in the pre-filled message — see components/ContactModal.tsx for
// why it is a trailing parenthetical rather than anything more machine-shaped.
const WA_NUMBER = '34622443495'
const WA_ORIGIN = 'web-prueba'
const WA_MESSAGE = `Hola Sport Training. Quiero pedir mi día de prueba. (${WA_ORIGIN})`
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

const brandEase = [0.16, 1, 0.3, 1] as const

const INTERES_OPTIONS = ['HYROX', 'Funcional', 'CrossTraining', 'Gimnasio libre', 'No lo sé aún'] as const

const STEPS = [
  {
    num: '01',
    title: 'PIDE TU DÍA',
    body: 'Rellena el formulario o escríbenos por WhatsApp. Nombre y teléfono. Nada más.',
  },
  {
    num: '02',
    title: 'TE CREAMOS LA CUENTA',
    body: 'Te contestamos, resolvemos tus dudas y activamos tu acceso de prueba en nuestro sistema.',
  },
  {
    num: '03',
    title: 'TIENES 7 DÍAS',
    body: 'Eliges el día y la clase que mejor te venga dentro de tu semana de prueba. Vienes. Entrenas.',
  },
]

const EXPECT = [
  {
    title: 'Llega 10 minutos antes',
    body: 'Un entrenador te recibe, te enseña el espacio y te presenta al grupo.',
  },
  {
    title: 'Entrenas de verdad',
    body: 'Una sesión completa, adaptada a tu nivel. Cada ejercicio se ajusta a ti — da igual de dónde partas.',
  },
  {
    title: 'Sin presión',
    body: 'Al terminar, tú decides. Sin permanencia, la mayoría de planes sin matrícula. Si no es para ti, no pasa nada.',
  },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full bg-transparent border border-white/12 text-white text-[1rem] outline-none focus:border-[#F1B91E] transition-colors duration-200 placeholder-white/25'

const labelClass = 'block text-[0.75rem] tracking-[.18em] uppercase mb-3 text-white/40'

function trackTrialEvent(method: string) {
  if (typeof window !== 'undefined') {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    w.gtag?.('event', 'trial_request', { method })
  }
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function PruebaPage() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const expectRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' })
  const expectInView = useInView(expectRef, { once: true, margin: '-60px' })
  const formInView = useInView(formRef, { once: true, margin: '-60px' })

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    interes: 'HYROX',
    mensaje: '',
  })
  const [state, setState] = useState<FormState>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitting')

    try {
      const res = await fetch('/api/prueba', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Attribution is the session's FIRST touch, which for this page is
        // usually the ad or profile link that landed the person on /prueba.
        body: JSON.stringify({ ...form, canal: 'form', attribution: getAttribution() }),
      })

      if (res.ok) {
        trackTrialEvent('page_form')
        setState('success')
        setForm({ nombre: '', telefono: '', email: '', interes: 'HYROX', mensaje: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <main className="bg-[#191919] text-white">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight: '92vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/cta-group.jpg"
            alt="Día de prueba gratis en Sport Training Murcia — entrenamiento HYROX, CrossTraining y funcional"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-[#191919]/55 to-[#191919]/20" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, #191919 0%, transparent 45%)' }}
          />
        </div>

        <div className="relative z-10" style={{ padding: '10rem clamp(1.5rem,5vw,4rem) 0' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: brandEase }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-2 h-2 bg-[#F1B91E]" />
            <span className="section-label">Día de Prueba · Gratis · Sin Compromiso</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: brandEase }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
              className="text-[clamp(4rem,10vw,9rem)] leading-[0.85] uppercase text-white"
            >
              TU PRIMER DÍA
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: 110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.22, ease: brandEase }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic' }}
              className="text-[clamp(4rem,10vw,9rem)] leading-[0.85] text-[#F1B91E]"
            >
              Empieza aquí.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: brandEase }}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className="max-w-xl text-white/75 text-lg mb-14"
          >
            Entrena un día con nosotros antes de decidir nada. Ven. Conoce el espacio.
            Hay una diferencia entre estar en forma y ser capaz — y se nota desde la primera sesión.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: brandEase }}
            className="flex flex-wrap gap-4 pb-20"
          >
            <a
              href="#solicitar"
              className="group flex items-center gap-3 bg-[#F1B91E] text-[#191919] hover:bg-[#C99200] transition-colors duration-300"
              style={{ padding: '1rem 1.75rem' }}
            >
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[0.75rem] tracking-[0.25em] uppercase"
              >
                Pide tu Día de Prueba
              </span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTrialEvent('whatsapp_hero')}
              className="flex items-center gap-3 border border-white/20 text-white/75 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-all duration-300"
              style={{ padding: '1rem 1.75rem' }}
            >
              <WhatsAppIcon />
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[0.75rem] tracking-[0.25em] uppercase">
                Por WhatsApp
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ─────────────────────────────────────────────── */}
      <section ref={stepsRef} className="bg-[#161616] border-t border-white/5" style={{ padding: '8rem clamp(1.5rem,5vw,4rem)' }}>
        <div className="flex items-center gap-4 mb-16">
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Cómo Funciona</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: brandEase }}
              className="bg-[#1E1E1E] border border-white/5 p-12 hover:border-[#F1B91E]/30 transition-colors duration-300"
            >
              <div
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontStyle: 'italic' }}
                className="text-[3.5rem] leading-none text-[#F1B91E] mb-8"
              >
                {step.num}
              </div>
              <h3
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-[1.75rem] uppercase leading-[0.95] mb-5"
              >
                {step.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-white/60 text-[0.95rem] leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUÉ ESPERAR ───────────────────────────────────────────────── */}
      <section ref={expectRef} className="bg-[#191919]" style={{ padding: '8rem clamp(1.5rem,5vw,4rem)' }}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-2 bg-[#F1B91E]" />
          <span className="section-label">Tu Primer Día</span>
        </div>

        <h2
          style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
          className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.9] uppercase mb-20"
        >
          SIN SORPRESAS.{' '}
          <span className="text-[#F1B91E]" style={{ fontStyle: 'italic', textTransform: 'none' }}>
            Sin letra pequeña.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12 max-w-5xl">
          {EXPECT.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={expectInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: brandEase }}
            >
              <div className="h-[1px] bg-[#F1B91E]/40 mb-8" />
              <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-[1.4rem] uppercase mb-4">
                {item.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-white/60 text-[0.95rem] leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FORM ──────────────────────────────────────────────────────── */}
      <section id="solicitar" ref={formRef} className="bg-[#111111] border-t border-white/5" style={{ padding: '8rem clamp(1.5rem,5vw,4rem) 10rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">
          {/* Left: headline + WhatsApp */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-2 bg-[#F1B91E]" />
              <span className="section-label">Solicitar</span>
            </div>
            <h2
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.88] uppercase mb-10"
            >
              PIDE TU
              <br />
              <span className="text-[#F1B91E]" style={{ fontStyle: 'italic', textTransform: 'none' }}>
                Día de prueba.
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }} className="text-white/65 text-base leading-relaxed mb-12 max-w-md">
              Te contestamos, activamos tu acceso y tienes 7 días para venir a entrenar.
              Si lo prefieres, escríbenos directamente por WhatsApp.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTrialEvent('whatsapp_form_section')}
              className="inline-flex items-center gap-3 border border-white/20 text-white/75 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-all duration-300"
              style={{ padding: '1rem 1.75rem' }}
            >
              <WhatsAppIcon />
              <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[0.75rem] tracking-[0.25em] uppercase">
                WhatsApp · 622 443 495
              </span>
            </a>
          </div>

          {/* Right: form card — styled to match ContactModal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: brandEase }}
            className="bg-[#1A1A1A] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="h-[3px] bg-[#F1B91E] w-full" />

            <div style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}>
              {state === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: brandEase }}
                >
                  <div className="h-[3px] bg-[#F1B91E] w-12 mb-8" />
                  <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-[2.2rem] uppercase leading-none mb-6">
                    HECHO.
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/70 text-[0.95rem] leading-relaxed mb-4">
                    Tu solicitud está enviada. Te escribimos en breve para confirmar y activar tu acceso de prueba.
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/50 text-[0.85rem] leading-relaxed">
                    Desde la activación tienes 7 días para venir. Trae ropa de entrenar y agua. Del resto nos ocupamos nosotros.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label
                        htmlFor="nombre"
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                        className={labelClass}
                      >
                        Nombre *
                      </label>
                      <input
                        id="nombre" name="nombre" type="text" required
                        value={form.nombre} onChange={handleChange}
                        placeholder="Tu nombre"
                        className={inputClass}
                        style={{ fontFamily: 'var(--font-inter)', padding: '1rem 1.25rem' }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="telefono"
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                        className={labelClass}
                      >
                        Teléfono *
                      </label>
                      <input
                        id="telefono" name="telefono" type="tel" required
                        value={form.telefono} onChange={handleChange}
                        placeholder="600 000 000"
                        className={inputClass}
                        style={{ fontFamily: 'var(--font-inter)', padding: '1rem 1.25rem' }}
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                      className={labelClass}
                    >
                      Email
                    </label>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      placeholder="tu@email.com"
                      className={inputClass}
                      style={{ fontFamily: 'var(--font-inter)', padding: '1rem 1.25rem' }}
                    />
                  </div>

                  <div className="mb-10">
                    <label
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                      className="block text-[0.75rem] tracking-[.18em] uppercase text-white/40 mb-4"
                    >
                      Me interesa
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {INTERES_OPTIONS.map(opt => {
                        const active = form.interes === opt
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, interes: opt }))}
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
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="mensaje"
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                      className={labelClass}
                    >
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="mensaje" name="mensaje" rows={3}
                      value={form.mensaje} onChange={handleChange}
                      placeholder="Cuéntanos tu situación si quieres — nivel, objetivos, lesiones..."
                      className={`${inputClass} resize-none`}
                      style={{ fontFamily: 'var(--font-inter)', padding: '1rem 1.25rem' }}
                    />
                  </div>

                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/35 text-[0.75rem] leading-relaxed mb-8">
                    Al enviar, aceptas que tratemos tus datos para gestionar tu día de prueba.{' '}
                    <a href="/privacidad" className="text-white/55 underline hover:text-[#F1B91E] transition-colors">Política de privacidad</a>.
                  </p>

                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="w-full bg-[#F1B91E] text-[#191919] flex items-center justify-center gap-3 hover:bg-[#C99200] transition-all duration-200 disabled:opacity-60 cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      padding: '1.25rem 2rem',
                    }}
                  >
                    {state === 'submitting' ? 'Enviando…' : 'Enviar Solicitud'}
                    <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>

                  {state === 'error' && (
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-[#F1B91E] text-[0.85rem] mt-4">
                      No se pudo enviar. Inténtalo de nuevo o escríbenos por WhatsApp.
                    </p>
                  )}
                </form>
              )}

              {state !== 'success' && (
                <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackTrialEvent('whatsapp_form_card')}
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
                    O escríbenos por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
