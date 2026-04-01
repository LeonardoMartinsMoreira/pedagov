import { type ColumnDef } from '@tanstack/react-table'
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

import type { IPageMeta } from '@/interfaces/pagination'

export interface UsePaginatedDataTableWithFiltersOptions<TData, TResponse> {
  useQueryWithPage: (
    page: number,
    filters: { globalFilter: string; type?: string }
  ) => { data?: TResponse; isLoading: boolean; isFetching?: boolean }
  getData: (data: TResponse | undefined) => TData[]
  getPageMeta: (data: TResponse | undefined) => IPageMeta | undefined
  columns: ColumnDef<TData, unknown>[]
  initialSorting?: SortingState
  pageSize?: number
}
export function usePaginatedDataTableWithFilters<TData, TResponse>({
  useQueryWithPage,
  getData,
  getPageMeta,
  columns,
  initialSorting = [],
  pageSize = 10,
}: UsePaginatedDataTableWithFiltersOptions<TData, TResponse>) {
  const [pageIndex, setPageIndex] = useState(0)
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const typeFilter = columnFilters.find((f) => f.id === 'type')?.value as
    | string
    | undefined

  const { data, isLoading } = useQueryWithPage(pageIndex + 1, {
    globalFilter,
    type: typeFilter,
  })

  const pageMeta = getPageMeta(data)

  const pageCount = useMemo(() => {
    if (!pageMeta) return -1
    return Math.max(1, pageMeta.lastPage)
  }, [pageMeta])

  /** Só loading “cheio” quando não temos dados (carga inicial). Ao digitar, mantemos a tabela e o foco no input. */
  const isInitialLoading = isLoading && !data

  const table = useReactTable<TData>({
    data: getData(data),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount,
  })

  useEffect(() => {
    if (!pageMeta) return
    const pageIndexFromApi = Math.max(0, pageMeta.currentPage - 1)
    setPageIndex((prev) =>
      prev === pageIndexFromApi ? prev : pageIndexFromApi
    )
    setPagination((prev) =>
      prev.pageIndex === pageIndexFromApi
        ? prev
        : { ...prev, pageIndex: pageIndexFromApi }
    )
  }, [pageMeta])

  useEffect(() => {
    if (pagination.pageIndex !== pageIndex) setPageIndex(pagination.pageIndex)
  }, [pagination.pageIndex, pageIndex])

  useEffect(() => {
    setPageIndex(0)
    setPagination((prev) =>
      prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }
    )
  }, [globalFilter, typeFilter])

  return {
    table,
    isLoading: isInitialLoading,
    columnFilters,
    setColumnFilters,
    pageMeta,
  }
}
