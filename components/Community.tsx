'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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
// Add new galleries here. Most recent first.

const galleries: Gallery[] = [
  {
    id: 'relay-may-26',
    title: 'HYROX Relay Race',
    subtitle: 'Primer evento Relay oficial de Sport Training',
    date: '28 Mayo 2026',
    cover: '/relay-may-26/_MG_5804.jpg',
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
// Curated picks shown in the rotating carousel. Each slide links back to its
// parent gallery so clicking opens the right lightbox at the right image.

const carouselSlides: CarouselSlide[] = [
  { src: '/relay-may-26/_MG_5804.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_5843.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_5952.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_6061.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_6096.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
  { src: '/relay-may-26/_MG_6127.jpg', caption: 'HYROX Relay Race · Mayo 2026', galleryId: 'relay-may-26' },
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
  const [direction, setDirection] = useState(1)

  // Lightbox — null means closed
  const [lightboxGalleryId, setLightboxGalleryId] = useState<string | null>(null)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbDirection, setLbDirection] = useState(1)
  const lbIndexRef = useRef(0)
  useEffect(() => { lbIndexRef.current = lbIndex }, [lbIndex])

  // Derived
  const lightboxGallery = lightboxGalleryId
    ? galleries.find(g => g.id === lightboxGalleryId) ?? null
    : null
  const lightboxImages: GalleryImage[] = lightboxGallery?.images ?? []

  // ── Carousel ──
  const paginate = (newIndex: number) => {
    setDirection(newIndex > activeSlide ? 1 : -1)
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
    setLbDirection(1)
  }

  // Opening directly from a gallery card
  const openGallery = (galleryId: string, startIndex = 0) => {
    setLightboxGalleryId(galleryId)
    setLbIndex(startIndex)
    setLbDirection(1)
  }

  const closeLightbox = () => setLightboxGalleryId(null)

  const lbGo = (newIndex: number) => {
    const clamped = (newIndex + lightboxImages.length) % lightboxImages.length
    setLbDirection(newIndex > lbIndexRef.current ? 1 : -1)
    setLbIndex(clamped)
  }

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
  }, [lightboxGalleryId])

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = lightboxGalleryId ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxGalleryId])

  return (
    <>
      <section
        ref={ref}
        className="relative bg-[#0D0D0D] min-h-screen flex flex-col overflow-hidden border-b-4 border-[#F1B91E]"
      >
        {/* ── TOP: Carousel ──────────────────────────────────────────────── */}
        <div className="relative flex-1 min-h-[65vh] overflow-hidden">
          <AnimatePresence custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={carouselSlides[activeSlide].src}
                alt={carouselSlides[activeSlide].caption}
                fill
                sizes="100vw"
                priority={activeSlide === 0}
                className="object-cover object-left-top"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-transparent to-[#0D0D0D]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Clickable overlay — opens lightbox for this slide's gallery */}
          <button
            onClick={openFromCarousel}
            aria-label="Ver galería completa"
            className="absolute inset-0 z-10 w-full h-full cursor-zoom-in group"
          >
            <span className="absolute top-8 right-6 md:right-12 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                className="text-[10px] tracking-[0.2em] uppercase text-white/60"
              >
                Ver galería
              </span>
              <span className="w-8 h-8 border border-white/30 flex items-center justify-center text-white/50">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="square" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </span>
          </button>

          {/* Caption */}
          <div className="absolute bottom-6 left-6 md:left-12 lg:left-16 z-20 pointer-events-none">
            <motion.p
              key={activeSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontStyle: 'italic', textTransform: 'none' }}
              className="text-white/70 text-[13px] tracking-[0.2em] uppercase"
            >
              {carouselSlides[activeSlide].caption}
            </motion.p>
          </div>

          {/* Carousel controls */}
          <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); paginate(activeSlide - 1) }}
              className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#F1B91E] hover:text-[#F1B91E] text-white/40 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <span
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              className="text-[12px] tracking-[0.15em] text-white/50 tabular-nums w-16 text-center"
            >
              {String(activeSlide + 1).padStart(2, '0')} / {String(carouselSlides.length).padStart(2, '0')}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(activeSlide + 1) }}
              className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#F1B91E] hover:text-[#F1B91E] text-white/40 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Section label */}
          <div className="absolute top-8 left-6 md:left-12 lg:left-16 z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4"
            >
              <div className="w-2 h-2 bg-[#F1B91E]" />
              <span className="section-label">Eventos & Comunidad</span>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM: Headline + gallery cards ───────────────────────────── */}
        <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 flex-shrink-0">

          {/* Left: Headline + description + CTA */}
          <div>
            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-[12vw] md:text-[7vw] leading-[0.88] uppercase text-white"
              >
                NUESTRAS
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                className="text-[12vw] md:text-[7vw] leading-[0.88] uppercase text-[#F1B91E]"
              >
                GALERÍAS.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-8 mb-8"
            >
              {['▪ HYROX', '▪ COMUNIDAD', '▪ EVENTOS'].map(p => (
                <div key={p} className="border border-white/10 px-4 py-2.5">
                  <span
                    style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
                    className="text-white text-[12px] tracking-[0.2em] uppercase"
                  >
                    {p}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link
                href="/contacto"
                aria-label="Contactar con Sport Training Murcia"
                className="inline-flex items-center gap-3 bg-[#F1B91E] text-[#191919] px-7 py-4 hover:bg-[#C99200] transition-colors duration-300 group"
              >
                <span
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                  className="text-[11px] tracking-[0.25em] uppercase"
                >
                  Únete Ahora
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
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
                className="group text-left border border-white/10 hover:border-[#F1B91E]/50 transition-colors duration-300 overflow-hidden"
              >
                {/* Cover image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={gallery.cover}
                    alt={gallery.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Photo count badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                      className="text-[10px] tracking-[0.2em] uppercase text-white/70 bg-black/50 px-2.5 py-1"
                    >
                      {gallery.images.length} fotos
                    </span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p
                      style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
                      className="text-white text-[18px] uppercase leading-tight tracking-wide"
                    >
                      {gallery.title}
                    </p>
                    <p
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                      className="text-white/40 text-[12px] tracking-[0.1em] mt-0.5"
                    >
                      {gallery.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/30 group-hover:text-[#F1B91E] transition-colors duration-300">
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                      className="text-[10px] tracking-[0.2em] uppercase"
                    >
                      Ver galería
                    </span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 flex-shrink-0 border-b border-white/8">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#F1B91E]" />
                <span
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                  className="text-[11px] tracking-[0.25em] uppercase text-white/60"
                >
                  Sport Training · {lightboxGallery.title}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
                  className="text-[12px] tracking-[0.15em] text-white/40 tabular-nums"
                >
                  {String(lbIndex + 1).padStart(2, '0')} / {String(lightboxImages.length).padStart(2, '0')}
                </span>
                <button
                  onClick={closeLightbox}
                  aria-label="Cerrar galería"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence custom={lbDirection}>
                <motion.div
                  key={`${lightboxGallery.id}-${lbIndex}`}
                  custom={lbDirection}
                  initial={{ opacity: 0, x: lbDirection * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: lbDirection * -60 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center px-16 md:px-24 py-4"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={lightboxImages[lbIndex].src}
                      alt={lightboxImages[lbIndex].caption}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      quality={90}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev */}
              <button
                onClick={() => lbGo(lbIndex - 1)}
                aria-label="Imagen anterior"
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={() => lbGo(lbIndex + 1)}
                aria-label="Imagen siguiente"
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#F1B91E] hover:text-[#F1B91E] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 flex-shrink-0 border-t border-white/8">
              <motion.p
                key={`${lightboxGallery.id}-${lbIndex}-caption`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontStyle: 'italic' }}
                className="text-white/50 text-[12px] tracking-[0.18em] uppercase"
              >
                {lightboxImages[lbIndex].caption}
              </motion.p>
              <span
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="hidden md:block text-[11px] tracking-[0.15em] text-white/20 uppercase"
              >
                ← → navegar · ESC cerrar
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
