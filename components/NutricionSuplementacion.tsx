'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const brandEase = [0.16, 1, 0.3, 1] as const

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tiers = [
  {
    id: 'S',
    label: 'EVIDENCIA FUERTE',
    color: '#F1B91E',
    textColor: '#0a0a0a',
    supplements: [
      { name: 'Creatina monohidrato', note: 'Meta-análisis sólidos. +5-10% fuerza, +5-15% potencia.' },
      { name: 'Cafeína', note: '3-6mg/kg peso corporal. Mejora rendimiento aeróbico y anaeróbico.' },
      { name: 'Proteína whey', note: 'Perfil completo de aminoácidos. Conveniente, no mágica.' },
    ],
  },
  {
    id: 'A',
    label: 'EVIDENCIA MODERADA',
    color: '#c9981a',
    textColor: '#0a0a0a',
    supplements: [
      { name: 'Beta-alanina', note: 'Tampón de acidez muscular. Beneficio en esfuerzos de 1-4 min.' },
      { name: 'Bicarbonato sódico', note: 'Tamponador extracelular. Útil en esfuerzos intensos repetidos.' },
      { name: 'Nitratos (remolacha)', note: 'Mejora eficiencia del oxígeno. Más efecto en deportistas recreativos.' },
    ],
  },
  {
    id: 'B',
    label: 'EVIDENCIA EMERGENTE',
    color: '#7a6a2e',
    textColor: '#ffffff',
    supplements: [
      { name: 'Ashwagandha', note: 'Algunas señales en recuperación y fuerza. Faltan datos a largo plazo.' },
      { name: 'Citrulina', note: 'Precursor de óxido nítrico. Prometedor, aún sin consenso.' },
      { name: 'HMB', note: 'Puede ayudar en fases de restricción calórica. Evidencia limitada.' },
    ],
  },
  {
    id: 'C',
    label: 'EVIDENCIA INSUFICIENTE',
    color: '#3a3a3a',
    textColor: '#999999',
    supplements: [
      { name: 'Quemagrasas', note: 'Marketing puro. Ningún meta-análisis respalda eficacia clínica.' },
      { name: 'BCAAs', note: 'Redundantes si tu ingesta de proteína es adecuada.' },
      { name: 'Boosters de testosterona', note: 'Sin evidencia de efecto real en personas sanas.' },
      { name: 'Pre-workouts genéricos', note: 'Mezclas propietarias con dosis subdosificadas.' },
    ],
  },
]

const bigThree = [
  {
    name: 'CREATINA MONOHIDRATO',
    icon: 'ATP',
    what: 'Acelera la resíntesis de ATP — el combustible inmediato de tus músculos. También mejora la hidratación celular, lo que favorece la síntesis proteica.',
    dose: '3-5g al día. No necesitas fase de carga. La consistencia importa más que el momento.',
    timing: 'Cualquier momento del día. Con el desayuno, post-entreno, antes de dormir — da igual. Lo que importa es que lo tomes cada día.',
    safety: 'Uno de los suplementos más estudiados de la historia. Seguro para adultos sanos según la ISSN (Position Stand, 2017). No daña los riñones en personas sanas.',
    bars: [
      { label: 'Fuerza', value: 75, display: '+5-10%' },
      { label: 'Potencia', value: 85, display: '+5-15%' },
      { label: 'Reps/serie', value: 60, display: '+1-2 reps' },
    ],
  },
  {
    name: 'CAFEÍNA',
    icon: 'CNS',
    what: 'Antagonista de la adenosina — bloquea la señal de fatiga en el sistema nervioso central. Incrementa alerta, concentración y capacidad de trabajo.',
    dose: '3-6mg por kg de peso corporal. Para 70kg: 210-420mg. Tómala 30-60 minutos antes de entrenar.',
    timing: 'Pre-entreno exclusivamente. Evítala después de las 14-16h si entrenas por la tarde y quieres dormir bien.',
    safety: 'Aprobada por la EFSA para mejora del rendimiento. Genera tolerancia — si la usas a diario, los efectos disminuyen. Cicla 1-2 semanas sin ella cada mes.',
    curve: true,
  },
  {
    name: 'PROTEÍNA WHEY',
    icon: 'AA',
    what: 'Proteína completa con perfil de aminoácidos esenciales elevado. Alto contenido en leucina — el aminoácido que más estimula la síntesis proteica muscular.',
    dose: '20-40g por toma. Objetivo diario total de proteína: 1.6-2.2g por kg de peso corporal, de todas las fuentes.',
    timing: 'Cuando te resulte conveniente. Post-entreno, entre comidas, como snack. La ventana anabólica de 30 minutos es un mito — tienes horas.',
    safety: 'Si tu ingesta de proteína con comida real ya alcanza 1.6-2.2g/kg, el whey no te aporta nada extra. Es un complemento, no un requisito.',
    leucine: [
      { source: 'Whey', g: 3.0 },
      { source: 'Caseína', g: 2.3 },
      { source: 'Huevo', g: 1.8 },
      { source: 'Soja', g: 1.6 },
      { source: 'Guisante', g: 1.3 },
    ],
  },
]

const timeline = [
  { time: '07:00', label: 'MAÑANA', supplement: 'Creatina', note: 'Con el desayuno. El momento es irrelevante — la consistencia no.', color: '#F1B91E' },
  { time: '09:30', label: 'PRE-ENTRENO', supplement: 'Cafeína', note: '30-60 min antes. 3-6mg/kg peso corporal.', color: '#F1B91E' },
  { time: '10:30', label: 'DURANTE', supplement: 'Electrolitos', note: 'Solo si la sesión supera 60 minutos o hay mucho calor.', color: '#7a6a2e' },
  { time: '11:30', label: 'POST-ENTRENO', supplement: 'Proteína whey', note: 'Dentro de las 2h siguientes. No hay prisa real — la ventana es amplia.', color: '#F1B91E' },
  { time: '23:00', label: 'NOCHE', supplement: 'Magnesio', note: 'Si tu dieta no cubre los 400mg/día. Puede ayudar con el sueño.', color: '#3a3a3a' },
]

const redFlags = [
  { flag: '"Resultados garantizados"', reality: 'Ningún suplemento garantiza resultados. Los resultados dependen del entrenamiento, la nutrición y el descanso.' },
  { flag: '"Fórmula propietaria"', reality: 'Significa que ocultan las dosis reales de cada ingrediente. Si no puedes verificar qué contiene, no lo compres.' },
  { flag: '"Estudios clínicos" sin citar cuáles', reality: 'Exige el DOI o el nombre del estudio. Si no lo proporcionan, no existen o no dicen lo que afirman.' },
  { flag: 'Testimonios de influencers', reality: 'Pagados. Un patrocinio no es evidencia. Pregunta: ese influencer toma realmente el producto fuera de cámara.' },
  { flag: '"Solo disponible aquí"', reality: 'Escasez artificial. Si el producto fuera tan bueno, estaría en todas partes, no solo en una landing page.' },
  { flag: 'Antes/después extremos', reality: 'Iluminación, deshidratación, pump, postura. Nada de eso refleja el efecto del suplemento.' },
]

/* ------------------------------------------------------------------ */
/*  Reusable section wrapper                                           */
/* ------------------------------------------------------------------ */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-2 h-2 bg-[#F1B91E] flex-shrink-0" />
      <span
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
        className="text-[#F1B91E] text-[0.75rem] tracking-[0.25em] uppercase"
      >
        {text}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Evidence Pyramid SVG                                               */
/* ------------------------------------------------------------------ */

function EvidencePyramid({ activeTier, onSelect }: { activeTier: string | null; onSelect: (id: string) => void }) {
  const pyramidTiers = [
    { id: 'S', y: 0, topWidth: 60, bottomWidth: 180, height: 80, fill: '#F1B91E', label: 'S' },
    { id: 'A', y: 84, topWidth: 180, bottomWidth: 320, height: 80, fill: '#c9981a', label: 'A' },
    { id: 'B', y: 168, topWidth: 320, bottomWidth: 460, height: 80, fill: '#7a6a2e', label: 'B' },
    { id: 'C', y: 252, topWidth: 460, bottomWidth: 600, height: 80, fill: '#3a3a3a', label: 'C' },
  ]
  const cx = 340
  const svgHeight = 360
  const svgWidth = 680

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[680px] mx-auto" xmlns="http://www.w3.org/2000/svg">
      {pyramidTiers.map((t) => {
        const isActive = activeTier === t.id
        const x1 = cx - t.topWidth / 2
        const x2 = cx + t.topWidth / 2
        const x3 = cx + t.bottomWidth / 2
        const x4 = cx - t.bottomWidth / 2
        const points = `${x1},${t.y + 8} ${x2},${t.y + 8} ${x3},${t.y + t.height} ${x4},${t.y + t.height}`

        return (
          <g
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{ cursor: 'pointer' }}
          >
            <polygon
              points={points}
              fill={isActive ? t.fill : t.fill}
              opacity={isActive ? 1 : activeTier ? 0.3 : 0.8}
              style={{ transition: 'opacity 0.4s ease' }}
            />
            {isActive && (
              <polygon
                points={points}
                fill="none"
                stroke="#F1B91E"
                strokeWidth="2"
              />
            )}
            <text
              x={cx}
              y={t.y + t.height / 2 + 12}
              textAnchor="middle"
              fill={t.id === 'C' ? '#999' : t.id === 'B' ? '#ddd' : '#0a0a0a'}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '18px', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}
            >
              {t.label} — {tiers.find(tier => tier.id === t.id)?.label}
            </text>
          </g>
        )
      })}
      {/* Vertical axis label */}
      <text
        x="16"
        y={svgHeight / 2}
        textAnchor="middle"
        transform={`rotate(-90, 16, ${svgHeight / 2})`}
        fill="#555"
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' as const }}
      >
        NIVEL DE EVIDENCIA
      </text>
      <line x1="36" y1="20" x2="36" y2={svgHeight - 20} stroke="#333" strokeWidth="1" />
      <polygon points="36,14 32,24 40,24" fill="#555" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Performance bar chart (Creatine)                                   */
/* ------------------------------------------------------------------ */

function PerformanceBars({ bars, inView }: { bars: typeof bigThree[0]['bars']; inView: boolean }) {
  if (!bars) return null
  return (
    <div className="space-y-4 mt-6">
      {bars.map((bar, i) => (
        <div key={bar.label}>
          <div className="flex justify-between mb-1">
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }} className="text-white/70 text-[0.8rem] uppercase tracking-wider">
              {bar.label}
            </span>
            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-[#F1B91E] text-[0.9rem]">
              {bar.display}
            </span>
          </div>
          <div className="w-full h-3 bg-[#191919]">
            <motion.div
              className="h-full bg-[#F1B91E]"
              initial={{ width: 0 }}
              animate={inView ? { width: `${bar.value}%` } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [...brandEase] }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Dose-response curve (Caffeine)                                     */
/* ------------------------------------------------------------------ */

function DoseResponseCurve({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-[400px] mt-6" xmlns="http://www.w3.org/2000/svg">
      {/* Grid */}
      {[50, 100, 150].map(y => (
        <line key={y} x1="50" y1={y} x2="380" y2={y} stroke="#222" strokeWidth="0.5" />
      ))}
      {/* Axes */}
      <line x1="50" y1="180" x2="380" y2="180" stroke="#444" strokeWidth="1" />
      <line x1="50" y1="30" x2="50" y2="180" stroke="#444" strokeWidth="1" />
      {/* Curve */}
      <motion.path
        d="M 50,170 C 100,165 140,120 190,60 C 220,30 260,28 290,35 C 320,45 350,80 380,130"
        fill="none"
        stroke="#F1B91E"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, ease: [...brandEase] }}
      />
      {/* Sweet spot zone */}
      <rect x="140" y="25" width="120" height="160" fill="#F1B91E" opacity="0.06" />
      <text x="200" y="18" textAnchor="middle" fill="#F1B91E" style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
        ZONA EFECTIVA
      </text>
      {/* Labels */}
      <text x="50" y="195" fill="#666" style={{ fontFamily: 'var(--font-inter)', fontSize: '9px' }}>1mg/kg</text>
      <text x="190" y="195" fill="#F1B91E" style={{ fontFamily: 'var(--font-inter)', fontSize: '9px', fontWeight: 700 }}>3-6mg/kg</text>
      <text x="360" y="195" fill="#666" style={{ fontFamily: 'var(--font-inter)', fontSize: '9px' }}>9mg/kg+</text>
      <text x="15" y="170" fill="#666" style={{ fontFamily: 'var(--font-inter)', fontSize: '8px' }} transform="rotate(-90, 15, 120)">RENDIMIENTO</text>
      <text x="215" y="195" fill="#666" style={{ fontFamily: 'var(--font-inter)', fontSize: '8px' }}>DOSIS →</text>
      {/* Diminishing returns annotation */}
      <text x="345" y="105" fill="#666" style={{ fontFamily: 'var(--font-inter)', fontSize: '8px', fontStyle: 'italic' }} textAnchor="middle">Efectos</text>
      <text x="345" y="115" fill="#666" style={{ fontFamily: 'var(--font-inter)', fontSize: '8px', fontStyle: 'italic' }} textAnchor="middle">adversos</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Leucine comparison chart (Whey)                                    */
/* ------------------------------------------------------------------ */

function LeucineChart({ data, inView }: { data: typeof bigThree[2]['leucine']; inView: boolean }) {
  if (!data) return null
  const maxVal = Math.max(...data.map(d => d.g))

  return (
    <div className="flex items-end gap-3 mt-6 h-[180px]">
      {data.map((item, i) => (
        <div key={item.source} className="flex flex-col items-center flex-1">
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-white/80 text-[0.75rem] mb-1">
            {item.g}g
          </span>
          <motion.div
            className="w-full"
            style={{ backgroundColor: i === 0 ? '#F1B91E' : '#3a3a3a' }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${(item.g / maxVal) * 120}px` } : { height: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [...brandEase] }}
          />
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }} className="text-white/50 text-[0.65rem] mt-2 text-center uppercase tracking-wider">
            {item.source}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Big Three Card (extracted to respect hook rules)                    */
/* ------------------------------------------------------------------ */

function BigThreeCard({ item }: { item: typeof bigThree[number] }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const itemInView = useInView(itemRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      animate={itemInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [...brandEase] }}
      className="grid lg:grid-cols-2 gap-10 border-t border-white/8 pt-10"
    >
      {/* Left: info */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-[#F1B91E] flex items-center justify-center">
            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-[#0a0a0a] text-[0.8rem] tracking-wider">
              {item.icon}
            </span>
          </div>
          <h3
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className="text-white text-[clamp(1.6rem,2.5vw,2.2rem)] uppercase tracking-wide"
          >
            {item.name}
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-[#F1B91E] text-[0.8rem] uppercase tracking-[0.2em] mb-2">
              Qué hace
            </h4>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/70 text-[0.95rem] leading-[1.7]">
              {item.what}
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-[#F1B91E] text-[0.8rem] uppercase tracking-[0.2em] mb-2">
              Dosis
            </h4>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/70 text-[0.95rem] leading-[1.7]">
              {item.dose}
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-[#F1B91E] text-[0.8rem] uppercase tracking-[0.2em] mb-2">
              Cuándo tomarlo
            </h4>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/70 text-[0.95rem] leading-[1.7]">
              {item.timing}
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-[#F1B91E] text-[0.8rem] uppercase tracking-[0.2em] mb-2">
              Seguridad
            </h4>
            <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/70 text-[0.95rem] leading-[1.7]">
              {item.safety}
            </p>
          </div>
        </div>
      </div>

      {/* Right: data viz */}
      <div className="flex flex-col justify-center">
        {item.bars && <PerformanceBars bars={item.bars} inView={itemInView} />}
        {'curve' in item && item.curve && <DoseResponseCurve inView={itemInView} />}
        {item.leucine && (
          <div>
            <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-white/40 text-[0.75rem] uppercase tracking-[0.2em] mb-2">
              Leucina por 25g de proteína (gramos)
            </h4>
            <LeucineChart data={item.leucine} inView={itemInView} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function NutricionSuplementacion() {
  const [activeTier, setActiveTier] = useState<string | null>(null)

  /* Section refs */
  const heroRef = useRef<HTMLDivElement>(null)
  const pyramidRef = useRef<HTMLDivElement>(null)
  const deepDiveRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const flagsRef = useRef<HTMLDivElement>(null)
  const euRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, margin: '-60px' })
  const pyramidInView = useInView(pyramidRef, { once: true, margin: '-60px' })
  const deepDiveInView = useInView(deepDiveRef, { once: true, margin: '-60px' })
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' })
  const flagsInView = useInView(flagsRef, { once: true, margin: '-60px' })
  const euInView = useInView(euRef, { once: true, margin: '-60px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  const selectedTier = activeTier ? tiers.find(t => t.id === activeTier) : null

  return (
    <div className="bg-[#0a0a0a]">

      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section ref={heroRef} className="relative bg-[#0a0a0a] overflow-hidden" style={{ padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem) clamp(4rem,8vw,6rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [...brandEase] }}
        >
          <SectionLabel text="SUPLEMENTACION" />
        </motion.div>

        <div className="max-w-[900px]">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [...brandEase] }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.88] uppercase text-white mb-6"
          >
            LA EVIDENCIA{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>
              manda.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [...brandEase] }}
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/60 text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.7] max-w-[640px]"
          >
            La suplementación no debería basarse en lo que un influencer promociona ni en el packaging de una marca. Debería basarse en lo que la ciencia ha demostrado, con dosis reales, en personas reales, bajo condiciones controladas. Esto es lo que sabemos — y lo que no.
          </motion.p>
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 right-[10%] w-px h-[40%] bg-gradient-to-b from-transparent via-[#F1B91E]/10 to-transparent" />
        <div className="absolute bottom-0 right-[25%] w-px h-[30%] bg-gradient-to-t from-transparent via-[#F1B91E]/5 to-transparent" />
      </section>

      {/* ============================================================ */}
      {/*  2. EVIDENCE PYRAMID                                          */}
      {/* ============================================================ */}
      <section ref={pyramidRef} className="bg-[#111111]" style={{ padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={pyramidInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [...brandEase] }}
        >
          <SectionLabel text="PIRAMIDE DE EVIDENCIA" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] uppercase text-white mb-4"
          >
            NO TODOS LOS SUPLEMENTOS{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>son iguales.</span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/50 text-[1rem] leading-[1.7] max-w-[560px] mb-12"
          >
            Cuanto más arriba en la pirámide, más fuerte es la evidencia científica que respalda el suplemento. Haz clic en cada nivel para ver los detalles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={pyramidInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [...brandEase] }}
          className="mb-10"
        >
          <EvidencePyramid activeTier={activeTier} onSelect={(id) => setActiveTier(activeTier === id ? null : id)} />
        </motion.div>

        {/* Detail card for selected tier */}
        {selectedTier && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [...brandEase] }}
            className="max-w-[680px] mx-auto bg-[#191919] border border-white/5"
            style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: selectedTier.color }}>
                <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, color: selectedTier.textColor }} className="text-[0.9rem]">
                  {selectedTier.id}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-white uppercase tracking-wider text-[0.85rem]">
                TIER {selectedTier.id} — {selectedTier.label}
              </span>
            </div>
            <div className="space-y-4">
              {selectedTier.supplements.map((s) => (
                <div key={s.name} className="border-l-2 pl-4" style={{ borderColor: selectedTier.color }}>
                  <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }} className="text-white text-[1rem] uppercase tracking-wide mb-1">
                    {s.name}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/50 text-[0.9rem] leading-[1.6]">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* ============================================================ */}
      {/*  3. THE BIG THREE                                             */}
      {/* ============================================================ */}
      <section ref={deepDiveRef} className="bg-[#0a0a0a]" style={{ padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={deepDiveInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [...brandEase] }}
        >
          <SectionLabel text="LOS TRES GRANDES" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] uppercase text-white mb-4"
          >
            LO QUE FUNCIONA{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>de verdad.</span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/50 text-[1rem] leading-[1.7] max-w-[560px] mb-16"
          >
            Tres suplementos con décadas de investigación detrás. No necesitas más — y la mayoría de la gente no necesita ni estos si su dieta y entrenamiento están en orden.
          </p>
        </motion.div>

        <div className="space-y-20">
          {bigThree.map((item) => (
            <BigThreeCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. TIMING PROTOCOL                                           */}
      {/* ============================================================ */}
      <section ref={timelineRef} className="bg-[#111111]" style={{ padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [...brandEase] }}
        >
          <SectionLabel text="PROTOCOLO DE TIMING" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] uppercase text-white mb-4"
          >
            CUÁNDO TOMAR{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>cada cosa.</span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/50 text-[1rem] leading-[1.7] max-w-[560px] mb-16"
          >
            Un día tipo. El timing importa para la cafeína. Para casi todo lo demás, la consistencia diaria importa más que la hora exacta.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Horizontal line */}
          <div className="hidden md:block absolute top-[28px] left-0 right-0 h-px bg-white/10" />

          <div className="grid md:grid-cols-5 gap-6 md:gap-4">
            {timeline.map((slot, i) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [...brandEase] }}
                className="relative"
              >
                {/* Time dot */}
                <div className="flex items-center gap-3 md:flex-col md:items-start mb-4">
                  <div className="w-3 h-3 border-2 relative z-10" style={{ borderColor: slot.color, backgroundColor: slot.color === '#F1B91E' ? '#F1B91E' : 'transparent' }} />
                  <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-white/40 text-[0.8rem] tracking-wider">
                    {slot.time}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-[#191919] border border-white/5" style={{ padding: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: slot.color }} className="text-[0.65rem] tracking-[0.2em] uppercase block mb-2">
                    {slot.label}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-white text-[1.1rem] uppercase mb-2">
                    {slot.supplement}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/45 text-[0.8rem] leading-[1.6]">
                    {slot.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. RED FLAGS                                                 */}
      {/* ============================================================ */}
      <section ref={flagsRef} className="bg-[#0a0a0a]" style={{ padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={flagsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [...brandEase] }}
        >
          <SectionLabel text="FILTRO DE MARKETING" />
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] uppercase text-white mb-4"
          >
            CÓMO IDENTIFICAR{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>marketing vacío.</span>
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/50 text-[1rem] leading-[1.7] max-w-[560px] mb-16"
          >
            Si un producto necesita estos trucos para venderse, probablemente no funciona. La evidencia no necesita trucos de marketing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {redFlags.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={flagsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [...brandEase] }}
              className="bg-[#111111] border border-white/5 group hover:border-[#CC3333]/20 transition-colors duration-300"
              style={{ padding: 'clamp(1.5rem,2.5vw,2rem)' }}
            >
              {/* Warning indicator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-[#CC3333]" />
                <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }} className="text-[#CC3333] text-[0.65rem] tracking-[0.2em] uppercase">
                  Red flag
                </span>
              </div>

              <h4 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }} className="text-white text-[1.1rem] uppercase tracking-wide mb-3 leading-tight">
                {item.flag}
              </h4>

              <div className="w-6 h-px bg-[#CC3333]/40 mb-3" />

              <p style={{ fontFamily: 'var(--font-inter)' }} className="text-white/45 text-[0.85rem] leading-[1.6]">
                {item.reality}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. EU REGULATION NOTE                                        */}
      {/* ============================================================ */}
      <section ref={euRef} className="bg-[#111111]" style={{ padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={euInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [...brandEase] }}
          className="max-w-[720px] mx-auto border-l-2 border-[#F1B91E]/30 pl-6"
        >
          <SectionLabel text="REGULACION UE" />
          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/55 text-[1rem] leading-[1.8]"
          >
            En la UE, las alegaciones de salud en suplementos deben estar autorizadas por la EFSA (Autoridad Europea de Seguridad Alimentaria). Si un producto promete algo que no aparece en el registro de alegaciones aprobadas, desconfía. España aplica esta normativa a través de la AESAN. Esto te protege — pero solo si sabes que existe.
          </p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  7. CTA                                                       */}
      {/* ============================================================ */}
      <section ref={ctaRef} className="bg-[#0a0a0a] border-t border-white/5" style={{ padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [...brandEase] }}
          className="max-w-[700px] mx-auto text-center"
        >
          <h2
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, letterSpacing: '-0.02em' }}
            className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.92] uppercase text-white mb-6"
          >
            DUDAS SOBRE{' '}
            <span className="text-[#F1B91E] italic" style={{ textTransform: 'none' }}>suplementación</span>
          </h2>

          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/50 text-[1rem] leading-[1.7] mb-10"
          >
            Antes de comprar nada, habla con alguien que sepa leer la evidencia. Te decimos qué necesitas, qué no, y qué están intentando venderte.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              data-contact
              className="inline-flex items-center gap-3 bg-[#F1B91E] text-[#0a0a0a] hover:bg-[#d9a71a] transition-colors duration-300"
              style={{ padding: '1rem 2rem' }}
            >
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                className="text-[0.75rem] tracking-[0.2em] uppercase"
              >
                Consulta de nutrición
              </span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/15 text-white/70 hover:border-white/30 hover:text-white transition-all duration-300"
              style={{ padding: '1rem 2rem' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
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

          <p
            style={{ fontFamily: 'var(--font-inter)' }}
            className="text-white/25 text-[0.8rem] mt-8 italic"
          >
            Sport Training: solo cuando aporta valor. Pocos productos, calidad contrastada, dosis efectivas.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
