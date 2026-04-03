'use client'

import { OccurrencesDataTable } from '@/components/occurences/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  occurrencesColorsEnum,
  occurrencesTypesEnum,
} from '@/constants/occurrences-types-enum'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'
import { useDeleteOccurrence } from '@/services/mutations/delete-occurrence'
import { Trash } from '@phosphor-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { DeleteDialog } from '@/components/common/DeleteDialog'

function createColumns(
  onDeleteRequest: (occurrence: IOccurrence) => void
): ColumnDef<IOccurrence>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Título da ocorrência',
    },
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
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/occurrences/${row.original.occurrenceId}?studentId=${row.original.studentId}`}
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
            onClick={() => onDeleteRequest(row.original)}
            className="p-2 rounded-md hover:bg-destructive/10 transition-colors"
          >
            <Trash className="h-4 w-4 text-destructive" />
          </button>
        </div>
      ),
    },
  ]
}

export function OccurrencesList() {
  const [deletingOccurrence, setDeletingOccurrence] = useState<IOccurrence | null>(null)

  const handleCloseDialog = () => setDeletingOccurrence(null)

  const { mutate, isPending } = useDeleteOccurrence(handleCloseDialog)
  
  const columns = useMemo(
    () => createColumns(setDeletingOccurrence),
    []
  )

  const handleDelete = () => {
    if (deletingOccurrence) {
      mutate(deletingOccurrence.occurrenceId)
    }
  }

  const description = deletingOccurrence ? (
    <>
      Essa ação não pode ser revertida. Você tem certeza que deseja deletar
      a ocorrência{' '}
      <span className="font-bold text-black dark:text-white ">
        {deletingOccurrence.title}?
      </span>
    </>
  ) : null

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ocorrências</h1>
      </div>

      <OccurrencesDataTable columns={columns} />

      <DeleteDialog
        isVisible={!!deletingOccurrence}
        closeDialog={handleCloseDialog}
        isPending={isPending}
        handleDelete={handleDelete}
        description={description}
      />
    </div>
  )
}
