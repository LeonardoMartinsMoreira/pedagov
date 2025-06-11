'use client'

import { Loading } from '@/components/loading'
import { OccurrencesDataTable } from '@/components/occurences/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFilters } from '@/hooks/use-filters'
import { IOccurrence } from '@/interfaces/occurrences/occurrences-interface'
import { useGetAllOccurrences } from '@/services/queries/get-all-occurrences'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { ptBR } from 'date-fns/locale'

const columns: ColumnDef<IOccurrence>[] = [
  {
    accessorKey: 'id',
    header: '№ Ocorrência',
    cell: ({ row }) => <div className="font-medium">#{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'students',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Aluno
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link
        href={`/occurrences/${row.getValue('id')}`}
        className="font-medium hover:underline"
      >
        {row.getValue('students')}
      </Link>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type') as string

      const getBadgeVariant = (type: string) => {
        switch (type) {
          case 'Comportamento':
            return 'destructive'
          case 'Atraso':
            return 'warning'
          case 'Falta':
            return 'secondary'
          case 'Uniforme':
            return 'outline'
          default:
            return 'default'
        }
      }

      return (
        <Badge
          variant={
            getBadgeVariant(type) as
              | 'default'
              | 'destructive'
              | 'outline'
              | 'secondary'
              | null
              | undefined
          }
        >
          {type}
        </Badge>
      )
    },
    filterFn: 'equals',
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
    accessorKey: 'group',
    header: 'Turma',
    filterFn: 'equals',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Link href={`/occurrences/${row.getValue('id')}`}>
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
