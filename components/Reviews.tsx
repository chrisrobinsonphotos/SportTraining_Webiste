'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import type { PlaceReview } from '@/app/api/reviews/route'

// Stock avatar photos for mock reviews (index 0–5)
const AVATAR_PHOTOS = [
  '/avatar-1.jpg',
  '/avatar-2.jpg',
  '/avatar-3.jpg',
  '/avatar-4.jpg',
  '/avatar-5.jpg',
  '/avatar-6.jpg',
]

// ---------------------------------------------------------------------------
// Star icon
// ---------------------------------------------------------------------------
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? '#F1B91E' : 'none'}
      stroke="#F1B91E"
      strokeWidth={1.5}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Single review card
// ---------------------------------------------------------------------------
function ReviewCard({
  review,
  index,
  avatarSrc,
}: {
  review: PlaceReview
  index: number
  avatarSrc?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[340px] md:w-[400px] flex flex-col justify-between
                 bg-[#1A1A1A] border border-white/[0.06] p-8
                 hover:border-[#F1B91E]/30 transition-colors duration-400 group"
      style={{ minHeight: '260px' }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((n) => (
          <StarIcon key={n} filled={n <= review.rating} />
        ))}
      </div>

      {/* Review text */}
      <p
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontStyle: 'italic', textTransform: 'none' }}
        className="text-white/65 text-[15px] leading-relaxed flex-1 mb-6
                   group-hover:text-white/80 transition-colors duration-400"
      >
        "{review.text}"
      </p>

      {/* Bottom: author + date */}
      <div className="flex items-center justify-between pt-5 border-t border-white/[0.08]">
        <div className="flex items-center gap-3">
          {/* Avatar — real photo if available, else gold initial */}
          <div
            className="w-11 h-11 rounded-full flex-shrink-0 overflow-hidden relative"
            style={{ border: '1px solid rgba(241,185,30,0.25)' }}
          >
            {avatarSrc || review.authorPhoto ? (
              <Image
                src={avatarSrc ?? review.authorPhoto!}
                alt={review.authorName}
                fill
                className="object-cover object-center"
                sizes="44px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: 'rgba(241,185,30,0.12)' }}>
                <span
                  style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                  className="text-[#F1B91E] text-[13px] uppercase leading-none"
                >
                  {review.authorName.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-white text-[13px] leading-tight"
            >
              {review.authorName}
            </p>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-white/30 text-[11px] tracking-[0.05em] mt-0.5"
            >
              {review.relativeDate}
            </p>
          </div>
        </div>

        {/* Google mark */}
        <div className="flex items-center gap-1.5 opacity-30">
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
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------
export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [reviews, setReviews] = useState<PlaceReview[]>([])
  const [loading, setLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Fetch reviews from API route
  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => {
        setReviews(d.reviews ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [reviews, updateScrollState])

  const scrollBy = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? 420 : -420, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111111] overflow-hidden border-b-4 border-[#F1B91E]"
      style={{ paddingTop: '6rem' }}
    >
      <div className="px-6 md:px-12 lg:px-16 pt-8 pb-6">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
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
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-white"
              >
                OPINIONES
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.88] uppercase text-[#F1B91E]"
                
              >
                Reales.
              </motion.h2>
            </div>
          </div>

          {/* Nav arrows + Google badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-4 flex-shrink-0"
          >
            {/* Google rating badge */}
            <div className="flex flex-col items-end mr-4">
              <div className="flex items-center gap-1.5 mb-1">
                {[1,2,3,4,5].map(n => <StarIcon key={n} filled />)}
              </div>
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                className="text-white/40 text-[11px] tracking-[0.12em] uppercase"
              >
                Google Reviews
              </span>
            </div>

            {/* Prev arrow */}
            <button
              onClick={() => scrollBy('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
              className="w-12 h-12 flex items-center justify-center border border-white/15
                         text-white/40 hover:border-[#F1B91E] hover:text-[#F1B91E]
                         disabled:opacity-20 disabled:cursor-not-allowed
                         transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              onClick={() => scrollBy('right')}
              disabled={!canScrollRight}
              aria-label="Siguiente"
              className="w-12 h-12 flex items-center justify-center border border-white/15
                         text-white/40 hover:border-[#F1B91E] hover:text-[#F1B91E]
                         disabled:opacity-20 disabled:cursor-not-allowed
                         transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Carousel track — edge-to-edge with left padding */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-16 scroll-smooth"
        style={{
          paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {loading ? (
          // Skeleton cards while loading
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] md:w-[400px] bg-[#1A1A1A] border border-white/[0.06]"
              style={{ minHeight: '260px', opacity: 0.4 + i * 0.1 }}
            />
          ))
        ) : (
          reviews.map((review, i) => (
            <ReviewCard
              key={i}
              review={review}
              index={i}
              avatarSrc={review.authorPhoto ?? AVATAR_PHOTOS[i % AVATAR_PHOTOS.length]}
            />
          ))
        )}
      </div>

      {/* Hide scrollbar (WebKit) */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
