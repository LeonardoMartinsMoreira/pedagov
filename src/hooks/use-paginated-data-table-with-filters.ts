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
import { useEffect, useState } from 'react'

export interface UsePaginatedDataTableWithFiltersOptions<TData, TResponse> {
  useQueryWithPage: (
    page: number,
    filters: { globalFilter: string; type?: string }
  ) => { data?: TResponse; isLoading: boolean }
  getData: (data: TResponse | undefined) => TData[]
  getTotalPages: (data: TResponse | undefined) => number
  columns: ColumnDef<TData, unknown>[]
  initialSorting?: SortingState
  pageSize?: number
}
export function usePaginatedDataTableWithFilters<TData, TResponse>({
  useQueryWithPage,
  getData,
  getTotalPages,
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
    pageCount: getTotalPages(data) ?? -1,
  })

  // Sincronizar página da tabela com estado (troca de página pelos botões)
  useEffect(() => {
    if (pagination.pageIndex !== pageIndex) setPageIndex(pagination.pageIndex)
  }, [pagination.pageIndex, pageIndex])

  // Ao mudar filtros, voltar para a primeira página
  useEffect(() => {
    setPageIndex(0)
    setPagination((prev) =>
      prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }
    )
  }, [globalFilter, typeFilter])

  return {
    table,
    isLoading,
    columnFilters,
    setColumnFilters,
  }
}
