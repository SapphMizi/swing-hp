import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'

export const Route = createFileRoute('/schedule')({ component: Schedule })

function Schedule() {
  const { t } = useTranslation()
  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-4xl mx-auto">
      <SectionTitle subtitle={t('schedule.subtitle')} title={t('schedule.title')} />
      <div className="mt-8 rounded-2xl border border-swing-amber/10 bg-swing-deep p-10 text-center">
        <p className="text-swing-amber font-mono text-xs tracking-[0.4em] uppercase mb-3">
          Coming Soon
        </p>
        <p className="text-swing-warm-gray text-sm leading-relaxed">
          Google カレンダー連携を準備中です。<br />
          各バンドのライブ情報は SNS でご確認ください。
        </p>
      </div>
    </main>
  )
}
