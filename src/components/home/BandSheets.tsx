import { useTranslation } from 'react-i18next'
import type { Band } from '../../lib/cms-types'
import { BAND_BG, BAND_TEXT } from '../../lib/bands'
import { TornEdge } from '../ui/TornEdge'
import { useLocalized } from '../../lib/format'
import { SnsLinks } from '../ui/SnsLinks'
import { TapedPhoto } from '../ui/TapedPhoto'

// 3つのバンドを、それぞれの色の面で横いっぱいに並べる
export function BandSheets({
  bands,
  headingLevel = 'h3',
}: {
  bands: Band[]
  headingLevel?: 'h2' | 'h3'
}) {
  const { t } = useTranslation()
  const l = useLocalized()
  const Heading = headingLevel

  return (
    <div className="relative mt-8">
      {bands.map((band, i) => {
        const slug = band.slug
        const name = band.name
        const flip = i % 2 === 1
        return (
          <section
            key={band.id}
            aria-labelledby={`band-${band.id}`}
            className={`relative ${BAND_BG[slug]} ${BAND_TEXT[slug]}`}
          >
            <TornEdge className={BAND_BG[slug]} />
            <div
              className={`mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:py-20 ${band.photo ? 'lg:grid-cols-2 lg:gap-16' : ''}`}
            >
              {/* 写真がないときは、バンド名と紹介文を左右に分けて面の幅を使う */}
              <div
                className={
                  band.photo
                    ? flip
                      ? 'lg:order-2'
                      : ''
                    : 'grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16'
                }
              >
                <Heading
                  id={`band-${band.id}`}
                  className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.05] [text-wrap:balance]"
                >
                  {name}
                </Heading>
                <div>
                  <p
                    className={`max-w-[46ch] text-lg leading-relaxed ${band.photo ? 'mt-5' : ''}`}
                  >
                    {l(band.desc, band.desc_en)}
                  </p>
                  <div className="mt-6">
                    <SnsLinks
                      instagram={band.instagram}
                      x={band.x}
                      label={`${name} SNS`}
                      emptyText={`SNS: ${t('contact.unset')}`}
                    />
                  </div>
                </div>
              </div>
              {band.photo && (
                <TapedPhoto
                  image={band.photo}
                  alt={name}
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  tilt={flip ? -2 : 2}
                />
              )}
            </div>
          </section>
        )
      })}
      {/* 後ろに続く紙の色の縁 */}
      <div className="relative h-0">
        <TornEdge className="bg-paper" />
      </div>
    </div>
  )
}
