import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-swing-amber/10 bg-swing-black">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-swing-amber tracking-widest text-lg">SWING</span>
          <span className="text-swing-warm-gray text-xs tracking-widest">
            {t('footer.tagline')}
          </span>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm text-swing-warm-gray">
          <Link to="/about" className="hover:text-swing-amber transition-colors duration-200">
            {t('nav.about')}
          </Link>
          <Link to="/schedule" className="hover:text-swing-amber transition-colors duration-200">
            {t('nav.schedule')}
          </Link>
          <Link to="/contact" className="hover:text-swing-amber transition-colors duration-200">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-swing-warm-gray text-xs tracking-wide">
          © {year} {t('footer.copy')}
        </p>
      </div>
    </footer>
  )
}
