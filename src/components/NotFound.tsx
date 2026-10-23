import { useTranslation } from 'react-i18next'
import { Page } from './layout/Page'
import { SectionHeading } from './ui/SectionHeading'
import { ButtonLink } from './ui/ButtonLink'

export function NotFound() {
  const { t } = useTranslation()
  return (
    <Page narrow>
      <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto]">
        <div>
          <SectionHeading as="h1" en="Not Found" ja="404" />
          <p className="max-w-[36ch] text-lg font-bold leading-relaxed">
            {t('notFound.text')}
          </p>
          <div className="mt-8">
            <ButtonLink to="/">{t('notFound.home')}</ButtonLink>
          </div>
        </div>
        <img
          src="/images/hand/chara.webp"
          alt=""
          width={323}
          height={328}
          className="mx-auto w-40 -rotate-12"
        />
      </div>
    </Page>
  )
}
