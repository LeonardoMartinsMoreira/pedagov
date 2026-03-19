/* eslint-disable react-hooks/rules-of-hooks */

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDialogState } from '@/hooks/use-dialog-state'
import { IGroup } from '@/interfaces/groups/groups'
import { shiftsEnum } from '@/constants/shifts-enum'
import { Badge } from '../ui/badge'
import { DeleteGroupDialog } from './DeleteGroupDialog'
import { ImportStudentsDialog } from './InsertStudentsDialog'
import { EditClassDialog } from './EditClassDialog'

export const columns: ColumnDef<IGroup>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <button
          className="flex gap-x-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Turma
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
  },
  {
    header: 'Período',
    accessorKey: 'shift',
    cell: ({ row }) => {
      return <Badge>{shiftsEnum[row.original.shift]}</Badge>
    },
  },
  {
    header: '№ Alunos',
    accessorKey: 'numberOfStudents',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const deleteGroupModal = useDialogState()
      const importStudentsModal = useDialogState()
      const editClassModal = useDialogState()

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
              <DropdownMenuItem onClick={importStudentsModal.openDialog}>
                Importar alunos por CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deleteGroupModal.openDialog}>
                Deletar Turma
              </DropdownMenuItem>
              <DropdownMenuItem onClick={editClassModal.openDialog}>
                Editar Turma
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteGroupDialog
            closeDialog={deleteGroupModal.closeDialog}
            group={row.original}
            isVisible={deleteGroupModal.isVisible}
          />

          <ImportStudentsDialog
            closeDialog={importStudentsModal.closeDialog}
            isVisible={importStudentsModal.isVisible}
            groupId={row.original.id}
          />

          <EditClassDialog
            closeDialog={importStudentsModal.closeDialog}
            isVisible={importStudentsModal.isVisible}
            classValues={row.original}
          />
        </div>
      )
    },
  },
]
