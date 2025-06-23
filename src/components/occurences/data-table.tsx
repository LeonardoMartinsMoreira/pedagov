'use client'

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { EmptyState } from '../empty-state'
import { occurrencesTypesEnum } from '@/constants/occurrences-types-enum'
import { useGetAllOccurrences } from '@/services/queries/get-all-occurrences'
import { Loading } from '../loading'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'

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

  const router = useRouter()

  const { data, isLoading } = useGetAllOccurrences({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    globalFilter,
    type: columnFilters.find((filter) => filter.id === 'type')?.value as string,
  })

  const occurrences = data?.result

  const handleOnNewOccurrenceClick = () =>
    router.push(`occurrences/new-occurrence/null`)

  const table = useReactTable<IOccurrence>({
    data: occurrences!,
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
    pageCount: data?.totalPages || -1,
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4">
        <div className="w-full flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Buscar por aluno, № Ocorrência, data..."
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="max-w-sm"
          />
          <div className="flex gap-2">
            <Select
              onValueChange={(value) => {
                table
                  .getColumn('type')
                  ?.setFilterValue(value === 'all' ? null : value)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue defaultValue="all" placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <>
                  <SelectItem value="all">Todos</SelectItem>
                  {Object.entries(occurrencesTypesEnum).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleOnNewOccurrenceClick}
          className="whitespace-nowrap"
        >
          Nova Ocorrência
        </Button>
      </div>
      <div className="rounded-md border">
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <EmptyState />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {data?.totalItems || 0} ocorrência(s) encontrada(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
