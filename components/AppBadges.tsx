'use client'

const APP_LINKS = {
  ios: 'https://apps.apple.com/es/app/fitnova/id6745967222',
  android: 'https://play.google.com/store/apps/details?id=com.juanlm91.gyms2',
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-27.1-46.9-42.1-83.7-45.3-35-3.3-73.2 20.5-87.3 20.5-14.8 0-49.1-19.5-74-19.5C63.1 140.2 0 196.3 0 310.4c0 33.8 6.1 68.7 18.4 104.7 16.3 47.3 75.2 163.1 136.4 161.1 31.5-.8 53.8-22.5 82.8-22.5 28.1 0 48.8 22.5 82.8 21.8 62.1-1 115.1-104.3 130.8-151.7-83.6-39.4-80.5-115.3-80.5-116.1zM262.1 81.2c27.6-33.5 24.6-64.1 23.8-75.2-23.9 1.5-51.6 16.4-67.5 34.8-17.4 20.2-27.6 45-25.4 73.5 26.1 2 52.9-11.5 69.1-33.1z" />
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  )
}

interface AppBadgesProps {
  variant?: 'default' | 'compact' | 'footer'
}

export default function AppBadges({ variant = 'default' }: AppBadgesProps) {
  const isFooter = variant === 'footer'
  const isCompact = variant === 'compact'

  return (
    <div className={`flex items-center ${isCompact ? 'gap-2' : 'gap-3'}`}>
      <a
        href={APP_LINKS.ios}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Descarga FitNova en el App Store"
        className="group flex items-center gap-2.5 transition-all duration-300 border border-white/15 hover:border-[#F1B91E]/50 bg-white/[0.04] hover:bg-white/[0.08]"
        style={{ padding: isCompact ? '0.6rem 1rem' : isFooter ? '0.55rem 0.9rem' : '0.75rem 1.25rem' }}
      >
        <AppleIcon className={`${isCompact || isFooter ? 'w-4 h-4' : 'w-5 h-5'} text-white group-hover:text-[#F1B91E] transition-colors`} />
        <div className="flex flex-col">
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className={`${isCompact || isFooter ? 'text-[0.5rem]' : 'text-[0.55rem]'} tracking-[0.08em] text-white/40 leading-none`}
          >
            Descargar en
          </span>
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className={`${isCompact || isFooter ? 'text-[0.7rem]' : 'text-[0.8rem]'} tracking-[0.04em] text-white group-hover:text-[#F1B91E] transition-colors leading-tight`}
          >
            App Store
          </span>
        </div>
      </a>

      <a
        href={APP_LINKS.android}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Descarga FitNova en Google Play"
        className="group flex items-center gap-2.5 transition-all duration-300 border border-white/15 hover:border-[#F1B91E]/50 bg-white/[0.04] hover:bg-white/[0.08]"
        style={{ padding: isCompact ? '0.6rem 1rem' : isFooter ? '0.55rem 0.9rem' : '0.75rem 1.25rem' }}
      >
        <PlayIcon className={`${isCompact || isFooter ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white group-hover:text-[#F1B91E] transition-colors`} />
        <div className="flex flex-col">
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className={`${isCompact || isFooter ? 'text-[0.5rem]' : 'text-[0.55rem]'} tracking-[0.08em] text-white/40 leading-none`}
          >
            Disponible en
          </span>
          <span
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
            className={`${isCompact || isFooter ? 'text-[0.7rem]' : 'text-[0.8rem]'} tracking-[0.04em] text-white group-hover:text-[#F1B91E] transition-colors leading-tight`}
          >
            Google Play
          </span>
        </div>
      </a>
    </div>
  )
}
