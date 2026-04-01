import { type ColumnDef } from '@tanstack/react-table'
import { useMemo, useState, useEffect } from 'react'

import type { IPageMeta } from '@/interfaces/pagination'

import { usePaginatedTable } from './use-paginated-table'

export interface UsePaginatedDataTableOptions<TData, TResponse> {
  useQueryWithPage: (page: number) => {
    data?: TResponse
    isLoading: boolean
    isFetching?: boolean
  }
  getData: (data: TResponse | undefined) => TData[]
  getPageMeta: (data: TResponse | undefined) => IPageMeta | undefined
  columns: ColumnDef<TData, unknown>[]
}

export function usePaginatedDataTable<TData, TResponse>({
  useQueryWithPage,
  getData,
  getPageMeta,
  columns,
}: UsePaginatedDataTableOptions<TData, TResponse>) {
  const [pageIndex, setPageIndex] = useState(0)
  const { data, isLoading, isFetching } = useQueryWithPage(pageIndex + 1)
  const pageMeta = getPageMeta(data)

  const totalPages = useMemo(() => {
    if (!pageMeta) return -1
    return Math.max(1, pageMeta.lastPage)
  }, [pageMeta])

  const { pagination, table } = usePaginatedTable<TData>({
    data: getData(data),
    columns,
    totalPages,
  })

  useEffect(() => {
    if (pagination.pageIndex !== pageIndex) setPageIndex(pagination.pageIndex)
  }, [pagination.pageIndex, pageIndex])

  return {
    table,
    isLoading: isLoading && !data,
    isFetching,
    pageMeta,
  }
}
