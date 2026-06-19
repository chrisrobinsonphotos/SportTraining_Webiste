import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const barlow = Barlow_Condensed({
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://sporttraining.es";
const SITE_NAME = "Sport Training";
const SITE_TAGLINE = "Cuerpos Fuertes. Cuerpos Capaces.";
const SITE_DESCRIPTION =
  "Centro integral de entrenamiento de alto rendimiento en Murcia. HYROX, Funcional, CrossTraining y Entrenamiento Adaptado desde 2007.";

// Google Analytics 4 — property: sporttraining.es (Miguel Ángel's Google account)
const GA_MEASUREMENT_ID = "G-V1SPWK5DVB";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sport Training Murcia — HYROX Training Club Oficial",
    template: `%s — ${SITE_NAME} Murcia`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "entrenamiento Murcia",
    "gimnasio Murcia",
    "HYROX Murcia",
    "CrossTraining",
    "entrenamiento funcional",
    "personal training",
    "entrenamiento adaptado",
    "Sport Training",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  // NOTE: do NOT set `alternates.canonical` here. Next.js inherits metadata from
  // the root layout, so a canonical defined at this level is applied to every
  // page that doesn't override it — pointing /privacidad, /legal and /cookies
  // back at "/", which Google flags as "Duplicate without user-selected
  // canonical". Each page sets its own canonical instead.
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Sport Training Murcia — HYROX Training Club Oficial",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Murcia — HYROX, Funcional, CrossTraining`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sport Training Murcia — HYROX Training Club Oficial",
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons are auto-detected by Next.js from app/icon.png, app/apple-icon.png, app/favicon.ico
  category: "fitness",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-black-st text-white antialiased overflow-x-hidden">
        {/*
          JSON-LD @graph — bundles every schema into one block:
          - ExerciseGym (the business)
          - Service nodes per modality
          - FAQPage with high-intent local questions

          PLACEHOLDERS (flagged in comments, easy to grep):
          - aggregateRating values: update with real GBP numbers
          - openingHours: confirm actual schedule with client
          - priceRange: reflects current Modalities tiers (€30–€450/mes)
        */}
        <Script
          id="ld-graph"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ExerciseGym",
                  "@id": `${SITE_URL}/#gym`,
                  name: SITE_NAME,
                  alternateName: "Sport Training Murcia",
                  url: SITE_URL,
                  logo: `${SITE_URL}/st-logo-black.png`,
                  image: `${SITE_URL}/og-image.jpg`,
                  description: SITE_DESCRIPTION,
                  telephone: "+34647797693",
                  email: "info@sporttraining.es",
                  foundingDate: "2007",
                  priceRange: "€30–€450",
                  currenciesAccepted: "EUR",
                  paymentAccepted: "Cash, Credit Card, Bank Transfer",
                  slogan: SITE_TAGLINE,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "C. Cisne, 3",
                    addressLocality: "Murcia",
                    postalCode: "30009",
                    addressRegion: "Región de Murcia",
                    addressCountry: "ES",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 37.9928,
                    longitude: -1.1282,
                  },
                  areaServed: [
                    { "@type": "City", name: "Murcia" },
                    { "@type": "AdministrativeArea", name: "Región de Murcia" },
                    { "@type": "City", name: "Molina de Segura" },
                    { "@type": "City", name: "Alcantarilla" },
                    { "@type": "City", name: "Beniaján" },
                  ],
                  // Opening hours — REAL data from Google Business Profile (verified 2026-05-07)
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                      ],
                      opens: "06:00",
                      closes: "22:00",
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Saturday"],
                      opens: "09:00",
                      closes: "13:00",
                    },
                  ],
                  // aggregateRating — REAL data from Google Business Profile (verified 2026-05-07)
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.8",
                    reviewCount: "158",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Modalidades de entrenamiento",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: "Entrenamiento Personal (Oro)" },
                        priceSpecification: {
                          "@type": "PriceSpecification",
                          minPrice: "150",
                          maxPrice: "450",
                          priceCurrency: "EUR",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: "Entrenamiento en Grupo (Plata)" },
                        priceSpecification: {
                          "@type": "PriceSpecification",
                          minPrice: "50",
                          maxPrice: "70",
                          priceCurrency: "EUR",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: "Entrenamiento Libre (Bronce)" },
                        priceSpecification: {
                          "@type": "PriceSpecification",
                          price: "30",
                          priceCurrency: "EUR",
                        },
                      },
                    ],
                  },
                  amenityFeature: [
                    { "@type": "LocationFeatureSpecification", name: "HYROX Training Club" },
                    { "@type": "LocationFeatureSpecification", name: "CrossTraining" },
                    { "@type": "LocationFeatureSpecification", name: "Entrenamiento Funcional" },
                    { "@type": "LocationFeatureSpecification", name: "Entrenamiento Adaptado" },
                    { "@type": "LocationFeatureSpecification", name: "Personal Training" },
                    { "@type": "LocationFeatureSpecification", name: "Nutrición Deportiva" },
                  ],
                  sameAs: [
                    SITE_URL,
                    "https://www.instagram.com/sporttraining.mu",
                    "https://facebook.com/sporttrainingbymab",
                    "https://g.page/sport-training-murcia", // GBP short link — confirm exact slug
                  ],
                },
                // ── Per-modality Service schemas ──
                {
                  "@type": "Service",
                  serviceType: "HYROX Training",
                  name: "HYROX Murcia",
                  provider: { "@id": `${SITE_URL}/#gym` },
                  areaServed: { "@type": "City", name: "Murcia" },
                  description:
                    "Entrenamiento HYROX en Sport Training Murcia. Preparación específica para la competición HYROX, combinando fuerza, resistencia y técnica.",
                },
                {
                  "@type": "Service",
                  serviceType: "Functional Training",
                  name: "Entrenamiento Funcional Murcia",
                  provider: { "@id": `${SITE_URL}/#gym` },
                  areaServed: { "@type": "City", name: "Murcia" },
                  description:
                    "Entrenamiento funcional en Sport Training Murcia. Movimientos compuestos para mejorar fuerza, movilidad y resistencia aplicada a la vida real.",
                },
                {
                  "@type": "Service",
                  serviceType: "CrossTraining",
                  name: "CrossTraining Murcia",
                  provider: { "@id": `${SITE_URL}/#gym` },
                  areaServed: { "@type": "City", name: "Murcia" },
                  description:
                    "CrossTraining en Sport Training Murcia. Entrenamiento de alta intensidad combinando fuerza, cardio y trabajo metabólico.",
                },
                {
                  "@type": "Service",
                  serviceType: "Adaptive Training",
                  name: "Entrenamiento Adaptado Murcia",
                  provider: { "@id": `${SITE_URL}/#gym` },
                  areaServed: { "@type": "City", name: "Murcia" },
                  description:
                    "Entrenamiento adaptado para personas con discapacidad en Sport Training Murcia. Programa diseñado individualmente según necesidades y objetivos.",
                },
                {
                  "@type": "Service",
                  serviceType: "Personal Training",
                  name: "Entrenamiento Personal Murcia",
                  provider: { "@id": `${SITE_URL}/#gym` },
                  areaServed: { "@type": "City", name: "Murcia" },
                  description:
                    "Entrenamiento personal 1:1 en Sport Training Murcia. Plan completamente personalizado, en instalaciones o a domicilio.",
                },
                {
                  "@type": "Service",
                  serviceType: "Nutrition Coaching",
                  name: "Nutrición Deportiva Murcia",
                  provider: { "@id": `${SITE_URL}/#gym` },
                  areaServed: { "@type": "City", name: "Murcia" },
                  description:
                    "Asesoramiento nutricional para deportistas en Sport Training Murcia. Planes integrados con el entrenamiento.",
                },
                // ── FAQ schema — high-intent local questions ──
                {
                  "@type": "FAQPage",
                  "@id": `${SITE_URL}/#faq`,
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "¿Dónde está Sport Training en Murcia?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sport Training está en C. Cisne, 3, 30009 Murcia. Estamos en el centro de la ciudad, con acceso fácil desde cualquier punto de la Región de Murcia.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Qué es HYROX y se entrena en Sport Training?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "HYROX es una competición fitness que combina carrera y ejercicios funcionales. En Sport Training somos un centro afiliado HYROX con clases preparatorias específicas en Murcia.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Cuánto cuesta entrenar en Sport Training Murcia?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Tenemos tres modalidades. Entrenamiento Libre desde €30/mes, Entrenamiento en Grupo desde €50/mes y Entrenamiento Personal desde €150/mes. Todos los planes incluyen acceso completo al gimnasio.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Ofrecéis entrenamiento personal?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sí. Nuestro plan Oro incluye entrenamiento personal 1:1 con seguimiento completo, programa personalizado y opción a domicilio. Disponible en paquetes de 4, 8, 12 y 16 sesiones al mes.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Tenéis entrenamiento adaptado para personas con discapacidad?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sí. Sport Training Murcia ofrece un programa de Entrenamiento Adaptado diseñado individualmente para personas con discapacidad, dirigido por entrenadores con formación específica.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Puedo probar una clase antes de apuntarme?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sí. Contacta por WhatsApp al +34 622 443 495 o desde la página de contacto y te organizamos una sesión de prueba en Sport Training Murcia.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Cuál es el horario del gimnasio?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sport Training Murcia abre de lunes a viernes de 6:00 a 22:00 y los sábados de 9:00 a 13:00. Domingos cerrado.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
        {/* Google Analytics 4 — gtag.js loader + config */}
        <Script
          id="ga-loader"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script
          id="mcjs"
          strategy="afterInteractive"
          src="https://chimpstatic.com/mcjs-connected/js/users/e00011af0ea4215e668560151/70fc22bcead51ae5a17dae24a.js"
        />
      </body>
    </html>
  );
}
