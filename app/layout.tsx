import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const barlow = Barlow_Condensed({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sport Training — Cuerpos Fuertes. Cuerpos Capaces.",
  description:
    "Centro integral de entrenamiento de alto rendimiento en Murcia. HYROX, Funcional, CrossTraining y Entrenamiento Adaptado desde 2007.",
  keywords:
    "entrenamiento, gimnasio Murcia, HYROX, CrossTraining, funcional, personal training, Sport Training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${inter.variable}`}
    >
      <body className="bg-black-st text-white antialiased overflow-x-hidden">
        {children}
        <Script
          id="mcjs"
          strategy="beforeInteractive"
          src="https://chimpstatic.com/mcjs-connected/js/users/e00011af0ea4215e668560151/70fc22bcead51ae5a17dae24a.js"
        />
      </body>
    </html>
  );
}
