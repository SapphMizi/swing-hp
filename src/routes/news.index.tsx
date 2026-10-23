import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Page } from '../components/layout/Page'
import { NewsList } from '../components/home/NewsList'
import { SectionHeading } from '../components/ui/SectionHeading'
import { postsQuery } from '../lib/queries'

export const Route = createFileRoute('/news/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQuery('news')),
  head: () => ({ meta: [{ title: 'お知らせ | 大阪大学 軽音楽部 SWING' }] }),
  component: NewsIndex,
})

function NewsIndex() {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery(postsQuery('news'))
  return (
    <Page narrow>
      <SectionHeading as="h1" en="News" ja={t('news.label')} />
      <NewsList posts={data.contents} emptyText={t('news.empty')} />
    </Page>
  )
}
