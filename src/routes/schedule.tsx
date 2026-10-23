import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Page } from '../components/layout/Page'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ButtonLink } from '../components/ui/ButtonLink'

export const Route = createFileRoute('/schedule')({
  head: () => ({ meta: [{ title: 'スケジュール | 大阪大学 軽音楽部 SWING' }] }),
  component: Schedule,
})

function Schedule() {
  const { t } = useTranslation()
  return (
    <Page narrow>
      <SectionHeading as="h1" en="Schedule" ja={t('schedule.label')} />
      <div
        className="relative max-w-xl bg-yellow p-8 shadow-[0_10px_18px_-10px_rgba(43,29,31,0.5)]"
        style={{ rotate: '-1.5deg' }}
      >
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-pink/70 mix-blend-multiply"
        />
        <p className="text-lg font-bold leading-relaxed">
          {t('schedule.preparing')}
        </p>
      </div>
      <div className="mt-10">
        <ButtonLink to="/contact" variant="secondary">
          {t('schedule.toContact')}
        </ButtonLink>
      </div>
    </Page>
  )
}
