import { type ColumnDef } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

interface ServerPaginationMeta {
  currentPage: number
  lastPage: number
  next: number | null
  prev: number | null
  total: number
}

interface UseServerPaginatedDataTableOptions<TData, TResponse> {
  columns: ColumnDef<TData, unknown>[]
  pageSize: number
  useQueryWithPage: (page: number) => {
    data?: TResponse
    isLoading: boolean
    isFetching?: boolean
  }
  getData: (response: TResponse | undefined) => TData[]
  getPageMeta: (
    response: TResponse | undefined
  ) => ServerPaginationMeta | undefined
}

export function useServerPaginatedDataTable<TData, TResponse>({
  columns,
  pageSize,
  useQueryWithPage,
  getData,
  getPageMeta,
}: UseServerPaginatedDataTableOptions<TData, TResponse>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const requestedPage = pagination.pageIndex + 1
  const { data, isLoading, isFetching } = useQueryWithPage(requestedPage)
  const pageMeta = getPageMeta(data)

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
