'use client'

import { OccurrencesDataTable } from '@/components/occurences/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import {
  occurrencesColorsEnum,
  occurrencesTypesEnum,
} from '@/constants/occurrences-types-enum'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'
import { useDeleteOccurrence } from '@/services/mutations/delete-occurrence'
import { Trash } from '@phosphor-icons/react'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpDown, Loader } from 'lucide-react'
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate, isPending } = useDeleteOccurrence()

      return (
        <div className="flex items-center justify-end gap-3">
          <Link
            href={{
              pathname: `/occurrences/${row.original.occurrenceId}`,
              query: {
                studentId: row.original.studentId,
              },
            }}
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              Detalhes
            </Button>
          </Link>

          <button
            onClick={() => mutate(row.original.occurrenceId)}
            className="p-2 rounded-md hover:bg-destructive/10 transition-colors"
          >
            {isPending ? (
              <Loader className="h-4 w-4 animate-spin text-destructive" />
            ) : (
              <Trash className="h-4 w-4 text-destructive" />
            )}
          </button>
        </div>
      )
    },
  },
]

export function OccurrencesList() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-een items-center">
        <h1 className="text-3xl font-bold">Ocorrências</h1>
      </div>

      <OccurrencesDataTable columns={columns} />
    </div>
  )
}
