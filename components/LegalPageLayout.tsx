import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F0F] min-h-screen">
        {/* Hero */}
        <section
          className="relative px-6 md:px-12 lg:px-16 pb-16 border-b border-white/8"
          style={{ paddingTop: "140px" }}
        >
          <div className="absolute inset-0 geo-grid opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-[900px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#F1B91E]" />
              <span
                className="text-[#F1B91E] text-[11px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                {eyebrow}
              </span>
            </div>

            <h1
              className="text-[10vw] md:text-[7vw] lg:text-[5.5vw] leading-[0.9] uppercase text-white mb-6"
              style={{ fontFamily: "var(--font-barlow)", fontWeight: 800 }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className="text-white/60 text-[15px] md:text-[16px] leading-relaxed max-w-[640px] mb-6"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                {subtitle}
              </p>
            )}

            <p
              className="text-white/40 text-[12px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
            >
              Última actualización: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 md:px-12 lg:px-16 py-16 lg:py-24">
          <div
            className="max-w-[760px] legal-content text-white/70 text-[15px] leading-[1.75]"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
