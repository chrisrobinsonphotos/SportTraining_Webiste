'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const INTERES_OPTIONS = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'Eventos de HYROX', label: 'Eventos de HYROX' },
  { value: 'Sport Training', label: 'Sport Training' },
]

const inputClass =
  'w-full bg-[#1a1a1a] border-0 border-b border-white/20 px-4 py-3 text-white text-base placeholder-white/25 focus:outline-none focus:border-[#F1B91E] transition-colors duration-200'

const labelClass =
  'block text-[10px] tracking-[0.25em] uppercase mb-2'

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: '',
    subscribe: false,
  })
  const [state, setState] = useState<FormState>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setState('success')
        setForm({ nombre: '', email: '', telefono: '', interes: '', mensaje: '', subscribe: false })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 py-12"
      >
        <div className="w-12 h-12 border border-[#F1B91E] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#F1B91E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
          className="text-[32px] uppercase text-white leading-tight"
        >
          Mensaje enviado.
        </h3>
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }} className="text-white/45 text-[15px]">
          Nos pondremos en contacto contigo en breve.
        </p>
        <button
          onClick={() => setState('idle')}
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
          className="mt-2 text-[11px] tracking-[0.2em] uppercase text-[#F1B91E] hover:text-white transition-colors duration-200"
        >
          Enviar otro mensaje →
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {/* Row 1: Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}
            className={labelClass}>
            Nombre *
          </label>
          <input id="nombre" name="nombre" type="text" required
            value={form.nombre} onChange={handleChange} placeholder="Tu nombre"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className={inputClass} />
        </div>
        <div>
          <label htmlFor="email"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}
            className={labelClass}>
            Email *
          </label>
          <input id="email" name="email" type="email" required
            value={form.email} onChange={handleChange} placeholder="tu@email.com"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className={inputClass} />
        </div>
      </div>

      {/* Row 2: Teléfono + Me Interesa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="telefono"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}
            className={labelClass}>
            Teléfono
          </label>
          <input id="telefono" name="telefono" type="tel"
            value={form.telefono} onChange={handleChange} placeholder="6XX XXX XXX"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className={inputClass} />
        </div>
        <div>
          <label htmlFor="interes"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}
            className={labelClass}>
            Me interesa
          </label>
          <select id="interes" name="interes"
            value={form.interes} onChange={handleChange}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className={`${inputClass} appearance-none cursor-pointer`}>
            {INTERES_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} style={{ background: '#1a1a1a' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje"
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}
          className={labelClass}>
          Mensaje
        </label>
        <textarea id="mensaje" name="mensaje" rows={5}
          value={form.mensaje} onChange={handleChange}
          placeholder="Cuéntanos qué buscas..."
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, resize: 'none', minHeight: '128px' }}
          className={inputClass} />
      </div>

      {/* Newsletter checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group mt-2">
        <div className="relative flex-shrink-0 mt-0.5">
          <input type="checkbox" name="subscribe"
            checked={form.subscribe} onChange={handleChange}
            className="sr-only" />
          <div className={`w-4 h-4 border transition-colors duration-200 flex items-center justify-center ${
            form.subscribe ? 'border-[#F1B91E] bg-[#F1B91E]' : 'border-white/20 group-hover:border-white/40'
          }`}>
            {form.subscribe && (
              <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="square" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-200 leading-snug">
          Quiero recibir novedades de Sport Training
        </span>
      </label>

      {state === 'error' && (
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-red-400 text-sm">
          Algo ha fallado. Inténtalo de nuevo o escríbenos por WhatsApp.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === 'submitting'}
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
        className={`w-full py-4 text-sm tracking-widest uppercase transition-all duration-200 mt-2 ${
          state === 'submitting'
            ? 'bg-white/10 text-white/30 cursor-not-allowed'
            : 'bg-[#F1B91E] text-black hover:bg-white cursor-pointer'
        }`}
      >
        {state === 'submitting' ? 'Enviando...' : 'Enviar mensaje →'}
      </button>

    </form>
  )
}
