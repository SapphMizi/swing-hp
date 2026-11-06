import { createFileRoute, notFound } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ArticlePage } from '../components/ArticlePage'
import { postQuery } from '../lib/queries'

export const Route = createFileRoute('/live-reports/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    const post = await queryClient.ensureQueryData(postQuery(params.id))
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} | 大阪大学 軽音楽部 SWING`
          : 'ライブレポート | 大阪大学 軽音楽部 SWING',
      },
    ],
  }),
  component: LiveReportArticle,
})

function LiveReportArticle() {
  const { t } = useTranslation()
  const { id } = Route.useParams()
  const { data } = useSuspenseQuery(postQuery(id))
  return (
    <ArticlePage
      post={data}
      backTo="/live-reports"
      notFoundText={t('liveReports.notFound')}
    />
  )
}
