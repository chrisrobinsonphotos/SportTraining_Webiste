import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o ha sido movida. Vuelve al inicio para seguir entrenando con Sport Training Murcia.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen">
        <section
          className="relative px-6 md:px-12 lg:px-16 pb-32 border-b border-white/8"
          style={{ paddingTop: "180px" }}
        >
          <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-[1100px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#F1B91E]" />
              <span
                className="text-[#F1B91E] text-[11px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                Error 404
              </span>
            </div>

            {/* Big number */}
            <h1
              className="text-[40vw] md:text-[28vw] lg:text-[22vw] leading-[0.85] uppercase text-white"
              style={{ fontFamily: "var(--font-barlow)", fontWeight: 900 }}
            >
              404
            </h1>

            {/* Headline */}
            <h2
              className="text-[8vw] md:text-[5vw] lg:text-[3.5vw] leading-[0.9] uppercase text-white mt-8 mb-6 max-w-[900px]"
              style={{ fontFamily: "var(--font-barlow)", fontWeight: 900 }}
            >
              Esta página
              <br />
              <span className="text-[#F1B91E]">no existe.</span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-white/60 text-[15px] md:text-[16px] leading-relaxed max-w-[560px] mb-12"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              La ruta que buscas no está aquí. O ha sido movida, o nunca lo
              estuvo. Da media vuelta y sigue entrenando.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 bg-[#F1B91E] text-black px-8 py-4 hover:bg-white transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                }}
              >
                <span className="text-[13px] uppercase">Volver al inicio</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>

              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                }}
              >
                <span className="text-[13px] uppercase">Contacto</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
