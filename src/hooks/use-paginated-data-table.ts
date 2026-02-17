import { type ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { usePaginatedTable } from './use-paginated-table'

export interface UsePaginatedDataTableOptions<TData, TResponse> {
  useQueryWithPage: (page: number) => { data?: TResponse; isLoading: boolean }
  getData: (data: TResponse | undefined) => TData[]
  getTotalPages: (data: TResponse | undefined) => number
  columns: ColumnDef<TData, unknown>[]
}

export function usePaginatedDataTable<TData, TResponse>({
  useQueryWithPage,
  getData,
  getTotalPages,
  columns,
}: UsePaginatedDataTableOptions<TData, TResponse>) {
  const [pageIndex, setPageIndex] = useState(0)
  const { data, isLoading } = useQueryWithPage(pageIndex + 1)

  const { pagination, table } = usePaginatedTable<TData>({
    data: getData(data),
    columns,
    totalPages: getTotalPages(data),
  })

  useEffect(() => {
    if (pagination.pageIndex !== pageIndex) setPageIndex(pagination.pageIndex)
  }, [pagination.pageIndex, pageIndex])

  return { table, isLoading }
}
