'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const brandEase = [0.16, 1, 0.3, 1] as const

/* ─── The 7 fundamental human movement patterns ─── */
const patterns = [
  { num: '01', name: 'Sentadilla', en: 'Squat', desc: 'Sentarte y levantarte, agacharte a recoger algo. El patrón que repites cien veces al día sin pensarlo.' },
  { num: '02', name: 'Bisagra de Cadera', en: 'Hinge', desc: 'Levantar peso del suelo con seguridad. La cadena posterior que protege tu espalda toda la vida.' },
  { num: '03', name: 'Zancada', en: 'Lunge', desc: 'Un pie delante del otro: subir escaleras, caminar, correr. Fuerza y equilibrio sobre una sola pierna.' },
  { num: '04', name: 'Empuje', en: 'Push', desc: 'Alejar peso de ti, horizontal o por encima de la cabeza. Pecho, hombros y core como una sola unidad.' },
  { num: '05', name: 'Tracción', en: 'Pull', desc: 'Atraer peso hacia ti. La espalda fuerte que sostiene una postura sana hora tras hora.' },
  { num: '06', name: 'Rotación', en: 'Rotation', desc: 'Girar y, sobre todo, resistir el giro. La potencia y la protección de la columna nacen del core.' },
  { num: '07', name: 'Locomoción', en: 'Gait / Carry', desc: 'Desplazarte y transportar carga. Caminar, correr, cargar con la compra: el movimiento más humano que existe.' },
]

/* ─── Joint-by-joint model (Cook / Boyle) — alternating mobility & stability ─── */
const joints = [
  { name: 'Tobillo', need: 'Movilidad' as const },
  { name: 'Rodilla', need: 'Estabilidad' as const },
  { name: 'Cadera', need: 'Movilidad' as const },
  { name: 'Zona lumbar', need: 'Estabilidad' as const },
  { name: 'Columna torácica', need: 'Movilidad' as const },
  { name: 'Hombro', need: 'Movilidad' as const },
]

/* ─── Longevity science — real, attributed findings ─── */
const longevity = [
  {
    stat: '3–8%',
    label: 'de masa muscular perdida por década a partir de los 30 — y el ritmo se acelera tras los 60. El entrenamiento de fuerza es lo único que demuestra revertirlo.',
    source: 'Sarcopenia · consenso EWGSOP',
  },
  {
    stat: '+16%',
    label: 'más riesgo de mortalidad por cada 5 kg menos de fuerza de agarre. El agarre es uno de los predictores de longevidad más fiables que existen.',
    source: 'Estudio PURE · The Lancet (2015)',
  },
  {
    stat: '×2',
    label: 'casi el doble de riesgo de mortalidad si no puedes mantener el equilibrio sobre una pierna durante 10 segundos en la mediana edad.',
    source: 'Araujo et al. · Br J Sports Med (2022)',
  },
  {
    stat: 'VO₂máx',
    label: 'una capacidad cardiorrespiratoria baja se asoció con un riesgo de mortalidad comparable o superior al de la diabetes o el tabaquismo.',
    source: 'Mandsager et al. · JAMA Netw Open (2018)',
  },
]

/* ─── Benefits ─── */
const benefits = [
  { name: 'Fuerza aplicable', desc: 'Fuerza que sirve fuera del gimnasio: en el trabajo, en el deporte, en casa.' },
  { name: 'Menos lesiones', desc: 'Patrones bien ejecutados y articulaciones móviles reparten la carga y protegen las zonas débiles.' },
  { name: 'Postura y movilidad', desc: 'Recuperas el rango que el sedentarismo te ha quitado y lo mantienes con control.' },
  { name: 'Salud metabólica', desc: 'Más músculo activo mejora la sensibilidad a la insulina y el gasto energético en reposo.' },
  { name: 'Equilibrio y coordinación', desc: 'El sistema nervioso aprende a producir y a frenar fuerza con precisión.' },
  { name: 'Independencia', desc: 'Llegar a mayor con la capacidad de moverte, cargar y valerte por ti mismo.' },
]

function Eyebrow({ label, inView }: { label: string; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [...brandEase] }}
      className="flex items-center gap-3 mb-8"
    >
      <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
      <span className="section-label">{label}</span>
    </motion.div>
  )
}

export default function EntrenamientoFuncional() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroIn = useInView(heroRef, { once: true, amount: 0.2 })
  const queRef = useRef<HTMLDivElement>(null)
  const queIn = useInView(queRef, { once: true, margin: '-80px' })
  const patRef = useRef<HTMLDivElement>(null)
  const patIn = useInView(patRef, { once: true, margin: '-80px' })
  const movRef = useRef<HTMLDivElement>(null)
  const movIn = useInView(movRef, { once: true, margin: '-80px' })
  const lonRef = useRef<HTMLDivElement>(null)
  const lonIn = useInView(lonRef, { once: true, margin: '-80px' })
  const benRef = useRef<HTMLDivElement>(null)
  const benIn = useInView(benRef, { once: true, margin: '-80px' })
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaIn = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight: '82vh', backgroundColor: '#0a0a0a', scrollMarginTop: '90px' }}
      >
        <div className="absolute inset-0">
          <Image src="/gym-functional.jpg" alt="Entrenamiento funcional en Sport Training Murcia" fill sizes="100vw" className="object-cover object-center" priority quality={88} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0.5) 45%, transparent 80%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0a0a0a 4%, transparent 55%)' }} />
        </div>

        <div className="relative z-10 w-full" style={{ padding: 'var(--section-pad-y-hero) var(--section-pad-x) var(--section-pad-y)' }}>
          <div className="st-container">
            <Eyebrow label="Funcional · Movilidad · Longevidad" inView={heroIn} />
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={heroIn ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [...brandEase] }}
                className="text-white uppercase"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-display)', lineHeight: 0.85, letterSpacing: '-0.03em' }}
              >
                Cuerpos
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.span
                initial={{ y: 120, opacity: 0 }}
                animate={heroIn ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.18, ease: [...brandEase] }}
                className="block italic"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-display)', lineHeight: 0.85, letterSpacing: '-0.03em', color: '#F1B91E' }}
              >
                capaces.
              </motion.span>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={heroIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.34, ease: [...brandEase] }}
              className="t-lead text-white/80"
              style={{ maxWidth: '52ch' }}
            >
              El entrenamiento funcional no persigue el músculo aislado: persigue el movimiento real
              — empujar, levantar, girar, cargar, mantener el equilibrio. Fuerza que se traduce en vida,
              hoy y dentro de cuarenta años.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [...brandEase] }}
              className="mt-10"
            >
              <button data-contact className="group inline-flex items-center gap-3" style={{ background: '#F1B91E', color: '#191919', padding: '1rem 1.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'var(--fs-label)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Pide tu Día de Prueba</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ¿QUÉ ES? ═══════════════ */}
      <section ref={queRef} style={{ backgroundColor: '#111111', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <Eyebrow label="El Concepto" inView={queIn} />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={queIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-6"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
          >
            Entrenas movimientos,{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>no músculos.</span>
          </motion.h2>
          <div className="grid gap-x-16 gap-y-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={queIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
              className="t-lead text-white/70"
            >
              Una máquina aísla un músculo y lo trabaja en una sola dirección. La vida no funciona así.
              Coger a un niño en brazos, mover un sofá o levantarte del suelo son acciones de cuerpo entero,
              en varios planos y a la vez.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={queIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [...brandEase] }}
              className="t-body text-white/60"
            >
              El entrenamiento funcional entrena esos gestos completos. Coordina fuerza, equilibrio y control
              en patrones que tu cuerpo ya usa cada día — para que rindas mejor dentro y, sobre todo, fuera del gimnasio.
              Es la diferencia entre un cuerpo que posa y un cuerpo que es capaz.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 7 MOVEMENT PATTERNS ═══════════════ */}
      <section ref={patRef} style={{ backgroundColor: '#0a0a0a', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <Eyebrow label="Patrones de Movimiento" inView={patIn} />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={patIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-4"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
          >
            Siete patrones.{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>todo el movimiento humano.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={patIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
            className="t-body text-white/60 mb-16"
            style={{ maxWidth: '58ch' }}
          >
            Cualquier cosa que hace tu cuerpo es una combinación de estos siete gestos. Domínalos
            y dominas el movimiento — no piezas sueltas, sino el sistema completo.
          </motion.p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
            {patterns.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                animate={patIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease: [...brandEase] }}
                className="flex flex-col"
                style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(1.5rem,2vw,2rem)' }}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h2)', lineHeight: 1 }} className="text-white/15">{p.num}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-small)' }} className="text-[#F1B91E]/70">{p.en}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h3)', textTransform: 'uppercase', lineHeight: 1.05 }} className="text-white mb-3">{p.name}</h3>
                <div className="bg-[#F1B91E]/50 mb-3" style={{ height: 2, width: 32 }} />
                <p className="t-small text-white/60">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FULL-BLEED IMAGE BAND ═══════════════ */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(280px, 38vh, 460px)' }}>
        <Image src="/funcional-wallball.jpg" alt="Movimiento funcional en Sport Training Murcia" fill sizes="100vw" className="object-cover object-center" quality={85} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0a0a0a 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0.55) 100%)' }} />
      </section>

      {/* ═══════════════ MOVILIDAD — joint by joint ═══════════════ */}
      <section ref={movRef} style={{ backgroundColor: '#111111', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <Eyebrow label="Movilidad" inView={movIn} />
          <div className="grid gap-x-20 gap-y-12 items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={movIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
                className="text-white uppercase mb-6"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
              >
                Rango con{' '}
                <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>control.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={movIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
                className="t-lead text-white/70 mb-5"
              >
                Flexibilidad es cuánto estiras de forma pasiva. Movilidad es cuánto rango puedes usar
                con fuerza y control. Solo el segundo te sirve para moverte y rendir.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={movIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: [...brandEase] }}
                className="t-body text-white/60"
              >
                El cuerpo alterna articulaciones que necesitan moverse y articulaciones que necesitan
                estabilidad. Cuando una pierde su función, la de al lado compensa — y se lesiona. La movilidad
                mantiene toda la cadena en orden, de los tobillos a los hombros.
              </motion.p>
            </div>

            {/* Joint-by-joint chain */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={movIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [...brandEase] }}
              className="flex flex-col"
              style={{ gap: '2px' }}
            >
              {joints.map((j) => {
                const mobile = j.need === 'Movilidad'
                return (
                  <div
                    key={j.name}
                    className="flex items-center justify-between"
                    style={{ backgroundColor: '#0a0a0a', borderLeft: `3px solid ${mobile ? '#F1B91E' : 'rgba(255,255,255,0.25)'}`, padding: '0.9rem 1.25rem' }}
                  >
                    <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 'var(--fs-h3)', textTransform: 'uppercase' }} className="text-white">{j.name}</span>
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'var(--fs-label)', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                      className={mobile ? 'text-[#F1B91E]' : 'text-white/40'}
                    >
                      {j.need}
                    </span>
                  </div>
                )
              })}
              <p className="t-small text-white/40 mt-4">Modelo articulación-por-articulación (Cook · Boyle).</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LONGEVIDAD — the science ═══════════════ */}
      <section ref={lonRef} style={{ backgroundColor: '#0a0a0a', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <Eyebrow label="Longevidad" inView={lonIn} />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={lonIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-4"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
          >
            Fuerte a los 40.{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>capaz a los 90.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={lonIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
            className="t-body text-white/60 mb-16"
            style={{ maxWidth: '60ch' }}
          >
            No entrenas solo para hoy. Entrenas para tu <span className="text-white/90">healthspan</span> — los años
            que vivirás siendo capaz, no solo estando vivo. Y la ciencia es contundente: la fuerza, el equilibrio
            y la capacidad cardiorrespiratoria están entre los mejores predictores de cuánto y cómo vivirás.
          </motion.p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
            {longevity.map((l, i) => (
              <motion.div
                key={l.stat}
                initial={{ opacity: 0, y: 30 }}
                animate={lonIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [...brandEase] }}
                className="flex flex-col"
                style={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(1.75rem,2.2vw,2.25rem)' }}
              >
                <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.95, letterSpacing: '-0.02em' }} className="text-[#F1B91E] mb-4">{l.stat}</span>
                <p className="t-small text-white/70 mb-5">{l.label}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-label)' }} className="text-white/35 mt-auto">{l.source}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={lonIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [...brandEase] }}
            className="t-body text-white/55 mt-12"
            style={{ maxWidth: '64ch' }}
          >
            Entrena hoy para las tareas físicas que querrás hacer a los 90: levantarte del suelo sin ayuda,
            cargar con la compra, jugar con tus nietos. Eso es, exactamente, entrenar para la vida.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ BENEFICIOS ═══════════════ */}
      <section ref={benRef} style={{ backgroundColor: '#111111', padding: 'var(--section-pad-y) var(--section-pad-x)' }}>
        <div className="st-container">
          <Eyebrow label="Por qué funciona" inView={benIn} />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={benIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-12"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
          >
            Lo que te{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>llevas.</span>
          </motion.h2>
          <div className="grid gap-x-12 gap-y-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 24 }}
                animate={benIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [...brandEase] }}
              >
                <div className="bg-[#F1B91E] mb-4" style={{ height: 2, width: 28 }} />
                <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h3)', textTransform: 'uppercase' }} className="text-white mb-2">{b.name}</h3>
                <p className="t-body text-white/60">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CÓMO LO ENTRENAMOS + CTA ═══════════════ */}
      <section ref={ctaRef} className="relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="absolute inset-0">
          <Image src="/gym-rig.jpg" alt="Instalaciones de entrenamiento funcional en Sport Training Murcia" fill sizes="100vw" className="object-cover object-center" quality={85} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0a0a0a 8%, rgba(10,10,10,0.82) 50%, rgba(10,10,10,0.7) 100%)' }} />
        </div>
        <div className="relative z-10" style={{ padding: 'var(--section-pad-y-hero) var(--section-pad-x)' }}>
          <div className="st-container">
            <Eyebrow label="En Sport Training" inView={ctaIn} />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={ctaIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
              className="text-white uppercase mb-6"
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'var(--fs-h1)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
            >
              Para todos.{' '}
              <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>de verdad.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ctaIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
              className="t-lead text-white/75 mb-10"
              style={{ maxWidth: '54ch' }}
            >
              Cada ejercicio se adapta a tu nivel: del primer día al rendimiento avanzado. Entrenadores que
              corrigen patrón a patrón, progresiones medibles y un objetivo común — que salgas más capaz de
              lo que entraste. Atletas, profesionales con prisa y personas en recuperación, en la misma sala.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [...brandEase] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button data-contact className="group inline-flex items-center gap-3" style={{ background: '#F1B91E', color: '#191919', padding: '1rem 1.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'var(--fs-label)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Pide tu Día de Prueba</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button data-contact className="inline-flex items-center" style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '1rem 1.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 'var(--fs-label)', letterSpacing: '0.25em', textTransform: 'uppercase' }} className="text-white/80">Habla con un entrenador</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
