import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Keys } from '../ui/Keys'

const LINKS = [
  { key: 'nav.about', to: '/about' },
  { key: 'nav.news', to: '/news' },
  { key: 'nav.liveReports', to: '/live-reports' },
  { key: 'nav.schedule', to: '/schedule' },
  { key: 'nav.history', to: '/history' },
  { key: 'nav.contact', to: '/contact' },
] as const

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-paper-light">
      <Keys height={40} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[auto_1fr] md:items-end">
        <div>
          <img
            src="/images/hand/logo.webp"
            alt="SWING"
            width={286}
            height={210}
            loading="lazy"
            className="h-auto w-[220px]"
          />
          <p className="mt-2 font-hand text-lg">{t('footer.tagline')}</p>
        </div>
        <div className="md:text-right">
          <nav aria-label={t('nav.menu')}>
            <ul className="grid grid-cols-2 gap-2 font-bold md:flex md:flex-wrap md:justify-end md:gap-x-6 md:gap-y-2">
              {LINKS.map(({ key, to }) => (
                <li key={to}>
                  {/* スマホでは押しやすい大きさのボタン、PC では文字のリンク */}
                  <Link
                    to={to}
                    className="flex min-h-12 items-center rounded-full border-2 border-ink bg-paper-light px-5 text-ink no-underline transition-colors duration-150 hover:bg-yellow md:min-h-0 md:border-0 md:bg-transparent md:px-0 md:underline md:hover:bg-transparent"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-6 text-sm">
            © {year} {t('footer.name')}
          </p>
        </div>
      </div>
    </footer>
  )
}
