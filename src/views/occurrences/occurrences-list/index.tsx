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
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DeleteDialog } from '@/components/common/DeleteDialog'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ActionCell = ({
  occurrence,
  onDeleteRequest,
}: {
  occurrence: IOccurrence
  onDeleteRequest: (o: IOccurrence) => void
}) => {
  const router = useRouter()
  const occurrenceId = occurrence.occurrenceId || (occurrence as IOccurrence).id

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/occurrences/${occurrenceId}`)}
          >
            Ver Detalhes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/occurrences/${occurrenceId}/edit`)}
          >
            Editar Ocorrência
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDeleteRequest(occurrence)}>
            Deletar Ocorrência
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function createColumns(
  onDeleteRequest: (occurrence: IOccurrence) => void
): ColumnDef<IOccurrence>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Título da ocorrência',
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
        <ActionCell
          occurrence={row.original}
          onDeleteRequest={onDeleteRequest}
        />
      ),
    },
  ]
}

export function OccurrencesList() {
  const [deletingOccurrence, setDeletingOccurrence] =
    useState<IOccurrence | null>(null)

  const handleCloseDialog = () => setDeletingOccurrence(null)

  const { mutate, isPending } = useDeleteOccurrence(handleCloseDialog)

  const columns = useMemo(() => createColumns(setDeletingOccurrence), [])

  const handleDelete = () => {
    if (deletingOccurrence) {
      mutate(
        deletingOccurrence.occurrenceId ||
          ((deletingOccurrence as IOccurrence).id as string)
      )
    }
  }

  return (
    <div className="w-full">
      <OccurrencesDataTable columns={columns} />

      <DeleteDialog
        isVisible={!!deletingOccurrence}
        closeDialog={handleCloseDialog}
        isPending={isPending}
        handleDelete={handleDelete}
      >
        {deletingOccurrence && (
          <p className="text-center text-muted-foreground">
            Essa ação não pode ser revertida. Você tem certeza que deseja
            deletar a ocorrência{' '}
            <span className="font-bold text-black dark:text-white ">
              {deletingOccurrence.title}?
            </span>
          </p>
        )}
      </DeleteDialog>
    </div>
  )
}
