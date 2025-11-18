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
import { DeleteTeacherDialog } from './DeleteTeachersDialog'
import { ITeacher } from '@/interfaces/teachers/teacher'

export const columns: ColumnDef<ITeacher>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },

  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const deleteTeacher = useDialogState()

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
              <DropdownMenuItem onClick={deleteTeacher.openDialog}>
                Deletar Professor(a)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteTeacherDialog
            teacher={row.original}
            closeDialog={deleteTeacher.closeDialog}
            isVisible={deleteTeacher.isVisible}
          />
        </div>
      )
    },
  },
]
