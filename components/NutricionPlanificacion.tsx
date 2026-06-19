'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const brandEase = [0.16, 1, 0.3, 1] as const

// ── Types ──────────────────────────────────────────────────────────
type MealSlot = { meal: string; example?: string }
type DayPlan = {
  name: string
  short: string
  isTraining: boolean
  slots: MealSlot[]
}

type Phase = {
  id: string
  title: string
  color: string
  kcalLabel: string
  macros: { protein: number; carbs: number; fat: number }
  duration: string
  keyFoods: string[]
  description: string
}

type BatchStep = {
  num: number
  title: string
  time: string
  tips: string[]
}

type Mistake = {
  title: string
  why: string
  fix: string
}

// ── Data ───────────────────────────────────────────────────────────
const weekPlan: DayPlan[] = [
  {
    name: 'Lunes', short: 'L', isTraining: true,
    slots: [
      { meal: 'Desayuno', example: 'Avena con plátano, nueces y whey' },
      { meal: 'Media mañana' },
      { meal: 'Comida', example: 'Arroz, pechuga a la plancha, verduras salteadas' },
      { meal: 'Merienda' },
      { meal: 'Cena', example: 'Tortilla de claras con espinacas, pan integral' },
    ],
  },
  {
    name: 'Martes', short: 'M', isTraining: true,
    slots: [
      { meal: 'Desayuno' },
      { meal: 'Media mañana', example: 'Yogur griego con frutos rojos' },
      { meal: 'Comida' },
      { meal: 'Merienda' },
      { meal: 'Cena' },
    ],
  },
  {
    name: 'Miércoles', short: 'X', isTraining: false,
    slots: [
      { meal: 'Desayuno' },
      { meal: 'Media mañana' },
      { meal: 'Comida' },
      { meal: 'Merienda' },
      { meal: 'Cena' },
    ],
  },
  {
    name: 'Jueves', short: 'J', isTraining: true,
    slots: [
      { meal: 'Desayuno' },
      { meal: 'Media mañana' },
      { meal: 'Comida', example: 'Pasta integral, ternera magra, pimiento asado' },
      { meal: 'Merienda' },
      { meal: 'Cena' },
    ],
  },
  {
    name: 'Viernes', short: 'V', isTraining: true,
    slots: [
      { meal: 'Desayuno' },
      { meal: 'Media mañana' },
      { meal: 'Comida' },
      { meal: 'Merienda', example: 'Tostada integral con aguacate y pavo' },
      { meal: 'Cena' },
    ],
  },
  {
    name: 'Sábado', short: 'S', isTraining: true,
    slots: [
      { meal: 'Desayuno' },
      { meal: 'Media mañana' },
      { meal: 'Comida' },
      { meal: 'Merienda' },
      { meal: 'Cena' },
    ],
  },
  {
    name: 'Domingo', short: 'D', isTraining: false,
    slots: [
      { meal: 'Desayuno' },
      { meal: 'Media mañana' },
      { meal: 'Comida' },
      { meal: 'Merienda' },
      { meal: 'Cena' },
    ],
  },
]

const phases: Phase[] = [
  {
    id: 'volumen',
    title: 'FASE DE VOLUMEN',
    color: '#F1B91E',
    kcalLabel: '+300–500 kcal sobre mantenimiento',
    macros: { protein: 25, carbs: 50, fat: 25 },
    duration: '8–16 semanas',
    keyFoods: ['Arroz, avena, pasta integral', 'Pechuga, huevos, salmón', 'Aceite de oliva, frutos secos'],
    description: 'Superávit calórico controlado. Prioridad: síntesis proteica y reposición de glucógeno. Volumen no es comer sin límite — es comer con propósito.',
  },
  {
    id: 'definicion',
    title: 'FASE DE DEFINICIÓN',
    color: '#FFFFFF',
    kcalLabel: '-300–500 kcal bajo mantenimiento',
    macros: { protein: 35, carbs: 35, fat: 30 },
    duration: '6–12 semanas',
    keyFoods: ['Claras de huevo, pavo, pescado blanco', 'Verduras de hoja verde, brócoli', 'Patata, boniato (periworkout)'],
    description: 'Déficit moderado para preservar masa muscular. Proteína alta (2.2–2.8 g/kg) según posición ISSN. La velocidad de pérdida no debe superar 0.5–1% del peso corporal por semana.',
  },
  {
    id: 'mantenimiento',
    title: 'FASE DE MANTENIMIENTO',
    color: '#888888',
    kcalLabel: 'Balance energético neutro',
    macros: { protein: 30, carbs: 40, fat: 30 },
    duration: 'Indefinida',
    keyFoods: ['Dieta mediterránea como base', 'Legumbres, cereales, proteína variada', 'Frutas de temporada, aceite de oliva'],
    description: 'Consolidación. El cuerpo se adapta y los hábitos se automatizan. No es una pausa — es la fase donde el sistema se vuelve sostenible.',
  },
  {
    id: 'competicion',
    title: 'PRE-COMPETICIÓN',
    color: '#F1B91E',
    kcalLabel: 'Mantenimiento + carga glucídica',
    macros: { protein: 20, carbs: 60, fat: 20 },
    duration: '7–14 días pre-evento',
    keyFoods: ['Arroz blanco, pan blanco, pasta', 'Plátano, dátiles, miel', 'Bebida isotónica, sodio extra'],
    description: 'Protocolo de carga de glucógeno (Jeukendrup & Gleeson). Carbohidratos 8–12 g/kg/día en las 36–48h previas. Hidratación con electrolitos. Reducción de fibra para evitar molestias gastrointestinales.',
  },
]

const batchSteps: BatchStep[] = [
  {
    num: 1,
    title: 'PLANIFICA',
    time: '30 min · Domingo AM',
    tips: [
      'Elige 3 fuentes de proteína, 2 de carbohidrato, 3 de verdura para la semana',
      'Adapta cantidades según días de entrenamiento vs. descanso',
      'Reutiliza ingredientes entre comidas para reducir residuos y coste',
    ],
  },
  {
    num: 2,
    title: 'COMPRA',
    time: '45 min · Domingo',
    tips: [
      'Lista organizada por secciones: frescos, refrigerados, despensa',
      'Compra proteínas frescas para 3 días; congela el resto',
      'Prioriza mercado local para frutas, verduras y huevos',
    ],
  },
  {
    num: 3,
    title: 'COCINA',
    time: '2–3 horas · Domingo PM',
    tips: [
      'Cocina cereales y legumbres en lotes grandes (arroz, quinoa, lentejas)',
      'Asa proteínas en horno para liberar la encimera',
      'Prepara salsas y aliños que aguanten toda la semana',
    ],
  },
  {
    num: 4,
    title: 'ALMACENA',
    time: '20 min',
    tips: [
      'Porciones individuales en contenedores herméticos',
      'Etiqueta con día y tipo de comida',
      'Proteínas cocinadas: 3 días en nevera, el resto congelado',
    ],
  },
  {
    num: 5,
    title: 'EJECUTA',
    time: 'Diario · 10 min',
    tips: [
      'Ensambla cada comida desde componentes ya preparados',
      'Sin decisiones en el momento — el plan ya está tomado',
      'El sistema funciona porque elimina la fricción, no la variedad',
    ],
  },
]

const mistakes: Mistake[] = [
  {
    title: 'Saltarte comidas para "compensar"',
    why: 'La restricción intermitente desregula la leptina y la grelina, generando atracones compensatorios. El metabolismo se adapta a la irregularidad reduciendo el gasto energético.',
    fix: 'Mantén una frecuencia de comidas estable. Si te pasaste ayer, come normal hoy. El cuerpo responde mejor a la consistencia que a la corrección.',
  },
  {
    title: 'Copiar la dieta de otro atleta',
    why: 'Las necesidades calóricas dependen de tu masa magra, tu NEAT, tu historial metabólico y tu respuesta individual a macronutrientes. El plan de otra persona resuelve los problemas de otra persona.',
    fix: 'Calcula tus propias necesidades. Usa las fórmulas como punto de partida y ajusta según respuesta real en 2–4 semanas.',
  },
  {
    title: 'Eliminar los carbohidratos',
    why: 'Los carbohidratos son el sustrato energético principal para el entrenamiento de alta intensidad. Sin glucógeno adecuado, el rendimiento cae y la recuperación se prolonga.',
    fix: 'Ajusta la cantidad según demanda: más en días de entrenamiento, menos en descanso. Nunca elimines un macronutriente entero.',
  },
  {
    title: 'Obsesionarte con suplementos',
    why: 'Los suplementos representan el 5% del resultado. El 95% viene de comida real, sueño y consistencia. Ningún suplemento compensa una dieta deficiente.',
    fix: 'Asegura primero las bases: proteína suficiente, frutas, verduras, hidratación. Los suplementos vienen después, si acaso.',
  },
  {
    title: 'No ajustar según la fase',
    why: 'Comer lo mismo durante volumen, definición y competición es como entrenar lo mismo todo el año. Sin periodización nutricional, el cuerpo deja de responder.',
    fix: 'Sincroniza tu nutrición con tu bloque de entrenamiento. Cada fase tiene un objetivo calórico y una distribución de macros diferente.',
  },
  {
    title: 'Pesar comida pero no pesarte a ti',
    why: 'Sin datos sobre tu propio peso y composición corporal, no tienes feedback. Pesar la comida sin medir resultados es como entrenar sin registrar pesos.',
    fix: 'Pésate a diario en las mismas condiciones (mañana, en ayunas). Usa la media semanal, no los valores diarios, para tomar decisiones.',
  },
]

// ── Interactive Caloric Calculator ────────────────────────────────
const ACTIVITY_LEVELS = [
  { label: 'Sedentario', desc: 'Oficina, sin ejercicio', factor: 1.2 },
  { label: 'Ligeramente activo', desc: '1-2 días/semana', factor: 1.375 },
  { label: 'Moderadamente activo', desc: '3-4 días/semana', factor: 1.55 },
  { label: 'Muy activo', desc: '5-6 días/semana', factor: 1.725 },
  { label: 'Extremadamente activo', desc: '2x/día o trabajo físico', factor: 1.9 },
]

const OBJECTIVES = [
  { label: 'Volumen', desc: 'Ganar masa muscular', adj: 400, color: '#F1B91E' },
  { label: 'Mantenimiento', desc: 'Mantener composición', adj: 0, color: '#888' },
  { label: 'Definición', desc: 'Perder grasa', adj: -400, color: '#fff' },
]

function CalcSection({
  calcRef,
  calcInView,
  brandEase,
}: {
  calcRef: React.RefObject<HTMLElement | null>
  calcInView: boolean
  brandEase: readonly [number, number, number, number]
}) {
  const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre')
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [edad, setEdad] = useState('')
  const [activityIdx, setActivityIdx] = useState(3)
  const [objectiveIdx, setObjectiveIdx] = useState(1)

  const pesoNum = parseFloat(peso) || 0
  const alturaNum = parseFloat(altura) || 0
  const edadNum = parseFloat(edad) || 0

  const hasInput = pesoNum > 0 && alturaNum > 0 && edadNum > 0

  const tmb = hasInput
    ? sexo === 'hombre'
      ? 88.362 + 13.397 * pesoNum + 4.799 * alturaNum - 5.677 * edadNum
      : 447.593 + 9.247 * pesoNum + 3.098 * alturaNum - 4.33 * edadNum
    : 0

  const factor = ACTIVITY_LEVELS[activityIdx].factor
  const getd = tmb * factor
  const adj = OBJECTIVES[objectiveIdx].adj
  const finalKcal = getd + adj

  const fmt = (n: number) =>
    Math.round(n).toLocaleString('es-ES')

  return (
    <section
      ref={calcRef}
      className="bg-[#0a0a0a] overflow-hidden"
      style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={calcInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [...brandEase] }}
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className="text-[#F1B91E] text-[clamp(0.75rem,1vw,0.9rem)] tracking-[0.25em] uppercase"
          >
            C&aacute;lculo cal&oacute;rico
          </span>
        </div>
        <h2
          style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
          className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.9] uppercase text-white mb-4"
        >
          LOS N&Uacute;MEROS{' '}
          <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
            no mienten.
          </span>
        </h2>
        <p
          style={{ fontFamily: 'var(--font-inter)' }}
          className="text-white/60 text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.6] max-w-[58ch] mb-14"
        >
          Introduce tus datos reales y obt&eacute;n tu gasto energ&eacute;tico total diario (GETD).
          Sin este n&uacute;mero est&aacute;s adivinando — y adivinar no produce resultados.
        </p>
      </motion.div>

      <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* ── Column 1: TMB ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={calcInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [...brandEase] }}
          className="bg-[#111111]"
          style={{ padding: '2rem' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[#F1B91E] text-[2rem] leading-none"
            >
              01
            </span>
            <h3
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
              className="text-white text-[1.1rem] uppercase tracking-[0.08em]"
            >
              TMB — Tasa Metab&oacute;lica Basal
            </h3>
          </div>

          <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/50 text-[0.85rem] leading-[1.55] mb-5">
            La energ&iacute;a m&iacute;nima que tu cuerpo necesita en reposo absoluto.
            Ecuaci&oacute;n de Harris-Benedict revisada (Roza &amp; Shizgal, 1984).
          </p>

          {/* Sex selector */}
          <div className="flex gap-[2px] mb-4">
            {(['hombre', 'mujer'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSexo(s)}
                className="flex-1 py-2 text-[0.8rem] uppercase tracking-[0.1em] transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  backgroundColor: sexo === s ? '#F1B91E' : '#0a0a0a',
                  color: sexo === s ? '#0a0a0a' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input fields */}
          <div className="flex flex-col gap-3 mb-5">
            {[
              { label: 'Peso', unit: 'kg', value: peso, set: setPeso, placeholder: '75' },
              { label: 'Altura', unit: 'cm', value: altura, set: setAltura, placeholder: '178' },
              { label: 'Edad', unit: 'años', value: edad, set: setEdad, placeholder: '30' },
            ].map((field) => (
              <div key={field.label} className="flex items-center gap-2 bg-[#0a0a0a]" style={{ padding: '0.6rem 0.8rem' }}>
                <span
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-white/40 text-[0.7rem] uppercase tracking-[0.1em] w-[50px] flex-shrink-0"
                >
                  {field.label}
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 bg-transparent text-white text-[1rem] outline-none placeholder:text-white/15"
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, border: 'none' }}
                />
                <span style={{ fontFamily: 'var(--font-inter)' }} className="text-white/25 text-[0.7rem]">
                  {field.unit}
                </span>
              </div>
            ))}
          </div>

          {/* Formula display */}
          <div className="bg-[#0a0a0a] p-4 mb-5" style={{ border: '1px solid rgba(241,185,30,0.15)' }}>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[#F1B91E]/80 text-[0.7rem] tracking-[0.1em] uppercase mb-2">
              {sexo === 'hombre' ? 'Hombres' : 'Mujeres'}
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }} className="text-white/70 text-[0.8rem] leading-[1.6]">
              {sexo === 'hombre'
                ? '88.362 + (13.397 × peso) + (4.799 × altura) − (5.677 × edad)'
                : '447.593 + (9.247 × peso) + (3.098 × altura) − (4.330 × edad)'}
            </p>
          </div>

          {/* TMB Result */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
            {hasInput ? (
              <>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[0.6rem] tracking-[0.15em] uppercase text-white/30 mb-1">
                  Tu TMB
                </p>
                <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-white text-[1.6rem]">
                  {fmt(tmb)} <span className="text-white/30 text-[0.9rem]">kcal/d&iacute;a</span>
                </p>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/25 text-[0.8rem]">
                Introduce tus datos para calcular tu TMB
              </p>
            )}
          </div>

          <div className="mt-4">
            <div className="w-full h-[6px] bg-white/5">
              <div
                className="h-full bg-[#F1B91E]/40 transition-all duration-500"
                style={{ width: hasInput ? '45%' : '0%' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/25 text-[0.6rem] mt-1">
              Base energ&eacute;tica — ~45% del gasto total
            </p>
          </div>
        </motion.div>

        {/* ── Column 2: Activity Factor ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={calcInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [...brandEase] }}
          className="bg-[#111111]"
          style={{ padding: '2rem' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[#F1B91E] text-[2rem] leading-none"
            >
              02
            </span>
            <h3
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
              className="text-white text-[1.1rem] uppercase tracking-[0.08em]"
            >
              Factor de Actividad
            </h3>
          </div>

          <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/50 text-[0.85rem] leading-[1.55] mb-5">
            Selecciona tu nivel real de actividad f&iacute;sica.
            Un atleta de funcional que entrena 5 d&iacute;as/semana est&aacute; en el rango 1.6-1.75.
          </p>

          <div className="flex flex-col gap-[2px] mb-5">
            {ACTIVITY_LEVELS.map((level, i) => {
              const isActive = i === activityIdx
              const pct = ((i + 1) / ACTIVITY_LEVELS.length) * 100
              return (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => setActivityIdx(i)}
                  className="w-full text-left transition-colors duration-200"
                  style={{
                    padding: '0.65rem 0.8rem',
                    backgroundColor: isActive ? 'rgba(241,185,30,0.1)' : '#0a0a0a',
                    borderLeft: isActive ? '3px solid #F1B91E' : '3px solid transparent',
                    cursor: 'pointer',
                    border: 'none',
                    borderLeftStyle: 'solid',
                    borderLeftWidth: '3px',
                    borderLeftColor: isActive ? '#F1B91E' : 'transparent',
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: isActive ? 700 : 400 }}
                        className={`text-[0.75rem] ${isActive ? 'text-[#F1B91E]' : 'text-white/40'}`}
                      >
                        {level.label}
                      </span>
                      <span
                        style={{ fontFamily: 'var(--font-inter)' }}
                        className="text-white/20 text-[0.65rem] ml-2"
                      >
                        {level.desc}
                      </span>
                    </div>
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                      className={`text-[0.75rem] ${isActive ? 'text-[#F1B91E]' : 'text-white/30'}`}
                    >
                      &times;{level.factor}
                    </span>
                  </div>
                  <div className="w-full h-[4px] bg-white/5">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: isActive ? '#F1B91E' : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {/* GETD Result */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
            {hasInput ? (
              <>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[0.6rem] tracking-[0.15em] uppercase text-white/30 mb-1">
                  {fmt(tmb)} kcal &times; {factor}
                </p>
                <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-white text-[1.6rem]">
                  {fmt(getd)} <span className="text-white/30 text-[0.9rem]">kcal/d&iacute;a</span>
                </p>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/25 text-[0.8rem]">
                Tu gasto total aparecer&aacute; aqu&iacute;
              </p>
            )}
          </div>

          <div className="mt-4">
            <div className="w-full h-[6px] bg-white/5">
              <div
                className="h-full bg-[#F1B91E]/40 transition-all duration-500"
                style={{ width: hasInput ? `${(activityIdx + 1) / ACTIVITY_LEVELS.length * 100}%` : '0%' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/25 text-[0.6rem] mt-1">
              Gasto por actividad — nivel {activityIdx + 1} de {ACTIVITY_LEVELS.length}
            </p>
          </div>
        </motion.div>

        {/* ── Column 3: Objective ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={calcInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [...brandEase] }}
          className="bg-[#111111]"
          style={{ padding: '2rem' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
              className="text-[#F1B91E] text-[2rem] leading-none"
            >
              03
            </span>
            <h3
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
              className="text-white text-[1.1rem] uppercase tracking-[0.08em]"
            >
              Objetivo
            </h3>
          </div>

          <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/50 text-[0.85rem] leading-[1.55] mb-5">
            El &uacute;ltimo ajuste depende de si quieres ganar masa muscular (super&aacute;vit),
            perder grasa (d&eacute;ficit) o mantener tu composici&oacute;n actual.
          </p>

          <div className="flex flex-col gap-[2px] mb-5">
            {OBJECTIVES.map((obj, i) => {
              const isActive = i === objectiveIdx
              return (
                <button
                  key={obj.label}
                  type="button"
                  onClick={() => setObjectiveIdx(i)}
                  className="w-full text-left transition-colors duration-200"
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: isActive ? 'rgba(241,185,30,0.08)' : '#0a0a0a',
                    borderLeft: `3px solid ${isActive ? obj.color : 'transparent'}`,
                    cursor: 'pointer',
                    border: 'none',
                    borderLeftStyle: 'solid',
                    borderLeftWidth: '3px',
                    borderLeftColor: isActive ? obj.color : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                        className={`text-[0.9rem] uppercase tracking-[0.06em] ${isActive ? 'text-white' : 'text-white/50'}`}
                      >
                        {obj.label}
                      </p>
                      <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/30 text-[0.7rem]">
                        {obj.desc}
                      </p>
                    </div>
                    <p
                      style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                      className={`text-[0.9rem] ${isActive ? 'text-white/70' : 'text-white/30'}`}
                    >
                      {obj.adj > 0 ? '+' : ''}{obj.adj} <span className="text-[0.65rem]">kcal</span>
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Final result */}
          <div
            style={{
              borderTop: hasInput ? '2px solid rgba(241,185,30,0.4)' : '1px solid rgba(255,255,255,0.06)',
              paddingTop: '1rem',
            }}
          >
            {hasInput ? (
              <>
                <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[0.6rem] tracking-[0.15em] uppercase text-[#F1B91E]/60 mb-1">
                  Tu objetivo cal&oacute;rico diario
                </p>
                <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-[#F1B91E] text-[2.2rem]">
                  {fmt(finalKcal)} <span className="text-white/40 text-[1rem]">kcal/d&iacute;a</span>
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/30 text-[0.7rem]">
                    TMB: {fmt(tmb)} &times; Actividad ({factor}) = {fmt(getd)}
                    {adj !== 0 && ` ${adj > 0 ? '+' : '−'} ${Math.abs(adj)}`}
                  </p>
                </div>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/25 text-[0.8rem]">
                Tu objetivo aparecer&aacute; aqu&iacute;
              </p>
            )}
          </div>

          <div className="mt-4">
            <div className="w-full h-[6px] bg-white/5">
              <div
                className="h-full bg-[#F1B91E] transition-all duration-500"
                style={{ width: hasInput ? '100%' : '0%' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/25 text-[0.6rem] mt-1">
              Tu objetivo energ&eacute;tico diario completo
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Reusable sub-components ────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
      <span
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
        className="text-[#F1B91E] text-[clamp(0.75rem,1vw,0.9rem)] tracking-[0.25em] uppercase"
      >
        {text}
      </span>
    </div>
  )
}

function StepIcon({ num }: { num: number }) {
  const icons: Record<number, React.ReactNode> = {
    1: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" stroke="#F1B91E" strokeWidth="1.5" />
        <line x1="9" y1="10" x2="19" y2="10" stroke="#F1B91E" strokeWidth="1.5" />
        <line x1="9" y1="14" x2="19" y2="14" stroke="#F1B91E" strokeWidth="1.5" />
        <line x1="9" y1="18" x2="15" y2="18" stroke="#F1B91E" strokeWidth="1.5" />
      </svg>
    ),
    2: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22 L14 6 L22 22 Z" stroke="#F1B91E" strokeWidth="1.5" fill="none" />
        <line x1="10" y1="18" x2="18" y2="18" stroke="#F1B91E" strokeWidth="1.5" />
      </svg>
    ),
    3: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="12" width="20" height="12" stroke="#F1B91E" strokeWidth="1.5" />
        <path d="M8 12 V8 Q14 4 20 8 V12" stroke="#F1B91E" strokeWidth="1.5" fill="none" />
        <line x1="14" y1="16" x2="14" y2="20" stroke="#F1B91E" strokeWidth="1.5" />
      </svg>
    ),
    4: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="6" width="16" height="16" stroke="#F1B91E" strokeWidth="1.5" />
        <line x1="6" y1="14" x2="22" y2="14" stroke="#F1B91E" strokeWidth="1.5" />
        <line x1="14" y1="6" x2="14" y2="22" stroke="#F1B91E" strokeWidth="1.5" />
      </svg>
    ),
    5: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="6,16 12,22 24,8" stroke="#F1B91E" strokeWidth="2" fill="none" />
      </svg>
    ),
  }
  return icons[num] || null
}

// ── Main component ─────────────────────────────────────────────────
export default function NutricionPlanificacion() {
  const heroRef = useRef<HTMLDivElement>(null)
  const weekRef = useRef<HTMLDivElement>(null)
  const periodRef = useRef<HTMLDivElement>(null)
  const batchRef = useRef<HTMLDivElement>(null)
  const calcRef = useRef<HTMLDivElement>(null)
  const errorsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, margin: '-60px' })
  const weekInView = useInView(weekRef, { once: true, margin: '-80px' })
  const periodInView = useInView(periodRef, { once: true, margin: '-80px' })
  const batchInView = useInView(batchRef, { once: true, margin: '-80px' })
  const calcInView = useInView(calcRef, { once: true, margin: '-80px' })
  const errorsInView = useInView(errorsRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  const [viewMode, setViewMode] = useState<'training' | 'rest'>('training')

  return (
    <div>
      {/* ════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative bg-[#0a0a0a] overflow-hidden"
        style={{ padding: 'clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,4rem) clamp(4rem,8vh,7rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
        >
          <SectionLabel text="Planificaci&oacute;n" />

          <h1
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 'clamp(3.6rem,8vw,8rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
            className="text-white mb-6"
          >
            EL SISTEMA{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              funciona.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [...brandEase] }}
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-white/70 text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] max-w-[52ch] mt-8"
        >
          La planificaci&oacute;n elimina la improvisaci&oacute;n. Cuando sabes qu&eacute; comer, cu&aacute;ndo y por qu&eacute;,
          dejas de depender de la motivaci&oacute;n y empiezas a depender del sistema.
          Los resultados no vienen de esfuerzos puntuales — vienen de la estructura repetida semana tras semana.
        </motion.p>

        {/* Decorative grid lines */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute bg-white" style={{ width: '1px', height: '100%', left: `${(i + 1) * 12.5}%` }} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. WEEKLY MEAL ARCHITECTURE
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={weekRef}
        className="bg-[#111111] overflow-hidden"
        style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={weekInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
        >
          <SectionLabel text="Arquitectura semanal" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.9] uppercase text-white mb-4"
          >
            7 D&Iacute;AS. 5 COMIDAS. CERO IMPROVISACI&Oacute;N.
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/60 text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.6] max-w-[58ch] mb-10"
          >
            La estructura semanal adapta la ingesta a la demanda. D&iacute;as de entrenamiento llevan m&aacute;s
            carbohidratos y calor&iacute;as totales. D&iacute;as de descanso priorizan prote&iacute;na y grasas saludables
            con menor carga glucid&iacute;ca.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={weekInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-0 mb-8"
        >
          <button
            onClick={() => setViewMode('training')}
            className="transition-all duration-300"
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              padding: '0.75rem 1.5rem',
              backgroundColor: viewMode === 'training' ? '#F1B91E' : 'transparent',
              color: viewMode === 'training' ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${viewMode === 'training' ? '#F1B91E' : 'rgba(255,255,255,0.15)'}`,
            }}
          >
            D&iacute;a de entrenamiento
          </button>
          <button
            onClick={() => setViewMode('rest')}
            className="transition-all duration-300"
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              padding: '0.75rem 1.5rem',
              backgroundColor: viewMode === 'rest' ? '#F1B91E' : 'transparent',
              color: viewMode === 'rest' ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${viewMode === 'rest' ? '#F1B91E' : 'rgba(255,255,255,0.15)'}`,
            }}
          >
            D&iacute;a de descanso
          </button>
        </motion.div>

        {/* Weekly Grid */}
        <div className="overflow-x-auto -mx-4 px-4 pb-4">
          <div className="flex gap-[2px]" style={{ minWidth: '900px' }}>
            {weekPlan.map((day, di) => {
              const highlight = viewMode === 'training' ? day.isTraining : !day.isTraining
              return (
                <motion.div
                  key={day.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={weekInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + di * 0.06, ease: [...brandEase] }}
                  className="flex-1 flex flex-col"
                  style={{
                    border: `1px solid ${highlight ? 'rgba(241,185,30,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    backgroundColor: highlight ? 'rgba(241,185,30,0.03)' : 'transparent',
                    transition: 'border-color 0.4s, background-color 0.4s',
                  }}
                >
                  {/* Day header */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      padding: '0.75rem 0.75rem',
                      borderBottom: `1px solid ${highlight ? 'rgba(241,185,30,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <span
                      style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                      className={`text-[0.8rem] tracking-[0.15em] uppercase ${highlight ? 'text-[#F1B91E]' : 'text-white/40'}`}
                    >
                      {day.short}
                    </span>
                    {day.isTraining && (
                      <div className="w-1.5 h-1.5 bg-[#F1B91E]" />
                    )}
                  </div>

                  {/* Meal slots */}
                  {day.slots.map((slot, si) => (
                    <div
                      key={si}
                      className="flex flex-col"
                      style={{
                        padding: '0.6rem 0.75rem',
                        borderBottom: si < day.slots.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        minHeight: '3.5rem',
                      }}
                    >
                      <span
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                        className="text-[0.55rem] tracking-[0.15em] uppercase text-white/30 mb-1"
                      >
                        {slot.meal}
                      </span>
                      {slot.example && (
                        <span
                          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                          className="text-[0.65rem] leading-[1.4] text-white/55"
                        >
                          {slot.example}
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#F1B91E]" />
            <span style={{ fontFamily: 'var(--font-inter)' }} className="text-[0.7rem] text-white/40 tracking-wider uppercase">
              Entrenamiento
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white/20" />
            <span style={{ fontFamily: 'var(--font-inter)' }} className="text-[0.7rem] text-white/40 tracking-wider uppercase">
              Descanso
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. PERIODIZACIÓN NUTRICIONAL
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={periodRef}
        className="bg-[#0a0a0a] overflow-hidden"
        style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={periodInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
        >
          <SectionLabel text="Periodizaci&oacute;n nutricional" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.9] uppercase text-white mb-4"
          >
            CADA FASE PIDE{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              su combustible.
            </span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/60 text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.6] max-w-[58ch] mb-14"
          >
            La nutrici&oacute;n deportiva no es est&aacute;tica. Se sincroniza con los bloques de entrenamiento:
            volumen para construir, definici&oacute;n para esculpir, mantenimiento para consolidar,
            y un protocolo espec&iacute;fico antes de competir. La misma dieta todo el a&ntilde;o es como
            hacer el mismo entrenamiento todo el a&ntilde;o — deja de funcionar.
          </p>
        </motion.div>

        {/* Phase timeline SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={periodInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10 overflow-x-auto -mx-4 px-4"
        >
          <svg viewBox="0 0 1000 120" className="w-full" style={{ minWidth: '700px', maxHeight: '120px' }}>
            {/* Baseline */}
            <line x1="0" y1="90" x2="1000" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Phase wave */}
            <path
              d="M0,60 C60,60 80,30 160,30 C240,30 260,60 330,60 C380,60 400,75 470,75 C540,75 560,60 620,60 C680,60 700,45 780,45 C860,45 880,25 950,25 L1000,25"
              fill="none"
              stroke="#F1B91E"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Phase markers */}
            {[
              { x: 120, label: 'VOLUMEN', y: 22 },
              { x: 370, label: 'DEFINICIÓN', y: 68 },
              { x: 600, label: 'MANTENIMIENTO', y: 52 },
              { x: 860, label: 'PRE-COMP', y: 17 },
            ].map((p, i) => (
              <g key={i}>
                <line x1={p.x} y1={p.y + 12} x2={p.x} y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                <rect x={p.x - 50} y={p.y - 8} width="100" height="18" fill="#0a0a0a" />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  fill={i === 0 || i === 3 ? '#F1B91E' : 'rgba(255,255,255,0.5)'}
                  fontSize="10"
                  fontFamily="var(--font-barlow)"
                  fontWeight="700"
                  letterSpacing="0.15em"
                >
                  {p.label}
                </text>
              </g>
            ))}

            {/* Caloric indicator labels */}
            <text x="120" y="106" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="var(--font-inter)">
              +kcal
            </text>
            <text x="370" y="106" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="var(--font-inter)">
              -kcal
            </text>
            <text x="600" y="106" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="var(--font-inter)">
              =kcal
            </text>
            <text x="860" y="106" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="var(--font-inter)">
              CHO load
            </text>
          </svg>
        </motion.div>

        {/* Phase cards */}
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {phases.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 40 }}
              animate={periodInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [...brandEase] }}
              className="bg-[#111111] flex flex-col"
              style={{ padding: '1.75rem' }}
            >
              {/* Phase color bar */}
              <div className="w-8 h-[3px] mb-5" style={{ backgroundColor: phase.color }} />

              <h3
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                className="text-white text-[clamp(1.1rem,1.4vw,1.3rem)] uppercase tracking-[0.08em] mb-3"
              >
                {phase.title}
              </h3>

              <p
                style={{ fontFamily: 'var(--font-inter)' }}
                className="text-white/55 text-[0.85rem] leading-[1.55] mb-5"
              >
                {phase.description}
              </p>

              {/* Macro bars */}
              <div className="flex flex-col gap-2 mb-5">
                {[
                  { label: 'Proteína', pct: phase.macros.protein },
                  { label: 'Carbos', pct: phase.macros.carbs },
                  { label: 'Grasas', pct: phase.macros.fat },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[0.6rem] tracking-[0.15em] uppercase text-white/40">
                        {m.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-[0.6rem] text-white/60">
                        {m.pct}%
                      </span>
                    </div>
                    <div className="w-full h-[3px] bg-white/5">
                      <div className="h-full bg-[#F1B91E]/60" style={{ width: `${m.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-1 mb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#F1B91E]/70">
                  {phase.kcalLabel}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)' }} className="text-[0.65rem] text-white/35">
                  Duraci&oacute;n: {phase.duration}
                </span>
              </div>

              {/* Key foods */}
              <div className="flex flex-col gap-1 mt-auto">
                {phase.keyFoods.map((food, fi) => (
                  <div key={fi} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-white/20 flex-shrink-0 mt-[6px]" />
                    <span style={{ fontFamily: 'var(--font-inter)' }} className="text-[0.7rem] text-white/40 leading-[1.4]">
                      {food}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. BATCH COOKING METHOD
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={batchRef}
        className="bg-[#111111] overflow-hidden"
        style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={batchInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
        >
          <SectionLabel text="El m&eacute;todo batch" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.9] uppercase text-white mb-4"
          >
            COCINA UNA VEZ.{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              Come toda la semana.
            </span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/60 text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.6] max-w-[58ch] mb-14"
          >
            El batch cooking no es un truco de productividad — es el sistema que usan los atletas
            para eliminar la toma de decisiones diaria sobre comida. Dedicas 3 horas el domingo
            y el resto de la semana solo ensamblas.
          </p>
        </motion.div>

        {/* Process flow */}
        <div className="flex flex-col gap-[2px]">
          {batchSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -30 }}
              animate={batchInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [...brandEase] }}
              className="bg-[#191919] flex items-start gap-6 group hover:bg-[#1a1a1a] transition-colors duration-300"
              style={{ padding: 'clamp(1.25rem,2vw,2rem)' }}
            >
              {/* Step number + icon */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3" style={{ width: '3rem' }}>
                <span
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                  className="text-[#F1B91E] text-[1.8rem] leading-none"
                >
                  {step.num}
                </span>
                <StepIcon num={step.num} />
                {i < batchSteps.length - 1 && (
                  <div className="w-[1px] h-4 bg-white/10 group-hover:bg-[#F1B91E]/30 transition-colors duration-300" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-4 mb-3 flex-wrap">
                  <h3
                    style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                    className="text-white text-[clamp(1.2rem,1.6vw,1.5rem)] uppercase tracking-[0.06em]"
                  >
                    {step.title}
                  </h3>
                  <span
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                    className="text-[#F1B91E]/60 text-[0.65rem] tracking-[0.15em] uppercase"
                  >
                    {step.time}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {step.tips.map((tip, ti) => (
                    <div key={ti} className="flex items-start gap-3">
                      <div className="w-[3px] h-[3px] bg-white/20 flex-shrink-0 mt-[7px]" />
                      <p
                        style={{ fontFamily: 'var(--font-inter)' }}
                        className="text-white/55 text-[clamp(0.85rem,0.95vw,0.95rem)] leading-[1.5]"
                      >
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5. CALORIC NEEDS CALCULATOR (Interactive)
      ════════════════════════════════════════════════════════════ */}
      <CalcSection calcRef={calcRef} calcInView={calcInView} brandEase={brandEase} />

      {/* ════════════════════════════════════════════════════════════
          6. COMMON MISTAKES
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={errorsRef}
        className="bg-[#111111] overflow-hidden"
        style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={errorsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
        >
          <SectionLabel text="Errores frecuentes" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.9] uppercase text-white mb-14"
          >
            ERRORES QUE FRENAN{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              tu progreso.
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {mistakes.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={errorsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [...brandEase] }}
              className="bg-[#191919] flex flex-col group"
              style={{ padding: '1.75rem' }}
            >
              {/* Error indicator line */}
              <div className="w-full h-[3px] bg-[#FF4444] mb-5 group-hover:bg-[#F1B91E] transition-colors duration-500" />

              <h3
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                className="text-white text-[clamp(1rem,1.2vw,1.15rem)] uppercase tracking-[0.04em] mb-3 leading-[1.15]"
              >
                {m.title}
              </h3>

              <div className="mb-4">
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-[#FF4444]/70 text-[0.6rem] tracking-[0.15em] uppercase block mb-1">
                  Por qu&eacute; falla
                </span>
                <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/45 text-[0.8rem] leading-[1.5]">
                  {m.why}
                </p>
              </div>

              <div className="mt-auto" style={{ borderTop: '1px solid rgba(241,185,30,0.1)', paddingTop: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-[#F1B91E]/70 text-[0.6rem] tracking-[0.15em] uppercase block mb-1">
                  Qu&eacute; hacer
                </span>
                <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/60 text-[0.8rem] leading-[1.5]">
                  {m.fix}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          7. CTA
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="bg-[#0a0a0a] overflow-hidden"
        style={{ padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
          className="max-w-[680px] mx-auto text-center"
        >
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.4rem,4.5vw,4rem)] leading-[0.92] uppercase text-white mb-6"
          >
            NECESITAS UN PLAN{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              personalizado.
            </span>
          </h2>

          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/55 text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.6] mb-10 max-w-[48ch] mx-auto text-center"
          >
            Tu peso, tu nivel de actividad, tu historial y tus objetivos son &uacute;nicos. Un plan gen&eacute;rico
            no resuelve problemas espec&iacute;ficos. Habl&eacute;moslo y dise&ntilde;amos algo que funcione para ti.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              data-contact
              className="inline-flex items-center gap-3 bg-[#F1B91E] text-[#0a0a0a] hover:bg-[#d4a319] transition-colors duration-300 group"
              style={{ padding: '1rem 2rem' }}
            >
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[0.7rem] tracking-[0.25em] uppercase"
              >
                Solicitar Plan Nutricional
              </span>
              <svg className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-transparent text-white/60 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300"
              style={{ padding: '1rem 2rem' }}
            >
              <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[0.7rem] tracking-[0.25em] uppercase"
              >
                WhatsApp
              </span>
            </a>
          </div>
        </motion.div>

        {/* Brand line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, fontStyle: 'italic' }}
          className="text-white/15 text-[0.75rem] tracking-[0.2em] mt-16 text-center"
        >
          Cuerpos que rinden, no cuerpos que posan.
        </motion.p>
      </section>
    </div>
  )
}
