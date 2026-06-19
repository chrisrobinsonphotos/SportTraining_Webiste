'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const brandEase = [0.16, 1, 0.3, 1] as const

// ── Macronutrient data ──────────────────────────────────────────────
const macros = [
  {
    name: 'PROTEÍNA',
    pct: 30,
    color: '#F1B91E',
    gPerKg: '1.6–2.2 g/kg',
    funcion: 'Síntesis muscular, recuperación post-esfuerzo, mantenimiento de masa magra. La proteína es el macronutriente más saciante y el que mayor efecto térmico genera durante la digestión.',
    fuentes: 'Pollo, pavo, huevos, pescado blanco y azul, legumbres, queso fresco batido, yogur griego natural',
  },
  {
    name: 'CARBOHIDRATOS',
    pct: 45,
    color: '#FFFFFF',
    gPerKg: '3–7 g/kg',
    funcion: 'Combustible primario para esfuerzos de alta intensidad. Rellenan glucógeno muscular y hepático. La cantidad varía según volumen e intensidad del entrenamiento — no es un valor fijo.',
    fuentes: 'Arroz integral, avena, patata, boniato, pan integral, pasta, fruta de temporada, legumbres',
  },
  {
    name: 'GRASAS',
    pct: 25,
    color: 'rgba(255,255,255,0.4)',
    gPerKg: '0.8–1.2 g/kg',
    funcion: 'Producción hormonal (testosterona, estrógenos), absorción de vitaminas liposolubles (A, D, E, K), protección celular. Nunca bajes de 0.8 g/kg — por debajo se compromete la salud hormonal.',
    fuentes: 'Aceite de oliva virgen extra, aguacate, frutos secos, semillas, pescado azul (sardinas, caballa, salmón)',
  },
]

// ── Nutrient timing data ────────────────────────────────────────────
const timeline = [
  {
    label: '3H ANTES',
    time: 'Comida principal',
    que: 'Comida completa con proteína, carbohidratos complejos y vegetales. Ejemplo: arroz con pollo y ensalada, o lentejas con verduras.',
    por_que: 'Permite digestión completa y carga de glucógeno sin molestias gástricas durante el entrenamiento.',
  },
  {
    label: '30–60 MIN ANTES',
    time: 'Pre-entreno',
    que: 'Snack ligero de rápida digestión. Ejemplo: plátano con un puñado de frutos secos, tostada con miel, o un yogur natural con avena.',
    por_que: 'Eleva glucosa en sangre para disponibilidad inmediata sin sobrecargar el sistema digestivo.',
  },
  {
    label: 'ENTRENAMIENTO',
    time: 'Durante',
    que: 'Agua. Si la sesión supera los 75 minutos de alta intensidad: bebida isotónica con 30-60g de carbohidratos/hora.',
    por_que: 'El rendimiento cae un 2-3% por cada 1% de peso corporal perdido en sudoración.',
    highlight: true,
  },
  {
    label: '0–30 MIN DESPUÉS',
    time: 'Post-entreno',
    que: 'Proteína de rápida absorción + carbohidrato simple. Ejemplo: batido de proteína con plátano, o pechuga de pavo con fruta.',
    por_que: 'La ventana anabólica no es de 30 minutos como dice el mito, pero iniciar la recuperación pronto optimiza la síntesis proteica (ISSN, 2017).',
  },
  {
    label: '1–2H DESPUÉS',
    time: 'Comida de recuperación',
    que: 'Comida completa equilibrada. Ejemplo: salmón con boniato y espinacas, o tortilla de patatas con ensalada mediterránea.',
    por_que: 'Completa la reposición de glucógeno y aporta micronutrientes para la recuperación muscular y la reducción de inflamación.',
  },
]

// ── Hydration data ──────────────────────────────────────────────────
const hydration = [
  { momento: 'AL DESPERTAR', ml: '400–500 ml', nota: 'Rehidratación tras 6-8h sin ingesta de líquidos. El cuerpo se despierta en déficit.' },
  { momento: 'PRE-ENTRENO', ml: '400–600 ml', nota: 'En las 2 horas previas. Orina clara = buena hidratación de partida.' },
  { momento: 'DURANTE', ml: '150–250 ml / 15 min', nota: 'Pequeños sorbos frecuentes. No esperes a tener sed — la sed aparece cuando ya has perdido un 1-2% de peso corporal.' },
  { momento: 'POST-ENTRENO', ml: '150% del peso perdido', nota: 'Si perdiste 0.5 kg durante la sesión, bebe 750 ml en las siguientes 2 horas. Añade una pizca de sal si sudaste mucho.' },
]

// ── Principles data ─────────────────────────────────────────────────
const principles = [
  {
    num: '01',
    title: 'CALIDAD ANTES QUE CANTIDAD',
    body: '800 kcal de comida real no equivalen a 800 kcal de ultraprocesados. La procedencia de las calorías determina la respuesta hormonal, la saciedad y la recuperación. Prioriza ingredientes de un solo componente sobre productos con lista de ingredientes.',
  },
  {
    num: '02',
    title: 'PROTEÍNA EN CADA COMIDA',
    body: 'El cuerpo no almacena proteína como almacena grasa o glucógeno. Distribuir la ingesta en 3-5 tomas de 0.3-0.5 g/kg maximiza la síntesis proteica muscular a lo largo del día (ISSN Position Stand, 2017).',
  },
  {
    num: '03',
    title: 'CARBOHIDRATOS SEGÚN DEMANDA',
    body: 'Un día de descanso no necesita la misma carga que un día de doble sesión. Ajusta los hidratos a la actividad real: más los días duros, menos los días suaves. Este enfoque se llama periodización nutricional.',
  },
  {
    num: '04',
    title: 'GRASAS QUE PROTEGEN',
    body: 'Las grasas no son el enemigo. Son esenciales para la producción hormonal y la absorción de vitaminas. La clave está en la fuente: aceite de oliva virgen extra, aguacate, frutos secos y pescado azul. Minimiza ultraprocesados y aceites refinados.',
  },
  {
    num: '05',
    title: 'FIBRA Y MICRONUTRIENTES',
    body: 'La fibra regula la digestión, alimenta la microbiota y mejora la sensibilidad a la insulina. Los micronutrientes (hierro, magnesio, zinc, vitamina D) son los cofactores invisibles del rendimiento. Come variedad de colores y no dependas de suplementos.',
  },
  {
    num: '06',
    title: 'CONSISTENCIA SOBRE PERFECCIÓN',
    body: 'Un plan perfecto que no puedes seguir no vale nada. Un plan bueno que mantienes 6 meses cambia tu composición corporal, tu rendimiento y tu relación con la comida. Busca sostenibilidad, no restricción.',
  },
]

// ── Donut chart SVG ─────────────────────────────────────────────────
function DonutChart() {
  const r = 80
  const cx = 120
  const cy = 120
  const circumference = 2 * Math.PI * r
  const gap = 4
  const totalGap = gap * 3
  const usable = circumference - totalGap

  const proteinArc = (macros[0].pct / 100) * usable
  const carbArc = (macros[1].pct / 100) * usable
  const fatArc = (macros[2].pct / 100) * usable

  const proteinOffset = 0
  const carbOffset = proteinArc + gap
  const fatOffset = carbOffset + carbArc + gap

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[280px] mx-auto">
      {/* Protein segment */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#F1B91E"
        strokeWidth="18"
        strokeDasharray={`${proteinArc} ${circumference - proteinArc}`}
        strokeDashoffset={-proteinOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="butt"
      />
      {/* Carb segment */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
        strokeDasharray={`${carbArc} ${circumference - carbArc}`}
        strokeDashoffset={-carbOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="butt"
      />
      {/* Fat segment */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="18"
        strokeDasharray={`${fatArc} ${circumference - fatArc}`}
        strokeDashoffset={-fatOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="butt"
      />
      {/* Center text */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#F1B91E" fontSize="11" fontWeight="700" letterSpacing="0.15em" style={{ fontFamily: 'var(--font-inter)' }}>
        MACRO
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="white" fontSize="11" fontWeight="700" letterSpacing="0.15em" style={{ fontFamily: 'var(--font-inter)' }}>
        SPLIT
      </text>
    </svg>
  )
}

// ── Plate visual SVG ────────────────────────────────────────────────
function PlateVisual() {
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[320px] mx-auto">
      {/* Plate border */}
      <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Top half — Vegetables */}
      <path d="M 20 150 A 130 130 0 0 1 280 150 L 150 150 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="150" y="90" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="600" letterSpacing="0.1em" style={{ fontFamily: 'var(--font-inter)' }}>
        VERDURAS
      </text>
      <text x="150" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" style={{ fontFamily: 'var(--font-inter)' }}>
        50% del plato
      </text>

      {/* Bottom left — Protein */}
      <path d="M 20 150 A 130 130 0 0 0 150 280 L 150 150 Z" fill="rgba(241,185,30,0.1)" stroke="#F1B91E" strokeWidth="1" strokeOpacity="0.4" />
      <text x="80" y="210" textAnchor="middle" fill="#F1B91E" fontSize="11" fontWeight="600" letterSpacing="0.1em" style={{ fontFamily: 'var(--font-inter)' }}>
        PROTEÍNA
      </text>
      <text x="80" y="228" textAnchor="middle" fill="rgba(241,185,30,0.6)" fontSize="9" style={{ fontFamily: 'var(--font-inter)' }}>
        25% del plato
      </text>

      {/* Bottom right — Complex carbs */}
      <path d="M 150 280 A 130 130 0 0 0 280 150 L 150 150 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="220" y="210" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="600" letterSpacing="0.1em" style={{ fontFamily: 'var(--font-inter)' }}>
        CARBS
      </text>
      <text x="220" y="228" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" style={{ fontFamily: 'var(--font-inter)' }}>
        25% del plato
      </text>
    </svg>
  )
}

// ── Main component ──────────────────────────────────────────────────
export default function NutricionAlimentacion() {
  const heroRef = useRef<HTMLDivElement>(null)
  const macroRef = useRef<HTMLDivElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const timingRef = useRef<HTMLDivElement>(null)
  const hydrationRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, margin: '-60px' })
  const macroInView = useInView(macroRef, { once: true, margin: '-80px' })
  const plateInView = useInView(plateRef, { once: true, margin: '-80px' })
  const timingInView = useInView(timingRef, { once: true, margin: '-80px' })
  const hydrationInView = useInView(hydrationRef, { once: true, margin: '-80px' })
  const principlesInView = useInView(principlesRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  const [activeTimeline, setActiveTimeline] = useState<number | null>(null)

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0a0a0a', padding: 'clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,4rem) clamp(4rem,8vh,7rem)' }}
      >
        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[0.75rem] tracking-[0.25em] uppercase"
            >
              Alimentación
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [...brandEase] }}
              className="text-white uppercase"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(4rem,9vw,8.5rem)',
                lineHeight: '0.88',
                letterSpacing: '-0.02em',
              }}
            >
              LA BASE
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.17, ease: [...brandEase] }}
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 800,
                fontSize: 'clamp(4rem,9vw,8.5rem)',
                lineHeight: '0.88',
                letterSpacing: '-0.02em',
                color: '#F1B91E',
                fontStyle: 'italic',
                textTransform: 'none',
              }}
            >
              real.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [...brandEase] }}
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-white/70 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] max-w-[52ch]"
          >
            Ningún plan de entrenamiento compensa una alimentación deficiente. Lo que comes determina cómo entrenas, cómo te recuperas y cómo rindes. Antes de hablar de suplementos, periodización o carga — la base es la comida. Cuerpos que rinden, no cuerpos que posan.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — MACRONUTRIENT BREAKDOWN
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={macroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#111111', padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={macroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[0.75rem] tracking-[0.25em] uppercase"
            >
              Macronutrientes
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={macroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-4"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem,5.5vw,5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
            }}
          >
            LOS TRES PILARES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={macroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/60 text-[0.95rem] leading-[1.6] max-w-[56ch] mb-16"
          >
            Proteínas, carbohidratos y grasas. Cada uno cumple una función específica. Ninguno es prescindible. Las proporciones se ajustan según tu objetivo, tu volumen de entrenamiento y tu composición corporal actual.
          </motion.p>

          {/* Chart + cards layout */}
          <div className="grid gap-12 items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {/* Donut chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={macroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [...brandEase] }}
              className="flex flex-col items-center"
              style={{ padding: '2rem 0' }}
            >
              <DonutChart />
              <div className="flex gap-6 mt-8">
                {macros.map((m) => (
                  <div key={m.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: m.color }} />
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-white/70 text-[0.7rem] tracking-[0.1em] uppercase">
                      {m.pct}% {m.name.split('Í')[0].toLowerCase()}{m.name.includes('Í') ? 'í' + m.name.split('Í')[1].toLowerCase() : ''}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Macro cards */}
            <div className="flex flex-col gap-[2px]">
              {macros.map((macro, i) => (
                <motion.div
                  key={macro.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={macroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [...brandEase] }}
                  className="group"
                  style={{
                    backgroundColor: '#191919',
                    padding: '1.75rem 2rem',
                    borderLeft: `3px solid ${macro.color}`,
                  }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h3
                      style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                      className="text-white text-[1.4rem] uppercase tracking-wide"
                    >
                      {macro.name}
                    </h3>
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: macro.name === 'PROTEÍNA' ? '#F1B91E' : 'rgba(255,255,255,0.5)' }}
                      className="text-[0.8rem] tracking-[0.12em]"
                    >
                      {macro.gPerKg}
                    </span>
                  </div>
                  <p
                    style={{ fontFamily: 'var(--font-inter)' }}
                    className="text-white/65 text-[0.9rem] leading-[1.6] mb-3"
                  >
                    {macro.funcion}
                  </p>
                  <div className="flex items-start gap-2">
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-[#F1B91E] text-[0.7rem] tracking-[0.15em] uppercase flex-shrink-0 mt-[2px]">
                      Fuentes
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/50 text-[0.85rem] leading-[1.5]">
                      {macro.fuentes}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={macroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/30 text-[0.75rem] leading-[1.5] mt-10 max-w-[70ch]"
          >
            Valores orientativos para atletas de entrenamiento funcional de intensidad moderada-alta, basados en las posiciones de la ISSN (International Society of Sports Nutrition). Los rangos se ajustan individualmente según peso, composición corporal, fase de entrenamiento y objetivos.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — TRAINING DAY PLATE
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={plateRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0a0a0a', padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={plateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[0.75rem] tracking-[0.25em] uppercase"
            >
              En la práctica
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={plateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-16"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem,5.5vw,5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
            }}
          >
            CÓMO COME{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              un atleta.
            </span>
          </motion.h2>

          <div className="grid gap-16 items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {/* Plate SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={plateInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [...brandEase] }}
            >
              <PlateVisual />
              <p
                style={{ fontFamily: 'var(--font-inter)' }}
                className="text-white/40 text-[0.8rem] leading-[1.5] text-center mt-6 max-w-[32ch] mx-auto"
              >
                Modelo de plato funcional. Mitad vegetales, cuarto proteína, cuarto carbohidratos complejos.
              </p>
            </motion.div>

            {/* Day comparison columns */}
            <div className="grid grid-cols-2 gap-[2px]">
              {/* Training day */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={plateInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: [...brandEase] }}
                style={{ backgroundColor: '#111111', padding: '2rem 1.5rem' }}
              >
                <div className="w-full h-[3px] bg-[#F1B91E] mb-5" />
                <h4
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className="text-white text-[1.1rem] uppercase tracking-wide mb-1"
                >
                  Día de entrenamiento
                </h4>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[#F1B91E] text-[0.75rem] tracking-[0.1em] mb-5">
                  CARBOS ALTOS · PROTEÍNA ALTA
                </p>

                <div className="space-y-4">
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Desayuno
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Avena con plátano, nueces y proteína whey. Café solo.
                    </p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Comida
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Arroz integral con pechuga de pollo a la plancha, ensalada con AOVE y una pieza de fruta.
                    </p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Post-entreno
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Tortilla francesa con boniato asado y espinacas salteadas.
                    </p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Cena
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Salmón al horno con patatas y verduras asadas. Yogur griego natural.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Rest day */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={plateInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [...brandEase] }}
                style={{ backgroundColor: '#111111', padding: '2rem 1.5rem' }}
              >
                <div className="w-full h-[3px] bg-white/20 mb-5" />
                <h4
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className="text-white text-[1.1rem] uppercase tracking-wide mb-1"
                >
                  Día de descanso
                </h4>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-white/40 text-[0.75rem] tracking-[0.1em] mb-5">
                  CARBOS MODERADOS · GRASAS ARRIBA
                </p>

                <div className="space-y-4">
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Desayuno
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Huevos revueltos con aguacate y tomate. Pan integral con AOVE.
                    </p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Comida
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Lentejas estofadas con verduras, una rodaja de pan y ensalada verde.
                    </p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Merienda
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Queso fresco batido con frutos secos y una manzana.
                    </p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-white/50 text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                      Cena
                    </span>
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/75 text-[0.85rem] leading-[1.5]">
                      Merluza a la plancha con espárragos y champiñones. Infusión.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — NUTRIENT TIMING
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={timingRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#111111', padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={timingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[0.75rem] tracking-[0.25em] uppercase"
            >
              Timing nutricional
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={timingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-6"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem,5.5vw,5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
            }}
          >
            CUÁNDO IMPORTA{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              tanto como qué.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={timingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/60 text-[0.95rem] leading-[1.6] max-w-[56ch] mb-16"
          >
            No se trata de obsesionarse con el reloj. Pero distribuir la ingesta alrededor del entrenamiento tiene un impacto medible en rendimiento y recuperación. Esto es lo que dice la evidencia.
          </motion.p>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal line — desktop */}
            <div className="hidden md:block absolute top-[24px] left-0 right-0 h-[2px] bg-white/10" />

            <div className="grid gap-[2px] md:grid-cols-5">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={timingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [...brandEase] }}
                  className="relative cursor-pointer group"
                  style={{
                    backgroundColor: item.highlight ? 'rgba(241,185,30,0.06)' : '#191919',
                    padding: '1.75rem 1.25rem',
                    borderTop: item.highlight ? '3px solid #F1B91E' : '3px solid rgba(255,255,255,0.08)',
                    transition: 'border-color 0.3s ease, background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    setActiveTimeline(i)
                    if (!item.highlight) {
                      e.currentTarget.style.borderTopColor = '#F1B91E'
                      e.currentTarget.style.backgroundColor = 'rgba(241,185,30,0.03)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    setActiveTimeline(null)
                    if (!item.highlight) {
                      e.currentTarget.style.borderTopColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.backgroundColor = '#191919'
                    }
                  }}
                >
                  {/* Marker dot */}
                  <div className="hidden md:block absolute -top-[6px] left-1/2 -translate-x-1/2">
                    <div
                      className="w-[10px] h-[10px]"
                      style={{ backgroundColor: item.highlight ? '#F1B91E' : 'rgba(255,255,255,0.25)' }}
                    />
                  </div>

                  <span
                    style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                    className={`text-[0.8rem] uppercase tracking-[0.12em] block mb-1 ${item.highlight ? 'text-[#F1B91E]' : 'text-white/60'}`}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                    className="text-white/40 text-[0.7rem] tracking-[0.1em] uppercase block mb-4"
                  >
                    {item.time}
                  </span>

                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/70 text-[0.85rem] leading-[1.55] mb-3">
                    {item.que}
                  </p>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: activeTimeline === i ? '120px' : '0px',
                      opacity: activeTimeline === i ? 1 : 0,
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/45 text-[0.8rem] leading-[1.5] italic border-l-2 border-[#F1B91E]/30 pl-3">
                      {item.por_que}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — HYDRATION
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={hydrationRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0a0a0a', padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hydrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[0.75rem] tracking-[0.25em] uppercase"
            >
              Hidratación
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={hydrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-6"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem,5.5vw,5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
            }}
          >
            EL NUTRIENTE{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              olvidado.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hydrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/60 text-[0.95rem] leading-[1.6] max-w-[56ch] mb-16"
          >
            Una deshidratación del 2-3% del peso corporal reduce la fuerza, la resistencia y la capacidad cognitiva de forma medible. En Murcia, con temperaturas que superan los 35 grados en verano, la hidratación no es opcional — es la primera línea de rendimiento.
          </motion.p>

          <div className="grid gap-[2px] md:grid-cols-2 lg:grid-cols-4">
            {hydration.map((h, i) => (
              <motion.div
                key={h.momento}
                initial={{ opacity: 0, y: 40 }}
                animate={hydrationInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [...brandEase] }}
                className="relative group"
                style={{ backgroundColor: '#111111', padding: '2rem 1.5rem' }}
              >
                {/* Progress fill bar */}
                <div className="absolute left-0 bottom-0 w-full" style={{ height: `${20 + i * 20}%`, backgroundColor: 'rgba(241,185,30,0.04)', transition: 'height 0.6s ease' }} />

                <div className="relative z-10">
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                    className="text-[#F1B91E] text-[0.65rem] tracking-[0.2em] uppercase block mb-2"
                  >
                    {h.momento}
                  </span>
                  <span
                    style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                    className="text-white text-[1.6rem] uppercase block mb-4"
                  >
                    {h.ml}
                  </span>
                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/55 text-[0.85rem] leading-[1.55]">
                    {h.nota}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance impact callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hydrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [...brandEase] }}
            className="mt-[2px] flex items-start gap-4"
            style={{ backgroundColor: 'rgba(241,185,30,0.04)', padding: '1.5rem 2rem', borderLeft: '3px solid #F1B91E' }}
          >
            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-[#F1B91E] text-[1.4rem] flex-shrink-0">
              -2%
            </span>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/60 text-[0.9rem] leading-[1.55]">
              Con solo un 2% de deshidratación (1.5 kg en un atleta de 75 kg), la potencia aeróbica cae, la percepción de esfuerzo aumenta y la capacidad de termorregulación se deteriora. Según la ACSM (American College of Sports Medicine), las pérdidas superiores al 2% del peso corporal afectan directamente al rendimiento en ejercicio de resistencia y fuerza.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — KEY PRINCIPLES
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={principlesRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#111111', padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [...brandEase] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-[10px] h-[10px] bg-[#F1B91E] flex-shrink-0" />
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
              className="text-[#F1B91E] text-[0.75rem] tracking-[0.25em] uppercase"
            >
              Principios
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
            className="text-white uppercase mb-16"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem,5.5vw,5rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
            }}
          >
            LO QUE{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              no cambia.
            </span>
          </motion.h2>

          <div className="grid gap-[2px] md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 40 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: [...brandEase] }}
                className="group"
                style={{
                  backgroundColor: '#191919',
                  padding: '2.5rem 2rem',
                  transition: 'background-color 0.4s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d1d1d' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#191919' }}
              >
                <span
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontStyle: 'italic' }}
                  className="text-[#F1B91E] text-[1.8rem] block mb-4 group-hover:translate-x-1 transition-transform duration-300"
                >
                  {p.num}
                </span>
                <h3
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className="text-white text-[1.2rem] uppercase tracking-wide mb-3 leading-tight"
                >
                  {p.title}
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-inter)' }}
                  className="text-white/60 text-[0.88rem] leading-[1.6]"
                >
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — CTA
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0a0a0a', padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
          className="max-w-[1200px] mx-auto text-center"
        >
          <h2
            className="text-white uppercase mb-6"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem,4.5vw,4rem)',
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
            }}
          >
            LISTO PARA CAMBIAR{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              tu alimentación.
            </span>
          </h2>

          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/50 text-[1rem] leading-[1.7] mb-10 max-w-[600px] mx-auto"
          >
            Trabajamos contigo un plan nutricional integrado con tu entrenamiento. Sin dietas genéricas, sin restricciones absurdas. Comida real, resultados reales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* Primary CTA */}
            <button
              data-contact
              className="inline-flex items-center gap-3 bg-[#F1B91E] text-[#0a0a0a] hover:bg-[#d9a61a] transition-colors duration-300 group"
              style={{ padding: '1rem 2.5rem' }}
            >
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[0.75rem] tracking-[0.2em] uppercase"
              >
                Consulta nutricional
              </span>
              <svg className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-transparent text-white/70 border border-white/15 hover:border-[#F1B91E]/50 hover:text-white transition-all duration-300 group"
              style={{ padding: '1rem 2.5rem' }}
            >
              <svg className="w-[16px] h-[16px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[0.75rem] tracking-[0.2em] uppercase"
              >
                WhatsApp
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
