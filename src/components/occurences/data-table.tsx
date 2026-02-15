'use client'

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DataTable } from '@/components/data-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { occurrencesTypesEnum } from '@/constants/occurrences-types-enum'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'
import { useGetAllOccurrences } from '@/services/queries/get-all-occurrences'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { EmptyState } from '../empty-state'

interface OccurrencesDataTableProps {
  columns: ColumnDef<IOccurrence>[]
}

export function OccurrencesDataTable({ columns }: OccurrencesDataTableProps) {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useGetAllOccurrences({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    globalFilter,
    type: columnFilters.find((f) => f.id === 'type')?.value as string,
  })

  const router = useRouter()
  const occurrences = data?.result ?? []

  const table = useReactTable<IOccurrence>({
    data: occurrences,
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
    pageCount: data?.totalPages ?? -1,
  })

  if (isLoading) return <Loading />

  return (
    <DataTable<IOccurrence>
      table={table}
      columns={columns}
      toolbarExtra={
        <Select
          onValueChange={(value) => {
            table
              .getColumn('type')
              ?.setFilterValue(value === 'all' ? undefined : value)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {Object.entries(occurrencesTypesEnum).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
      toolbarAction={
        <Button
          onClick={() => router.push('/occurrences/new-occurrence/null')}
          className="whitespace-nowrap"
        >
          Nova Ocorrência
        </Button>
      }
      emptyComponent={<EmptyState />}
    />
  )
}
