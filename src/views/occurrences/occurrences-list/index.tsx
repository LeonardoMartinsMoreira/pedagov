'use client'

import { Loading } from '@/components/loading'
import { OccurrencesDataTable } from '@/components/occurences/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import {
  occurrencesColorsEnum,
  occurrencesTypesEnum,
} from '@/constants/occurrences-types-enum'
import { useFilters } from '@/hooks/use-filters'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'
import { useGetAllOccurrences } from '@/services/queries/get-all-occurrences'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

const columns: ColumnDef<IOccurrence>[] = [
  {
    accessorKey: 'student',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Aluno
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={`/occurrences/${row.original.occurrenceId}`}
          className="font-medium hover:underline"
        >
          {row.getValue('student')}
        </Link>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type') as string

      return (
        <Badge variant={occurrencesColorsEnum[type]}>
          {occurrencesTypesEnum[type]}
        </Badge>
      )
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'occurrenceId',
    header: '№ Ocorrência',
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger className="max-w-32 text-ellipsis text-nowrap overflow-hidden whitespace-nowrap">
            {row.original.occurrenceId}
          </TooltipTrigger>
          <TooltipContent className="p-1 rounded bg-muted border border-muted-foreground">
            {row.original.occurrenceId}
          </TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Data
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawDate = row.getValue('createdAt') as string
      const date = new Date(rawDate)

      return format(date, 'dd/MM/yyyy', { locale: ptBR })
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Link href={`/occurrences/${row.original.occurrenceId}`}>
            <Button variant="ghost" size="sm">
              Detalhes
            </Button>
          </Link>
        </div>
      )
    },
  },
]

export function OccurrencesList() {
  const { filters } = useFilters()
  const { data, isLoading } = useGetAllOccurrences(filters)

  const occurrences = data?.result

  if (isLoading) return <Loading />

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-een items-center">
        <h1 className="text-3xl font-bold">Ocorrências</h1>
      </div>

      <OccurrencesDataTable columns={columns} data={occurrences} />
    </div>
  )
}
