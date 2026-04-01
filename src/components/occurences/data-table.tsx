'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import { DataTable } from '@/components/data-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { occurrencesTypesEnum } from '@/constants/occurrences-types-enum'
import { usePaginatedDataTableWithFilters } from '@/hooks/use-paginated-data-table-with-filters'
import {
  IOccurrence,
  IOccurrencesResponse,
} from '@/interfaces/occurrences/occurrences'
import { useGetAllOccurrences } from '@/services/queries/get-all-occurrences'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { EmptyState } from '../empty-state'

interface OccurrencesDataTableProps {
  columns: ColumnDef<IOccurrence>[]
}

const LIMIT = 10

export function OccurrencesDataTable({ columns }: OccurrencesDataTableProps) {
  const router = useRouter()

  const { table, isLoading, columnFilters, setColumnFilters, pageMeta } =
    usePaginatedDataTableWithFilters<IOccurrence, IOccurrencesResponse>({
      useQueryWithPage: (page, filters) =>
        useGetAllOccurrences({
          page,
          limit: LIMIT,
          globalFilter: filters.globalFilter,
          type: filters.type,
        }),
      getData: (data) => data?.occurrences ?? [],
      getPageMeta: (data) => data?.page,
      columns,
      initialSorting: [{ id: 'createdAt', desc: true }],
      pageSize: LIMIT,
    })

  const typeFilter = columnFilters.find((f) => f.id === 'type')?.value as
    | string
    | undefined
  const selectValue = typeFilter ?? 'all'

  if (isLoading) return <Loading />

  return (
    <DataTable<IOccurrence>
      table={table}
      columns={columns}
      toolbarExtra={
        <Select
          value={selectValue}
          onValueChange={(value) => {
            setColumnFilters(
              value === 'all'
                ? columnFilters.filter((f) => f.id !== 'type')
                : [{ id: 'type', value }]
            )
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
      footerLeft={
        pageMeta ? (
          <>
            Página {pageMeta.currentPage} - {pageMeta.total} ocorrência(s)
          </>
        ) : null
      }
    />
  )
}
