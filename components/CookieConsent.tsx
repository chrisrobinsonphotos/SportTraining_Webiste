"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Cookie consent banner — Google Consent Mode v2.
 *
 * GA4 loads with analytics_storage denied by default (see app/layout.tsx).
 * "Aceptar" flips consent to granted; "Rechazar" keeps it denied.
 * The choice persists in localStorage under `st_cookie_consent`
 * ("granted" | "denied") — clear it to see the banner again.
 */

const STORAGE_KEY = "st_cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage unavailable (private mode etc.) — keep consent denied, no banner loop.
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      // ignore
    }
    if (granted && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 inset-x-0 z-[100] bg-[#111111] border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 bg-[#F1B91E]" />
            <span
              className="text-[#F1B91E] text-[11px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 700 }}
            >
              Cookies
            </span>
          </div>
          <p
            className="text-white/60 text-[13px] leading-relaxed max-w-[720px]"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
          >
            Usamos cookies técnicas necesarias y, solo si las aceptas, cookies
            de análisis (Google Analytics) para entender cómo se usa la web.
            Más información en la{" "}
            <Link
              href="/cookies"
              className="underline text-white/80 hover:text-[#F1B91E] transition-colors"
            >
              Política de cookies
            </Link>
            .
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => decide(false)}
            className="px-6 py-3 border border-white/20 text-white text-[13px] tracking-[0.10em] uppercase hover:border-[#F1B91E] hover:text-[#F1B91E] transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 700 }}
          >
            Rechazar
          </button>
          <button
            onClick={() => decide(true)}
            className="px-6 py-3 bg-[#F1B91E] text-[#191919] text-[13px] tracking-[0.10em] uppercase hover:bg-[#C99200] transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 700 }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
