'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ── Types ──────────────────────────────────────────────────────────────────

type GalleryImage = { src: string; caption: string }

interface Gallery {
  id: string
  title: string
  subtitle: string
  date: string
  cover: string
  images: GalleryImage[]
}

interface CarouselSlide {
  src: string
  caption: string
  galleryId: string
}

// ── Gallery data ───────────────────────────────────────────────────────────

const galleries: Gallery[] = [
  {
    id: 'relay-may-26',
    title: 'HYROX Relay Race',
    subtitle: 'Primer evento Relay oficial de Sport Training',
    date: '28 Mayo 2026',
    cover: '/relay-may-26/EVENTOS.jpg',
    images: [
      { src: '/relay-may-26/_MG_5804.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5809.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5825.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5826.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5828.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5832.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5843.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5845.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5857.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5859.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5863.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5865.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5866.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5870%201.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5871%201.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5873.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5875.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5877.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5881.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5883.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5885.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5887.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5888.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5897.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5901.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5906.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5911.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5917.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5921.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5922.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5925.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5928.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5929.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5933.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5935.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5941.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5946.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5948%201.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5950.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5952.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5958.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5959.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5966.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5982.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5989.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5990.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5993.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_5995.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6001.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6002.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6011.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6015.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6016.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6017.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6018.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6019.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6020.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6025.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6026.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6027.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6028.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6029.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6031.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6032.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6034.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6042%201.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6045.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6046.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6048.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6049.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6050.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6051.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6052.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6054.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6055.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6057%201.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6061.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6067.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6068.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6074.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6075.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6076.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6077.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6079.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6080.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6081.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6086.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6087.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6088.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6090.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6091.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6094.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6095.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6096.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6098.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6103.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6104.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6107.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6108.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6110.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6114.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6116.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6119.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6120.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6124.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6126.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6127.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6129.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6131.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6132.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_MG_6134.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_T7A6070.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
      { src: '/relay-may-26/_T7A6075.jpg', caption: 'HYROX Relay Race · Mayo 2026' },
    ],
  },
  {
    id: 'archivo',
    title: 'Archivo Sport Training',
    subtitle: 'Entrenos, comunidad y competición',
    date: '2024 – 2025',
    cover: '/mas-que-un-gimnasio.jpg',
    images: [
      { src: '/mas-que-un-gimnasio.jpg', caption: 'HYROX Murcia — Equipo Sport Training' },
      { src: '/hyrox-group.jpg', caption: 'Sport Training · Comunidad' },
      { src: '/hyrox-women.jpg', caption: 'Entrenamiento en Grupo · Comunidad ST' },
      { src: '/hyrox-medball.jpg', caption: 'Competición HYROX · Intensidad máxima' },
      { src: '/_MG_4351.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4352.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4359.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4372.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4374.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4376.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4404.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4410.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4417.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4513.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4522.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4535.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4578.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4605.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4628.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4670.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4701.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4729.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4758.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4795.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4839.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4918.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_4930.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5004.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5017.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5058.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5103.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5111.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5185.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5196.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5211.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5256.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5312.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5313.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5385.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5386.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5395.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5401.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5408.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5426.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5433.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5438.jpg', caption: 'Sport Training · Murcia' },
      { src: '/_MG_5450.jpg', caption: 'Sport Training · Murcia' },
    ],
  },
]

// ── Carousel highlights ────────────────────────────────────────────────────

const carouselSlides: CarouselSlide[] = [
  { src: '/relay-may-26/_MG_5804.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_5843.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_5952.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_6061.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_6096.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_6127.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/jr-hyrox-win.jpg',           caption: 'Miguel Ángel Jr. · HYROX Club Oficial · Mayo 2026', galleryId: 'archivo' },
  { src: '/mas-que-un-gimnasio.jpg',    caption: 'HYROX Murcia — Equipo Sport Training', galleryId: 'archivo' },
  { src: '/hyrox-women.jpg',            caption: 'Entrenamiento en Grupo · Comunidad ST', galleryId: 'archivo' },
  { src: '/_MG_4374.jpg',              caption: 'Sport Training · Murcia', galleryId: 'archivo' },
  { src: '/_MG_5185.jpg',              caption: 'Sport Training · Murcia', galleryId: 'archivo' },
]

// ── Component ──────────────────────────────────────────────────────────────

export default function Community() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Carousel
  const [activeSlide, setActiveSlide] = useState(0)
  const [hovering, setHovering] = useState(false)

  // Lightbox
  const [lightboxGalleryId, setLightboxGalleryId] = useState<string | null>(null)
  const [lbIndex, setLbIndex] = useState(0)
  const lbIndexRef = useRef(0)
  useEffect(() => { lbIndexRef.current = lbIndex }, [lbIndex])

  // Derived
  const lightboxGallery = lightboxGalleryId
    ? galleries.find(g => g.id === lightboxGalleryId) ?? null
    : null
  const lightboxImages: GalleryImage[] = lightboxGallery?.images ?? []

  // ── Carousel auto-advance ──
  useEffect(() => {
    if (hovering) return
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [hovering])

  const paginate = (newIndex: number) => {
    setActiveSlide((newIndex + carouselSlides.length) % carouselSlides.length)
  }

  // Clicking the carousel opens the parent gallery at the clicked image
  const openFromCarousel = () => {
    const slide = carouselSlides[activeSlide]
    const gallery = galleries.find(g => g.id === slide.galleryId)
    if (!gallery) return
    const idx = gallery.images.findIndex(img => img.src === slide.src)
    setLightboxGalleryId(slide.galleryId)
    setLbIndex(idx >= 0 ? idx : 0)
  }

  // Opening directly from a gallery card
  const openGallery = (galleryId: string, startIndex = 0) => {
    setLightboxGalleryId(galleryId)
    setLbIndex(startIndex)
  }

  const closeLightbox = useCallback(() => setLightboxGalleryId(null), [])

  const lbGo = useCallback((newIndex: number) => {
    const clamped = (newIndex + lightboxImages.length) % lightboxImages.length
    setLbIndex(clamped)
  }, [lightboxImages.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxGalleryId) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') lbGo(lbIndexRef.current + 1)
      if (e.key === 'ArrowLeft') lbGo(lbIndexRef.current - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxGalleryId, closeLightbox, lbGo])

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = lightboxGalleryId ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxGalleryId])

  return (
    <>
      <section
        ref={ref}
        id="comunidad"
        className="relative bg-[#0D0D0D] flex flex-col overflow-hidden"
        style={{ borderBottom: '4px solid #F1B91E' }}
      >
        {/* ── TOP: Photo Carousel ─────────────────────────────────────── */}
        <div
          className="relative min-h-[65vh] overflow-hidden"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Cross-fade slides — all stacked absolute, opacity-only transitions */}
          {carouselSlides.map((slide, i) => (
            <div
              key={slide.src}
              className="absolute inset-0"
              style={{
                opacity: i === activeSlide ? 1 : 0,
                transition: 'opacity .7s ease',
                zIndex: i === activeSlide ? 1 : 0,
              }}
            >
              <Image
                src={slide.src}
                alt={slide.caption}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover object-left-top"
                quality={85}
              />
              {/* Vertical gradient from bg */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, transparent 40%, rgba(13,13,13,1) 100%)',
                }}
              />
              {/* Horizontal gradient from left */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(13,13,13,0.6) 0%, transparent 50%)',
                }}
              />
            </div>
          ))}

          {/* Clickable overlay — opens lightbox for this slide's gallery */}
          <button
            onClick={openFromCarousel}
            aria-label="Ver galería completa"
            className="absolute inset-0 z-10 w-full h-full cursor-zoom-in"
          />

          {/* Eyebrow — top left */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              top: '2rem',
              left: 'clamp(1.5rem, 5vw, 4rem)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <div className="w-2 h-2 bg-[#F1B91E]" />
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 700,
                  fontSize: 'clamp(.85rem, 1vw, 1rem)',
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  color: '#F1B91E',
                }}
              >
                Eventos & Comunidad
              </span>
            </motion.div>
          </div>

          {/* Caption — bottom left */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              bottom: '1.5rem',
              left: 'clamp(1.5rem, 5vw, 4rem)',
            }}
          >
            <p
              key={activeSlide}
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontStyle: 'italic',
                fontSize: '.78rem',
                letterSpacing: '.2em',
                color: 'rgba(255,255,255,.7)',
                textTransform: 'none',
                opacity: 1,
                transition: 'opacity .3s ease',
              }}
            >
              {carouselSlides[activeSlide].caption}
            </p>
          </div>

          {/* Controls — bottom right */}
          <div
            className="absolute z-20 flex items-center gap-3"
            style={{
              bottom: '1.5rem',
              right: 'clamp(1.5rem, 5vw, 4rem)',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); paginate(activeSlide - 1) }}
              aria-label="Imagen anterior"
              className="flex items-center justify-center text-white/40 hover:text-[#F1B91E] transition-all duration-300"
              style={{
                width: 36,
                height: 36,
                border: '1px solid rgba(255,255,255,.2)',
              }}
              onMouseEnter={(e) => { (e.currentTarget.style.borderColor = '#F1B91E') }}
              onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)') }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: '.75rem',
                letterSpacing: '.15em',
                color: 'rgba(255,255,255,.5)',
                fontVariantNumeric: 'tabular-nums',
                minWidth: '4rem',
                textAlign: 'center',
              }}
            >
              {String(activeSlide + 1).padStart(2, '0')} / {String(carouselSlides.length).padStart(2, '0')}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(activeSlide + 1) }}
              aria-label="Imagen siguiente"
              className="flex items-center justify-center text-white/40 hover:text-[#F1B91E] transition-all duration-300"
              style={{
                width: 36,
                height: 36,
                border: '1px solid rgba(255,255,255,.2)',
              }}
              onMouseEnter={(e) => { (e.currentTarget.style.borderColor = '#F1B91E') }}
              onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)') }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── BOTTOM: Headline + gallery cards (.comm-bottom) ─────────── */}
        <div
          style={{
            padding: '3rem clamp(1.5rem, 5vw, 4rem) 4rem',
          }}
        >
          <div
            className="grid gap-12"
            style={{
              gridTemplateColumns: '1fr',
              maxWidth: 1400,
              margin: '0 auto',
            }}
          >
            {/* Responsive grid — 2fr 3fr at >=1000px so galleries get more space */}
            <style jsx>{`
              @media (min-width: 1000px) {
                .comm-grid {
                  grid-template-columns: 2fr 3fr !important;
                  gap: 3rem !important;
                }
              }
            `}</style>
            <div
              className="comm-grid grid gap-12 items-center"
              style={{ gridTemplateColumns: '1fr' }}
            >
              {/* Left: Headline + tags + CTA — centered vertically via items-center on parent */}
              <div className="flex flex-col items-center text-center lg:items-center lg:text-center">
                <div className="overflow-hidden mb-1">
                  <motion.h2
                    initial={{ y: 80, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 800,
                      fontSize: 'clamp(3.6rem, 7.8vw, 7.2rem)',
                      lineHeight: '.85',
                      letterSpacing: '-.02em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                    }}
                  >
                    NUESTRAS
                  </motion.h2>
                </div>
                <div className="overflow-hidden mb-1">
                  <motion.h2
                    initial={{ y: 80, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 800,
                      fontSize: 'clamp(3.6rem, 7.8vw, 7.2rem)',
                      lineHeight: '.85',
                      letterSpacing: '-.02em',
                      color: '#F1B91E',
                      fontStyle: 'italic',
                      textTransform: 'none',
                    }}
                  >
                    Galerías.
                  </motion.h2>
                </div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex flex-wrap gap-3"
                  style={{ marginTop: '2rem', marginBottom: '2rem' }}
                >
                  {['HYROX', 'COMUNIDAD', 'EVENTOS'].map(tag => (
                    <div
                      key={tag}
                      style={{
                        border: '1px solid rgba(255,255,255,.15)',
                        padding: '0.625rem 1rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-barlow)',
                          fontWeight: 700,
                          fontSize: '12px',
                          letterSpacing: '.2em',
                          textTransform: 'uppercase',
                          color: '#FFFFFF',
                        }}
                      >
                        &#9642; {tag}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA button with data-contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <button
                    data-contact
                    aria-label="Contactar con Sport Training Murcia"
                    className="inline-flex items-center gap-3 bg-[#F1B91E] text-[#191919] hover:bg-[#C99200] transition-colors duration-300 group"
                    style={{
                      padding: '1rem 1.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 700,
                        fontSize: '.7rem',
                        letterSpacing: '.25em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Únete Ahora
                    </span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              </div>

              {/* Right: Gallery cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 self-center"
              >
                {galleries.map((gallery) => (
                  <button
                    key={gallery.id}
                    onClick={() => openGallery(gallery.id)}
                    className="gal-card group text-left overflow-hidden transition-colors duration-300"
                    style={{
                      border: '1px solid rgba(255,255,255,.1)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget.style.borderColor = 'rgba(241,185,30,.5)') }}
                    onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)') }}
                  >
                    {/* Cover image — 300px height */}
                    <div className="relative overflow-hidden" style={{ height: 300 }}>
                      <Image
                        src={gallery.cover}
                        alt={gallery.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        quality={80}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)',
                        }}
                      />
                      {/* Photo count badge — top right */}
                      <div className="absolute top-3 right-3">
                        <span
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 600,
                            fontSize: '10px',
                            letterSpacing: '.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,.7)',
                            backgroundColor: 'rgba(0,0,0,.5)',
                            padding: '0.25rem 0.625rem',
                          }}
                        >
                          {gallery.images.length} fotos
                        </span>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div
                      className="flex items-center justify-between"
                      style={{ padding: '1rem 1.25rem' }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-barlow)',
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            letterSpacing: '.04em',
                            color: '#FFFFFF',
                          }}
                        >
                          {gallery.title}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 400,
                            fontSize: '.8rem',
                            letterSpacing: '.1em',
                            color: 'rgba(255,255,255,.4)',
                            marginTop: '0.125rem',
                          }}
                        >
                          {gallery.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-white/30 group-hover:text-[#F1B91E] transition-colors duration-300">
                        <span
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 600,
                            fontSize: '10px',
                            letterSpacing: '.2em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Ver galería
                        </span>
                        <span style={{ fontSize: '10px' }}>&rarr;</span>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 flex flex-col"
            style={{
              zIndex: 110,
              backgroundColor: '#000000',
            }}
          >
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0"
              onClick={closeLightbox}
              style={{ zIndex: 0 }}
            />

            {/* Header */}
            <div
              className="relative flex items-center justify-between flex-shrink-0"
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,.08)',
                zIndex: 2,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#F1B91E]" />
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.6)',
                  }}
                >
                  Sport Training · {lightboxGallery.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '.15em',
                    color: 'rgba(255,255,255,.4)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(lbIndex + 1).padStart(2, '0')} / {String(lightboxImages.length).padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                aria-label="Cerrar galería"
                className="flex items-center justify-center text-white/50 hover:text-[#F1B91E] transition-all duration-200"
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid rgba(255,255,255,.2)',
                }}
                onMouseEnter={(e) => { (e.currentTarget.style.borderColor = '#F1B91E') }}
                onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)') }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Stage */}
            <div
              className="relative flex-1 overflow-hidden flex items-center justify-center"
              style={{ zIndex: 1 }}
            >
              {/* Contained image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${lightboxGallery.id}-${lbIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ padding: '1rem 4rem' }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={lightboxImages[lbIndex].src}
                      alt={lightboxImages[lbIndex].caption}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      quality={82}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Hidden preload */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0 }}>
                {[-1, 1, 2].map(offset => {
                  const idx = (lbIndex + offset + lightboxImages.length) % lightboxImages.length
                  return (
                    <div key={`preload-${lightboxGallery.id}-${idx}`} className="absolute inset-0">
                      <Image
                        src={lightboxImages[idx].src}
                        alt=""
                        fill
                        sizes="100vw"
                        quality={82}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Prev arrow */}
              <button
                onClick={() => lbGo(lbIndex - 1)}
                aria-label="Imagen anterior"
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-white/40 hover:text-[#F1B91E] transition-all duration-200"
                style={{
                  left: '1rem',
                  width: 40,
                  height: 40,
                  border: '1px solid rgba(255,255,255,.2)',
                  zIndex: 20,
                }}
                onMouseEnter={(e) => { (e.currentTarget.style.borderColor = '#F1B91E') }}
                onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)') }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next arrow */}
              <button
                onClick={() => lbGo(lbIndex + 1)}
                aria-label="Imagen siguiente"
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-white/40 hover:text-[#F1B91E] transition-all duration-200"
                style={{
                  right: '1rem',
                  width: 40,
                  height: 40,
                  border: '1px solid rgba(255,255,255,.2)',
                  zIndex: 20,
                }}
                onMouseEnter={(e) => { (e.currentTarget.style.borderColor = '#F1B91E') }}
                onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)') }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div
              className="relative flex items-center justify-between flex-shrink-0"
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(255,255,255,.08)',
                zIndex: 2,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  fontSize: '12px',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.5)',
                }}
              >
                {lightboxImages[lbIndex].caption}
              </p>
              <span
                className="hidden md:block"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                  fontSize: '11px',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.2)',
                }}
              >
                &larr; &rarr; navegar · ESC cerrar
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
