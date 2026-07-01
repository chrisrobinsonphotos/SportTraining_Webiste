/**
 * Sport Training — Tienda de Suplementos · Catálogo (source of truth)
 *
 * Copy is ported verbatim from `business/nutrition/SportTraining Supplement Copy.pages`.
 * The "venta asesorada" model (Nutrición Dossier, Bloque 5): every product carries an
 * educational ficha — ¿Qué es? / utilidad / perfil de usuario / modo de empleo.
 *
 * COMMERCE FIELDS ARE PLACEHOLDERS until confirmed with María José:
 *   - priceEUR      → final IVA-inclusive price per product
 *   - sku           → supplier/internal SKU
 *   - stripePriceId → Stripe Price ID once the account + products are set up
 * Do not ship checkout live until these are populated. See
 * records/session-outputs/supplement-store_plan_v1.md
 *
 * Last updated: 2026-07-01
 */

export interface FaqItem {
  q: string
  a: string
}

export interface ForWhoItem {
  title: string
  text: string
}

export interface EduBlock {
  heading: string
  /** Paragraphs and/or list items. Rendered as stacked prose blocks. */
  body: string[]
}

export type ProductCategory = 'Rendimiento' | 'Recuperación' | 'Salud'

export interface Product {
  id: string
  slug: string
  /** Short display name used on cards. */
  name: string
  /** Full product label. */
  fullName: string
  category: ProductCategory
  /** One-line subtitle under the name. */
  tagline: string
  /** Opening description paragraphs. */
  intro: string[]
  /** Optional emphasis badge, e.g. evidence marker. */
  badge?: string
  /** Format / flavour note where relevant. */
  variantNote?: string
  /** "¿Qué beneficios aporta?" — checkmark list (markers rendered in UI). */
  benefits: string[]
  /** "¿Para quién está recomendado?" */
  forWho: ForWhoItem[]
  /** Educational blocks — ¿Qué es?, ¿Cómo actúa?, ¿Por qué elegir…?, etc. */
  education: EduBlock[]
  /** "¿Cómo tomarlo?" */
  howTo: string[]
  faq: FaqItem[]
  /** "En Sport Training Nutrición lo recomendamos especialmente si…" */
  recommendedIf: string[]
  /** "¿Por qué elegir…?" */
  whyChoose: string[]
  /** "Información importante" — legal / safety disclaimers. */
  disclaimer: string[]
  image: string
  imageAlt: string

  // ── Commerce (placeholders — confirm before go-live) ──
  priceEUR: number | null
  sku: string | null
  stripePriceId: string | null
  inStock: boolean
}

const DISCLAIMER_BASE = [
  'Los complementos alimenticios no deben utilizarse como sustitutos de una dieta variada y equilibrada ni de un estilo de vida saludable.',
  'No superar la dosis diaria recomendada.',
  'Mantener fuera del alcance de los niños.',
]

export const products: Product[] = [
  {
    id: 'creatina-gummies',
    slug: 'creatina-atp-gummies',
    name: 'Creatine ATP Gummies',
    fullName: 'Creatine ATP Gummies',
    category: 'Rendimiento',
    tagline: 'Creatina en gominolas: rendimiento, fuerza y comodidad en cada toma',
    badge: 'Uno de los suplementos con mayor evidencia científica',
    intro: [
      'Las Creatine ATP Gummies ofrecen una forma práctica, cómoda y agradable de suplementarse con creatina monohidrato. Mantienen los beneficios de uno de los suplementos con mayor respaldo científico, pero en un formato fácil de consumir, sin necesidad de mezclar con agua ni utilizar batidos.',
      'Cada dosis aporta creatina para ayudarte a mejorar el rendimiento en ejercicios de alta intensidad y corta duración, siendo una excelente opción para deportistas que buscan fuerza, potencia y una mejor recuperación entre series.',
    ],
    benefits: [
      'Mejora el rendimiento en ejercicios repetidos de alta intensidad.*',
      'Favorece el aumento de fuerza y potencia muscular.',
      'Ayuda a realizar entrenamientos más intensos.',
      'Puede contribuir a mejorar la recuperación entre esfuerzos repetidos.',
      'Formato muy cómodo para llevar al gimnasio, al trabajo o de viaje.',
      'No necesita mezclarse con agua ni preparar batidos.',
      'Sabor agradable que facilita la constancia.',
    ],
    forWho: [
      { title: 'Personas que entrenan fuerza', text: 'Ideal para quienes realizan entrenamiento con pesas, máquinas o ejercicios de fuerza y desean mejorar su rendimiento.' },
      { title: 'Deportistas de alto rendimiento', text: 'También es una excelente opción para deportes que requieren explosividad, velocidad o esfuerzos repetidos: CrossTraining, CrossFit®, halterofilia, powerlifting, fútbol, pádel, tenis, rugby, baloncesto o atletismo.' },
      { title: 'Personas que buscan ganar masa muscular', text: 'Siempre acompañada de un entrenamiento adecuado y una alimentación adaptada al objetivo.' },
      { title: 'Personas activas', text: 'Aunque no compitas, si entrenas de forma regular, la creatina puede ayudarte a entrenar con mayor calidad.' },
    ],
    education: [
      { heading: '¿Qué es la creatina?', body: [
        'La creatina es un compuesto que el organismo produce de forma natural y que también obtenemos en pequeñas cantidades a través de alimentos como la carne y el pescado.',
        'Se almacena principalmente en el músculo en forma de fosfocreatina, donde participa en la producción rápida de energía (ATP), especialmente durante ejercicios explosivos de corta duración.',
        'Por ello, es uno de los suplementos deportivos más estudiados y utilizados en todo el mundo.',
      ] },
      { heading: '¿Cómo actúa?', body: [
        'Durante esfuerzos intensos, el organismo consume rápidamente ATP, la principal fuente de energía muscular.',
        'La creatina ayuda a regenerar ese ATP con mayor rapidez, permitiendo mantener la intensidad durante más repeticiones o series.',
        'Con el paso de las semanas, esto puede traducirse en mejores adaptaciones al entrenamiento.',
      ] },
      { heading: '¿Es necesario hacer fase de carga?', body: [
        'La fase de carga puede acelerar la saturación de los depósitos musculares, pero no es imprescindible.',
        'Tomando la dosis recomendada diariamente también se obtienen los mismos beneficios, aunque de forma más gradual.',
      ] },
      { heading: '¿Cuándo empezaré a notar sus efectos?', body: [
        'Generalmente entre las 3 y 4 semanas de uso continuado, dependiendo de la dosis diaria y del nivel inicial de creatina muscular.',
      ] },
    ],
    howTo: [
      'La dosis diaria dependerá de la cantidad de creatina que aporte cada ración del producto. Lo importante es alcanzar una ingesta diaria de aproximadamente 3 gramos de creatina, ya que es la cantidad respaldada por la evidencia científica para mejorar el rendimiento en ejercicios de alta intensidad.',
      'Puedes consumirla antes del entrenamiento, después del entrenamiento o en cualquier momento del día, siempre que seas constante. La regularidad es más importante que el momento exacto de la toma.',
      '*El efecto beneficioso se obtiene con una ingesta diaria de 3 g de creatina.',
    ],
    faq: [
      { q: '¿Engorda?', a: 'La creatina no aumenta la grasa corporal. Puede producir un ligero incremento del peso debido a una mayor hidratación dentro del músculo, lo que forma parte de su mecanismo de acción.' },
      { q: '¿Es solo para culturistas?', a: 'En absoluto. Es útil para cualquier persona que realice entrenamientos de fuerza o ejercicios de alta intensidad, independientemente de su nivel.' },
      { q: '¿Puedo tomarla todos los días?', a: 'Para mantener los depósitos musculares de creatina es recomendable consumirla de forma diaria, incluso en los días de descanso.' },
      { q: '¿Es segura?', a: 'La creatina es uno de los suplementos deportivos con mayor respaldo científico y un excelente perfil de seguridad cuando se consume en las dosis recomendadas por personas sanas. Si padeces una enfermedad renal o tienes alguna condición médica relevante, consulta previamente con un profesional sanitario.' },
    ],
    recommendedIf: [
      'Quieres aumentar fuerza y potencia.',
      'Buscas mejorar tu rendimiento en el gimnasio.',
      'Practicas deportes explosivos o de alta intensidad.',
      'Te cuesta ser constante con la creatina en polvo.',
      'Prefieres un formato práctico para llevar siempre contigo.',
    ],
    whyChoose: [
      'Formato cómodo y listo para consumir.',
      'Sin necesidad de preparar batidos.',
      'Ideal para llevar en la mochila o durante un viaje.',
      'Excelente alternativa para quienes no disfrutan del sabor o la textura de la creatina en polvo.',
      'Facilita mantener una suplementación diaria constante.',
    ],
    disclaimer: DISCLAIMER_BASE,
    image: '/tienda/creatina-gummies.jpg',
    imageAlt: 'Creatine ATP Gummies — Sport Training',
    priceEUR: 24.9, // ~PLACEHOLDER — confirm with María José
    sku: null,
    stripePriceId: null,
    inStock: true,
  },

  {
    id: 'whey-protein',
    slug: 'wpc-whey-protein',
    name: 'WPC Whey Protein',
    fullName: 'WPC Whey Protein Concentrated',
    category: 'Rendimiento',
    tagline: 'Proteína de suero concentrada para favorecer la recuperación y el desarrollo muscular',
    variantNote: 'Ahora solo disponible en sabor chocolate.',
    intro: [
      'La WPC Whey Protein Concentrated es una proteína de suero de leche de alta calidad, diseñada para ayudarte a alcanzar tus necesidades diarias de proteína de una forma cómoda, rápida y deliciosa.',
      'Gracias a su excelente perfil de aminoácidos y a su rápida digestión, es una gran aliada para favorecer la recuperación muscular tras el entrenamiento, mantener la masa muscular y apoyar su crecimiento cuando se combina con ejercicio de fuerza.',
      'Además, su sabor y fácil preparación la convierten en una opción práctica para cualquier momento del día.',
    ],
    benefits: [
      'Contribuye al crecimiento de la masa muscular.',
      'Ayuda a mantener la masa muscular.',
      'Favorece la recuperación después del entrenamiento.',
      'Aporta proteínas de alto valor biológico.',
      'Rica en aminoácidos esenciales y BCAA.',
      'Fácil digestión y excelente disolución.',
      'Ideal para completar la ingesta diaria de proteínas.',
    ],
    forWho: [
      { title: 'Personas que entrenan fuerza', text: 'Si realizas entrenamiento con pesas o máquinas, la proteína puede ayudarte a cubrir tus necesidades nutricionales para favorecer la recuperación y las adaptaciones al entrenamiento.' },
      { title: 'Deportistas de resistencia', text: 'Corredores, ciclistas, nadadores o triatletas también necesitan proteínas para reparar los tejidos musculares tras el esfuerzo.' },
      { title: 'Personas que buscan aumentar masa muscular', text: 'La proteína es uno de los nutrientes fundamentales cuando el objetivo es desarrollar músculo, siempre acompañada de entrenamiento y una alimentación adecuada.' },
      { title: 'Personas que desean perder grasa', text: 'Durante una etapa de pérdida de peso, una ingesta adecuada de proteínas ayuda a conservar la masa muscular mientras disminuye la grasa corporal.' },
      { title: 'Personas activas', text: 'No hace falta ser un atleta profesional. Si entrenas con regularidad y te cuesta llegar a la cantidad diaria de proteína mediante la alimentación, un batido puede ser una solución práctica.' },
    ],
    education: [
      { heading: '¿Qué es la proteína Whey?', body: [
        'La proteína Whey (proteína de suero de leche) se obtiene durante el proceso de elaboración del queso y destaca por su elevado valor biológico.',
        'Contiene los nueve aminoácidos esenciales que el organismo necesita y no puede fabricar por sí mismo, además de una alta concentración de leucina, un aminoácido clave en la síntesis de proteínas musculares.',
        'Por su rápida absorción, es una de las proteínas más utilizadas tanto por deportistas como por personas activas.',
      ] },
      { heading: '¿Por qué es importante consumir suficiente proteína?', body: [
        'Las proteínas intervienen en numerosos procesos del organismo: formación y mantenimiento de la masa muscular, recuperación de los tejidos tras el ejercicio, producción de enzimas y hormonas, funcionamiento normal del sistema inmunitario y mantenimiento de huesos y otros tejidos.',
        'Cuando la alimentación no cubre las necesidades diarias, una proteína de calidad puede ayudarte a alcanzarlas de forma sencilla.',
      ] },
      { heading: '¿Cuánta proteína necesito?', body: [
        'Las necesidades varían según cada persona. Como orientación general: personas sedentarias, alrededor de 0,8 g/kg de peso corporal al día; personas físicamente activas, aproximadamente 1,2–2 g/kg/día, dependiendo del tipo e intensidad del entrenamiento y de los objetivos.',
        'Estas cifras son orientativas y pueden variar según la situación individual.',
      ] },
    ],
    howTo: [
      'Mezcla la cantidad recomendada por el fabricante con agua o leche, según tus preferencias.',
      'Puedes tomarla después del entrenamiento, como desayuno o merienda, entre comidas, o siempre que necesites aumentar tu aporte diario de proteínas.',
      'Lo importante es cubrir las necesidades de proteína a lo largo del día.',
    ],
    faq: [
      { q: '¿La proteína engorda?', a: 'La proteína aporta calorías, igual que cualquier alimento, pero por sí sola no provoca un aumento de grasa corporal. Todo dependerá del conjunto de tu alimentación y de tu balance energético.' },
      { q: '¿Es solo para personas que hacen musculación?', a: 'Puede ser útil para cualquier persona que necesite aumentar su ingesta de proteínas, independientemente del deporte que practique.' },
      { q: '¿Es mejor tomarla con agua o con leche?', a: 'Con agua obtendrás una digestión más rápida y menos calorías. Con leche conseguirás un batido más cremoso y un mayor aporte de proteínas y nutrientes. Ambas opciones son correctas.' },
      { q: '¿Puede sustituir una comida?', a: 'Un batido de proteína es un complemento alimenticio y no debe sustituir de forma habitual una comida completa y equilibrada.' },
      { q: '¿Tiene lactosa?', a: 'Al tratarse de una proteína concentrada de suero de leche, contiene una pequeña cantidad de lactosa. Las personas con intolerancia deberán valorar su tolerancia individual o considerar una proteína aislada (Whey Isolate).' },
    ],
    recommendedIf: [
      'Entrenas entre 2 y 6 días por semana.',
      'Quieres ganar masa muscular.',
      'Estás en una etapa de pérdida de grasa y deseas conservar el músculo.',
      'Te cuesta llegar a la cantidad diaria de proteínas solo con la alimentación.',
      'Buscas una forma práctica y rápida de recuperarte después del entrenamiento.',
    ],
    whyChoose: [
      'Proteína de alto valor biológico.',
      'Excelente perfil de aminoácidos esenciales.',
      'Rica en BCAA de forma natural.',
      'Fácil digestión y gran solubilidad.',
      'Delicioso sabor para facilitar la constancia.',
      'Ideal para cualquier nivel de entrenamiento.',
    ],
    disclaimer: DISCLAIMER_BASE,
    image: '/tienda/whey-protein.jpg',
    imageAlt: 'WPC Whey Protein Concentrated — Sport Training',
    priceEUR: 34.9, // ~PLACEHOLDER — confirm with María José
    sku: null,
    stripePriceId: null,
    inStock: true,
  },

  {
    id: 'magnesio',
    slug: 'magnesium-bisglycinate',
    name: 'Magnesium Bisglycinate',
    fullName: 'Magnesium Bisglycinate',
    category: 'Recuperación',
    tagline: 'Magnesio de alta absorción para apoyar la función muscular, el sistema nervioso y reducir el cansancio',
    intro: [
      'El Magnesium Bisglycinate aporta magnesio en forma de bisglicinato, una de las formas orgánicas con mejor biodisponibilidad y excelente tolerancia digestiva.',
      'El magnesio es un mineral esencial que participa en más de 300 reacciones enzimáticas del organismo. Interviene en el funcionamiento normal de los músculos, el sistema nervioso, el metabolismo energético y contribuye a disminuir el cansancio y la fatiga.',
      'Es un suplemento especialmente interesante para personas físicamente activas, deportistas y quienes buscan apoyar su bienestar general.',
    ],
    benefits: [
      'Contribuye al funcionamiento normal de los músculos.',
      'Ayuda al funcionamiento normal del sistema nervioso.',
      'Contribuye a disminuir el cansancio y la fatiga.',
      'Participa en el metabolismo energético normal.',
      'Contribuye al mantenimiento de los huesos en condiciones normales.',
      'Favorece la síntesis normal de proteínas.',
      'Participa en el equilibrio electrolítico.',
      'Forma de alta absorción y buena tolerancia digestiva.',
    ],
    forWho: [
      { title: 'Personas que entrenan con frecuencia', text: 'El ejercicio físico aumenta las necesidades de magnesio, especialmente cuando los entrenamientos son intensos o prolongados.' },
      { title: 'Personas con elevada carga física o mental', text: 'El magnesio participa en procesos relacionados con la producción de energía y el funcionamiento normal del sistema nervioso.' },
      { title: 'Personas que sufren fatiga o cansancio', text: 'Siempre que exista una ingesta insuficiente o un aumento de las necesidades, el magnesio puede ayudar a reducir el cansancio y la fatiga.' },
      { title: 'Personas que desean cuidar su salud muscular', text: 'Es un mineral fundamental para el funcionamiento normal de la musculatura.' },
      { title: 'Alimentación pobre en magnesio', text: 'Especialmente si consumen pocas verduras de hoja verde, frutos secos, legumbres o cereales integrales.' },
    ],
    education: [
      { heading: '¿Por qué elegir bisglicinato de magnesio?', body: [
        'Existen diferentes formas de magnesio, pero no todas presentan la misma absorción.',
        'El bisglicinato de magnesio está unido al aminoácido glicina, lo que favorece una buena absorción y suele ofrecer una mejor tolerancia digestiva que otras formas, reduciendo la probabilidad de molestias gastrointestinales.',
        'Por ello, es una de las opciones más utilizadas cuando se busca una suplementación diaria.',
      ] },
      { heading: '¿Qué alimentos contienen magnesio?', body: [
        'Aunque la suplementación puede ser útil en determinadas situaciones, también es recomendable incluir alimentos ricos en este mineral: frutos secos (almendras, anacardos, nueces), semillas (calabaza, sésamo, chía), legumbres, verduras de hoja verde, cacao puro y cereales integrales.',
      ] },
    ],
    howTo: [
      'La recomendación habitual es seguir la dosis indicada por el fabricante.',
      'Muchas personas prefieren tomarlo con la cena o antes de acostarse, aunque puede consumirse en cualquier momento del día junto con una comida.',
      'Lo importante es mantener una toma constante.',
    ],
    faq: [
      { q: '¿El magnesio ayuda a dormir?', a: 'El magnesio no es un somnífero. Sin embargo, al contribuir al funcionamiento normal del sistema nervioso y ayudar a disminuir el cansancio y la fatiga, algunas personas refieren una sensación de mayor relajación o descanso. Los resultados pueden variar de una persona a otra.' },
      { q: '¿Puede ayudar con los calambres musculares?', a: 'Los calambres tienen múltiples causas y no siempre se deben a un déficit de magnesio. Si existe una deficiencia de este mineral, corregirla puede ser beneficioso, pero el magnesio no debe considerarse un tratamiento específico para todos los tipos de calambres.' },
      { q: '¿Puedo tomarlo todos los días?', a: 'Siempre que se respeten las dosis recomendadas, el magnesio puede formar parte de una suplementación diaria.' },
      { q: '¿Tiene efectos secundarios?', a: 'En las dosis recomendadas suele tolerarse muy bien. Un consumo excesivo puede provocar molestias digestivas, como diarrea, especialmente con algunas formas de magnesio. El bisglicinato destaca precisamente por su buena tolerancia.' },
    ],
    recommendedIf: [
      'Entrenas varios días por semana.',
      'Buscas favorecer una correcta función muscular.',
      'Quieres apoyar tu recuperación tras el ejercicio.',
      'Te notas cansado o con una elevada carga física o mental.',
      'Deseas complementar una alimentación con bajo aporte de magnesio.',
    ],
    whyChoose: [
      'Magnesio en forma de bisglicinato, con alta biodisponibilidad.',
      'Excelente tolerancia digestiva.',
      'Apto para una suplementación diaria.',
      'Ideal para personas activas y deportistas.',
      'Fácil de incorporar a tu rutina de bienestar.',
    ],
    disclaimer: DISCLAIMER_BASE,
    image: '/tienda/magnesio-bisglicinato.jpg',
    imageAlt: 'Magnesium Bisglycinate — Sport Training',
    priceEUR: 18.9, // ~PLACEHOLDER — confirm with María José
    sku: null,
    stripePriceId: null,
    inStock: true,
  },

  {
    id: 'omega-3',
    slug: 'o3-super-omega',
    name: 'O3 Super Omega',
    fullName: 'O3 Super Omega',
    category: 'Salud',
    tagline: 'Omega-3 de alta concentración para cuidar tu corazón, cerebro y rendimiento',
    intro: [
      'O3 Super Omega aporta aceite de pescado purificado con una elevada concentración de ácidos grasos Omega-3 EPA y DHA, dos nutrientes esenciales que desempeñan un papel fundamental en el funcionamiento normal del organismo.',
      'Los ácidos grasos Omega-3 participan en numerosos procesos fisiológicos y son especialmente importantes para la salud cardiovascular, la función cerebral y el mantenimiento de la visión. Además, son un excelente complemento para personas activas y deportistas que buscan cuidar su bienestar general.',
      'Gracias a su alta concentración, este suplemento proporciona una cantidad significativa de EPA y DHA en una dosis cómoda y fácil de incorporar a la rutina diaria.',
    ],
    benefits: [
      'El EPA y el DHA contribuyen al funcionamiento normal del corazón.*',
      'El DHA contribuye al mantenimiento de la función cerebral normal.**',
      'El DHA contribuye al mantenimiento de una visión normal.**',
      'Alta concentración de Omega-3 por dosis.',
      'Aceite de pescado purificado de alta calidad.',
      'Fácil de tomar y de incorporar a cualquier rutina.',
    ],
    forWho: [
      { title: 'Personas que entrenan con frecuencia', text: 'El Omega-3 puede formar parte de una estrategia nutricional orientada al cuidado de la salud general en personas físicamente activas.' },
      { title: 'Personas que consumen poco pescado azul', text: 'Si en tu alimentación apenas incluyes salmón, sardinas, caballa, atún o boquerones, un suplemento puede ayudarte a aumentar la ingesta de EPA y DHA.' },
      { title: 'Personas que desean cuidar su salud cardiovascular', text: 'Los ácidos grasos Omega-3 forman parte de una alimentación saludable orientada al mantenimiento de la función normal del corazón.' },
      { title: 'Adultos de mediana edad', text: 'Con el paso de los años, mantener unos hábitos saludables, una alimentación equilibrada y un adecuado aporte de Omega-3 puede formar parte de una estrategia global de bienestar.' },
    ],
    education: [
      { heading: '¿Qué son el EPA y el DHA?', body: [
        'Los Omega-3 son grasas poliinsaturadas esenciales que el organismo necesita obtener a través de la alimentación o la suplementación. Los dos más importantes son el EPA y el DHA.',
        'EPA (Ácido Eicosapentaenoico): relacionado principalmente con la salud cardiovascular y ampliamente estudiado por su papel en diferentes procesos fisiológicos.',
        'DHA (Ácido Docosahexaenoico): es un componente estructural del cerebro y la retina, por lo que resulta esencial para el mantenimiento de la función cerebral y la visión normales.',
      ] },
      { heading: '¿Por qué elegir un Omega-3 de alta concentración?', body: [
        'No todos los suplementos de Omega-3 contienen la misma cantidad de EPA y DHA.',
        'La calidad de un Omega-3 no depende únicamente de la cantidad de aceite de pescado, sino de la concentración real de estos dos ácidos grasos.',
        'Nuestro O3 Super Omega ofrece una elevada concentración de EPA y DHA, permitiendo obtener una cantidad significativa de Omega-3 con menos cápsulas.',
      ] },
      { heading: '¿Qué alimentos son ricos en Omega-3?', body: [
        'Aunque la suplementación puede ser útil en determinadas situaciones, también es recomendable consumir regularmente alimentos ricos en Omega-3: salmón, sardinas, caballa, arenque, boquerones, atún y trucha.',
      ] },
    ],
    howTo: [
      'La recomendación habitual es seguir la dosis indicada por el fabricante.',
      'Se aconseja tomar las cápsulas junto con una comida, preferiblemente aquella que contenga algo de grasa, para favorecer una buena absorción.',
      '*El efecto beneficioso se obtiene con una ingesta diaria de 250 mg de EPA y DHA. **El efecto beneficioso se obtiene con una ingesta diaria de 250 mg de DHA.',
    ],
    faq: [
      { q: '¿El Omega-3 es solo para deportistas?', a: 'Es un suplemento orientado al cuidado de la salud general y puede ser útil tanto para personas activas como para quienes simplemente desean aumentar su consumo de EPA y DHA.' },
      { q: '¿Puedo tomarlo todos los días?', a: 'El Omega-3 suele formar parte de una suplementación diaria cuando la alimentación no aporta cantidades suficientes de estos ácidos grasos.' },
      { q: '¿Es mejor tomarlo por la mañana o por la noche?', a: 'No existe un momento específico que sea superior. Lo más recomendable es tomarlo junto con una comida para favorecer su absorción y facilitar la constancia.' },
      { q: '¿Tiene contraindicaciones?', a: 'Las personas que toman medicamentos anticoagulantes o antiagregantes deben consultar con su médico antes de iniciar cualquier suplementación con Omega-3.' },
    ],
    recommendedIf: [
      'Entrenas varios días por semana.',
      'Comes poco pescado azul.',
      'Quieres cuidar tu salud cardiovascular.',
      'Buscas complementar una alimentación equilibrada con un Omega-3 de alta calidad.',
      'Prefieres un suplemento con elevada concentración de EPA y DHA.',
    ],
    whyChoose: [
      'Alta concentración de EPA y DHA.',
      'Aceite de pescado purificado.',
      'Excelente relación calidad-concentración.',
      'Fácil de incorporar a la rutina diaria.',
      'Ideal para personas activas y deportistas.',
    ],
    disclaimer: DISCLAIMER_BASE,
    image: '/tienda/omega-3.jpg',
    imageAlt: 'O3 Super Omega — Sport Training',
    priceEUR: 19.9, // ~PLACEHOLDER — confirm with María José
    sku: null,
    stripePriceId: null,
    inStock: true,
  },

  {
    id: 'vitamina-d3-k2',
    slug: 'vitamina-d3-k2',
    name: 'Vitamina D3 + K2',
    fullName: 'Vitamina D3 + K2 (MenaQ7®)',
    category: 'Salud',
    tagline: 'Un apoyo para tus huesos, músculos y bienestar general',
    intro: [
      'La combinación de Vitamina D3 y Vitamina K2 (MenaQ7®) reúne dos nutrientes que trabajan de forma complementaria para favorecer el mantenimiento de unos huesos sanos y contribuir al funcionamiento normal del organismo.',
      'La vitamina D3 ayuda a absorber y utilizar correctamente el calcio, mientras que la vitamina K2 contribuye a dirigir ese calcio hacia donde realmente se necesita: los huesos.',
      'Es una combinación especialmente interesante para personas con poca exposición al sol, deportistas, adultos de mediana edad y personas que desean cuidar su salud ósea y muscular.',
    ],
    benefits: [
      'Contribuye al mantenimiento de los huesos en condiciones normales.',
      'Ayuda al funcionamiento normal de los músculos.',
      'Favorece la absorción y utilización normal del calcio y del fósforo.',
      'Contribuye al funcionamiento normal del sistema inmunitario.',
      'La vitamina K participa en el mantenimiento normal de los huesos.',
      'Fórmula con vitamina K2 MenaQ7®, una de las formas mejor estudiadas de vitamina K2 (MK-7).',
    ],
    forWho: [
      { title: 'Personas con poca exposición solar', text: 'Si pasas la mayor parte del día en interiores, trabajas en oficina o entrenas siempre en espacios cerrados, es posible que tu síntesis de vitamina D sea limitada.' },
      { title: 'Deportistas', text: 'La vitamina D participa en el funcionamiento normal de la musculatura y es un nutriente importante para quienes realizan actividad física de forma habitual.' },
      { title: 'Adultos a partir de 40-50 años', text: 'Con el paso del tiempo adquiere mayor importancia mantener una buena salud ósea y muscular.' },
      { title: 'Personas que desean cuidar sus huesos', text: 'Especialmente cuando la ingesta de calcio es adecuada y se busca un correcto aprovechamiento de este mineral.' },
      { title: 'Personas con niveles bajos de vitamina D', text: 'Siempre siguiendo la recomendación de un profesional sanitario y, preferiblemente, tras una analítica que confirme la necesidad de suplementación.' },
    ],
    education: [
      { heading: '¿Cómo actúan juntas la vitamina D3 y la vitamina K2?', body: [
        'La vitamina D3 favorece la absorción intestinal del calcio.',
        'La vitamina K2 participa en la activación de determinadas proteínas que ayudan a incorporar ese calcio al tejido óseo.',
        'Por eso ambas vitaminas suelen utilizarse conjuntamente como una estrategia nutricional complementaria.',
      ] },
      { heading: '¿Cuándo puede ser especialmente interesante?', body: [
        'Durante los meses con menos horas de sol.',
        'Si trabajas en interiores o utilizas protección solar de forma habitual (algo recomendable para proteger la piel).',
        'Si realizas entrenamiento de fuerza o buscas cuidar tu salud ósea a largo plazo.',
        'En personas mayores con necesidades aumentadas, siempre bajo supervisión profesional.',
      ] },
    ],
    howTo: [
      'La recomendación habitual es 1 cápsula al día, preferiblemente junto a una comida que contenga algo de grasa, ya que ambas vitaminas son liposolubles.',
      'No superar la dosis diaria recomendada salvo indicación de un profesional sanitario.',
    ],
    faq: [
      { q: '¿Necesito tomar vitamina D durante todo el año?', a: 'No necesariamente. La necesidad depende de factores como la exposición solar, la alimentación, la edad, el tono de piel, la estación del año y, sobre todo, de los niveles sanguíneos de vitamina D.' },
      { q: '¿Por qué lleva vitamina K2?', a: 'Porque complementa la acción de la vitamina D participando en el mantenimiento normal de los huesos.' },
      { q: '¿Es un producto solo para deportistas?', a: 'No. Aunque es muy utilizada por personas activas, también puede ser interesante para cualquier adulto que quiera cuidar su salud ósea y muscular.' },
      { q: '¿Puedo tomarla si estoy tomando anticoagulantes?', a: 'Si estás en tratamiento con antagonistas de la vitamina K (como la warfarina o el acenocumarol/Sintrom®), no debes tomar suplementos con vitamina K sin consultar previamente con tu médico, ya que pueden interferir con el tratamiento.' },
    ],
    recommendedIf: [
      'Entrenas en el gimnasio entre 3 y 6 días por semana.',
      'Pasas muchas horas trabajando en interiores.',
      'Quieres cuidar tu salud ósea y muscular.',
      'Buscas una suplementación con respaldo científico y materias primas de calidad.',
    ],
    whyChoose: [
      'Fórmula con vitamina K2 MenaQ7® (MK-7), una de las formas mejor estudiadas.',
      'Dos nutrientes complementarios en una sola toma diaria.',
      'Pensada para personas activas y para el cuidado óseo a largo plazo.',
      'Respaldo científico y materias primas de calidad.',
    ],
    disclaimer: DISCLAIMER_BASE,
    image: '/tienda/vitamina-d3-k2.jpg',
    imageAlt: 'Vitamina D3 + K2 (MenaQ7) — Sport Training',
    priceEUR: 16.9, // ~PLACEHOLDER — confirm with María José
    sku: null,
    stripePriceId: null,
    inStock: true,
  },
]

/* ── Helpers ── */

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)

export const productById = (id: string): Product | undefined =>
  products.find((p) => p.id === id)

export const productCategories: ProductCategory[] = ['Rendimiento', 'Recuperación', 'Salud']
