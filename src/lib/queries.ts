import { queryOptions } from '@tanstack/react-query'
import type { PostCategory } from './cms-types'
import {
  getBands,
  getHistory,
  getLiveReportYears,
  getPost,
  getPosts,
  getSite,
} from '../server/cms'

const STALE = 60_000

export const postsQuery = (
  category: PostCategory,
  opts: { limit?: number; year?: number } = {},
) =>
  queryOptions({
    queryKey: ['posts', category, opts.limit ?? null, opts.year ?? null],
    queryFn: () => getPosts({ data: { category, ...opts } }),
    staleTime: STALE,
  })

export const postQuery = (id: string) =>
  queryOptions({
    queryKey: ['post', id],
    queryFn: () => getPost({ data: { id } }),
    staleTime: STALE,
  })

export const liveReportYearsQuery = () =>
  queryOptions({
    queryKey: ['live-report-years'],
    queryFn: () => getLiveReportYears(),
    staleTime: STALE,
  })

export const siteQuery = () =>
  queryOptions({
    queryKey: ['site'],
    queryFn: () => getSite(),
    staleTime: STALE,
  })

export const bandsQuery = () =>
  queryOptions({
    queryKey: ['bands'],
    queryFn: () => getBands(),
    staleTime: STALE,
  })

export const historyQuery = () =>
  queryOptions({
    queryKey: ['history'],
    queryFn: () => getHistory(),
    staleTime: STALE,
  })
