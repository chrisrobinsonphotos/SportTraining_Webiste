import type { Metadata } from 'next'
import Link from 'next/link'
import ClearCartOnMount from '@/components/tienda/ClearCartOnMount'

export const metadata: Metadata = {
  title: 'Pedido confirmado — Sport Training',
  robots: { index: false },
}

export default function GraciasPage() {
  return (
    <main className="bg-[#191919] min-h-screen flex items-center px-[clamp(1.5rem,5vw,4rem)] pt-[90px]">
      <ClearCartOnMount />
      <div className="max-w-[640px] mx-auto text-center py-[clamp(4rem,10vw,8rem)]">
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-[#F1B91E]" />
          <span className="text-[12px] tracking-[0.22em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>
            Pedido confirmado
          </span>
        </div>
        <h1 className="uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'clamp(2.4rem,6vw,4.5rem)', lineHeight: 0.9 }}>
          Gracias por tu <span className="text-[#F1B91E]">pedido</span>.
        </h1>
        <p className="mt-6 text-[16px] leading-relaxed text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>
          Hemos recibido tu pago correctamente. Recibirás un correo de confirmación de Stripe. Prepararemos tu pedido y te avisaremos cuando esté listo para envío o recogida en el gimnasio.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <Link href="/tienda" className="inline-flex items-center gap-2 bg-[#F1B91E] text-[#191919] px-7 py-4 text-[13px] tracking-[0.16em] uppercase hover:bg-[#C99200] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>
            Seguir comprando →
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-4 text-[13px] tracking-[0.16em] uppercase hover:border-[#F1B91E] hover:text-[#F1B91E] transition-colors" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
