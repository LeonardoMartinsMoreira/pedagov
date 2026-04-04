import { type ColumnDef } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

import type { IPageMeta } from '@/interfaces/pagination'

interface UseServerPaginatedDataTableOptions<TData, TResponse, TFilter = any> {
  columns: ColumnDef<TData, unknown>[]
  pageSize: number
  useQueryWithPage: (
    page: number,
    filters?: TFilter
  ) => {
    data?: TResponse
    isLoading: boolean
    isFetching?: boolean
  }
  getData: (response: TResponse | undefined) => TData[]
  getPageMeta: (response: TResponse | undefined) => IPageMeta | undefined
  filters?: TFilter
}

export function useServerPaginatedDataTable<TData, TResponse, TFilter = any>({
  columns,
  pageSize,
  useQueryWithPage,
  getData,
  getPageMeta,
  filters,
}: UseServerPaginatedDataTableOptions<TData, TResponse, TFilter>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const requestedPage = pagination.pageIndex + 1
  const { data, isLoading, isFetching } = useQueryWithPage(requestedPage, filters)
  const pageMeta = getPageMeta(data)

  useEffect(() => {
    setPagination((prev) => (prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }))
  }, [filters])

  useEffect(() => {
    if (!pageMeta) return
    const pageIndexFromApi = Math.max(0, pageMeta.currentPage - 1)

    setPagination((prev) =>
      prev.pageIndex === pageIndexFromApi
        ? prev
        : { ...prev, pageIndex: pageIndexFromApi }
    )
  }, [pageMeta])

  const pageCount = useMemo(() => {
    if (!pageMeta) return -1
    return Math.max(1, pageMeta.lastPage)
  }, [pageMeta])

  const table = useReactTable<TData>({
    data: getData(data),
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount,
  })

  return {
    table,
    isLoading: isLoading && !data,
    isFetching,
    pageMeta,
  }
}
