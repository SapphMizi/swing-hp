import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { SiteSettings } from '../../lib/cms-types'
import { imageSrcSet, imageUrl, useLocalized } from '../../lib/format'
import { ButtonLink } from '../ui/ButtonLink'
import { Keys } from '../ui/Keys'

const INTERVAL = 6000

// トップの最初の画面。アイコンの手描きロゴと、テープで留めたライブ写真。
// 写真は microCMS の site.heroImages から読み、未登録ならロゴだけを中央に置く。
export function Hero({ site }: { site: SiteSettings }) {
  const { t } = useTranslation()
  const l = useLocalized()
  const images = site.heroImages ?? []
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % images.length),
      INTERVAL,
    )
    return () => clearInterval(id)
  }, [images.length])

  const copy = site.heroCopy
    ? l(site.heroCopy, site.heroCopy_en)
    : t('home.heroCopy')
  const hasPhoto = images.length > 0

  const intro = (
    <>
      <h1 className="m-0">
        <img
          src="/images/hand/logo.webp"
          alt="SWING  All you need is Jazz"
          width={572}
          height={420}
          fetchPriority="high"
          className={`h-auto w-full ${hasPhoto ? 'max-w-[480px]' : 'mx-auto max-w-[520px]'}`}
        />
      </h1>
      <p
        className={`mt-4 max-w-[22em] text-lg font-bold leading-relaxed md:text-xl ${hasPhoto ? '' : 'mx-auto text-center'}`}
      >
        {copy}
      </p>
      <div
        className={`mt-8 flex flex-wrap gap-3 ${hasPhoto ? '' : 'justify-center'}`}
      >
        <ButtonLink to="/contact">{t('home.ctaJoin')}</ButtonLink>
        <ButtonLink to="/schedule" variant="secondary">
          {t('home.ctaSchedule')}
        </ButtonLink>
      </div>
    </>
  )

  return (
    <section className="relative">
      {hasPhoto ? (
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-12">
          <div className="lg:col-span-5">{intro}</div>
          <div className="relative lg:col-span-7">
            <figure
              className="relative bg-paper-light p-2.5 shadow-[0_14px_24px_-14px_rgba(43,29,31,0.55)]"
              style={{ rotate: '-2deg' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {images.map((img, i) => (
                  <img
                    key={img.url}
                    src={imageUrl(img, 1200)}
                    srcSet={imageSrcSet(img, [640, 960, 1200, 1800])}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    alt={i === current ? t('home.heroPhotoAlt') : ''}
                    aria-hidden={i !== current}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0 }}
                  />
                ))}
              </div>
              <span
                aria-hidden
                className="absolute -top-3 left-[8%] h-7 w-24 -rotate-6 bg-pink/70 mix-blend-multiply"
              />
              <span
                aria-hidden
                className="absolute -top-3 right-[8%] h-7 w-20 rotate-[7deg] bg-teal/80 mix-blend-multiply"
              />
            </figure>
            <img
              src="/images/hand/chara.webp"
              alt=""
              width={323}
              height={328}
              className="absolute -bottom-10 -left-6 w-24 md:w-32"
            />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 lg:pt-14">
          {intro}
        </div>
      )}
      <Keys height={40} />
    </section>
  )
}
