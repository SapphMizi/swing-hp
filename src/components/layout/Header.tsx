import { useState, useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { key: 'nav.about', to: '/about' },
  { key: 'nav.history', to: '/history' },
  { key: 'nav.schedule', to: '/schedule' },
  { key: 'nav.liveReports', to: '/live-reports' },
  { key: 'nav.contact', to: '/contact' },
] as const

export function Header() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ja' ? 'en' : 'ja')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animate in on mount
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 },
    )
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-swing-black/90 backdrop-blur-md border-b border-swing-amber/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/images/swing_logo.jpg"
            alt="SWING"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <span className="block font-bold text-swing-cream text-lg leading-none tracking-wide group-hover:text-swing-amber transition-colors duration-300">
              SWING
            </span>
            <span className="block text-swing-warm-gray text-[10px] tracking-widest uppercase leading-none mt-0.5">
              Osaka Univ.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ key, to }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-2 text-sm text-swing-warm-gray-light hover:text-swing-amber tracking-wide transition-colors duration-200 relative group"
              activeProps={{ className: 'text-swing-amber' }}
            >
              {t(key)}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-swing-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Lang toggle + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-xs text-swing-warm-gray border border-swing-amber/20 px-3 py-1.5 rounded-full hover:border-swing-amber/60 hover:text-swing-amber transition-all duration-200 tracking-widest"
          >
            {i18n.language === 'ja' ? 'EN' : 'JA'}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="menu"
          >
            <span
              className={`block h-[1.5px] w-6 bg-swing-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-swing-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-swing-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col bg-swing-black/95 backdrop-blur-md border-t border-swing-amber/10 px-6 py-4 gap-1">
          {NAV_LINKS.map(({ key, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-swing-warm-gray-light hover:text-swing-amber text-sm tracking-wide border-b border-white/5 transition-colors duration-200"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
