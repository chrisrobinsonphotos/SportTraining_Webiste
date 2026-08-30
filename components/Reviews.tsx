'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { reviews, type Review } from '@/data/reviews'

// ---------------------------------------------------------------------------
// Star icon — filled gold
// ---------------------------------------------------------------------------
function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F1B91E" stroke="#F1B91E" strokeWidth={1.5}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Single review card
// ---------------------------------------------------------------------------
function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="flex flex-col bg-[#1A1A1A] border border-white/[0.06] hover:border-[#F1B91E]/30 transition-colors duration-400 group"
      style={{
        flex: '0 0 min(440px, 86vw)',
        padding: '2.25rem',
        height: '360px',
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((n) => (
          <StarIcon key={n} />
        ))}
      </div>

      {/* Quote text — line-clamped so every card is the same height. The clamp
          must own the box height (no flex-1 here) AND the card must be tall
          enough for every clamped line. If the card squeezes the paragraph
          below the clamp, overflow hides the tail, no ellipsis is drawn, and
          the review just stops mid-sentence looking broken. The spacer below
          takes the slack instead. Full text stays in the DOM, so nothing
          is hidden from screen readers or search engines. */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 'var(--fs-lead)',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 5,
          overflow: 'hidden',
        }}
        className="text-white/65 leading-relaxed mb-6
                   group-hover:text-white/80 transition-colors duration-400"
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Takes the leftover space so the footer sits flush at the card base */}
      <div className="flex-1" />

      {/* Footer: author + Google mark */}
      <div
        className="flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar or gold initial */}
          <div
            className="w-[42px] h-[42px] rounded-full flex-shrink-0 overflow-hidden relative"
            style={{ border: '1px solid rgba(241,185,30,0.25)' }}
          >
            {review.avatar ? (
              <Image
                src={review.avatar}
                alt={review.name}
                fill
                className="object-cover object-center"
                sizes="42px"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'rgba(241,185,30,0.12)' }}
              >
                <span
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                  className="text-[#F1B91E] text-[13px] uppercase leading-none"
                >
                  {review.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: '1.15rem' }}
              className="text-white leading-tight truncate"
            >
              {review.name}
            </p>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: '0.95rem' }}
              className="text-white/40 mt-0.5"
            >
              {review.date}
            </p>
          </div>
        </div>

        {/* Google mark */}
        <div className="flex items-center gap-1.5 opacity-30 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
            className="text-[10px] tracking-[0.1em] uppercase text-white"
          >
            Google
          </span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------
export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [paused, setPaused] = useState(false)

  // The track holds the list twice; auto-scroll advances scrollLeft and wraps
  // at the halfway point, so the loop is seamless. Driving the NATIVE scroll
  // (rather than a CSS transform) keeps drag, swipe, wheel and the arrows
  // working — the reader can always take over.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let last = performance.now()
    const SPEED = 32 // px per second — slow enough to read a card in passing

    const step = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000
      last = now
      // Wrap distance is measured from the layout, not scrollWidth/2: the track
      // has horizontal padding, so half of scrollWidth is NOT one copy's width
      // and the seam would jump by that difference on every loop. The offset of
      // the first duplicated card is the exact distance.
      const first = el.children[0] as HTMLElement | undefined
      const seam = el.children[reviews.length] as HTMLElement | undefined
      const wrapAt = first && seam ? seam.offsetLeft - first.offsetLeft : 0
      if (wrapAt > 0) {
        let next = el.scrollLeft + SPEED * dt
        if (next >= wrapAt) next -= wrapAt
        el.scrollLeft = next
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  const scrollBy = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? 440 : -440, behavior: 'smooth' })
  }

  // No genuine reviews to show — render nothing rather than an empty carousel
  // under a "Reales." heading.
  if (reviews.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#161616] overflow-hidden"
      style={{ paddingTop: '6rem' }}
    >
      <div
        className="pt-8 pb-6"
        style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          {/* Left: eyebrow + heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-2 h-2 bg-[#F1B91E]" />
              <span className="section-label">Lo Que Dicen</span>
            </motion.div>

            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 800,
                  fontSize: 'var(--fs-h1)',
                  lineHeight: 0.88,
                }}
                className="uppercase text-white"
              >
                OPINIONES
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  fontSize: 'var(--fs-h1)',
                  lineHeight: 0.88,
                }}
                className="text-[#F1B91E]"
              >
                Reales.
              </motion.h2>
            </div>
          </div>

          {/* Right: stars + meta + nav arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 flex-shrink-0"
          >
            {/* Rating meta */}
            <div className="flex flex-col items-end mr-4">
              <div className="flex items-center gap-1.5 mb-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <StarIcon key={n} />
                ))}
              </div>
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                className="text-white/40 text-[11px] tracking-[0.12em] uppercase"
              >
                4.8 &middot; 168 rese&ntilde;as
              </span>
            </div>

            {/* Prev */}
            <button
              onClick={() => scrollBy('left')}
              aria-label="Anterior"
              className="w-[46px] h-[46px] flex items-center justify-center border border-white/15
                         text-white/40 hover:border-[#F1B91E] hover:text-[#F1B91E]
                         transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={() => scrollBy('right')}
              aria-label="Siguiente"
              className="w-[46px] h-[46px] flex items-center justify-center border border-white/15
                         text-white/40 hover:border-[#F1B91E] hover:text-[#F1B91E]
                         transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scrolling wall — the list is rendered twice so the loop is seamless */}
      <div className="relative">
        {/* Edge fades, matching the Marquee treatment */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to right, #161616, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to left, #161616, transparent)' }} />

        <div
          ref={trackRef}
          className="flex overflow-x-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          style={{
            gap: '1rem',
            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
            paddingBottom: '5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* Hide scrollbar (WebKit) */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
