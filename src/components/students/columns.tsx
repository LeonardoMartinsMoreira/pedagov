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
import { StudentProfileDialog } from './StudentProfileDialog'
import { DeleteStudentDialog } from './DeleteStudentDialog'
import { useRouter } from 'next/navigation'
import { IStudent } from '@/interfaces/students/students'

export const columns: ColumnDef<IStudent>[] = [
  {
    accessorKey: 'studentId',
    header: 'ID',
  },
  {
    accessorKey: 'student',
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
    accessorKey: 'group',
    header: 'Turma',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const student = row.original

      const studentProfileDialog = useDialogState()
      const deleteStudentDialog = useDialogState()
      const router = useRouter()

      return (
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
              onClick={() => router.push(`students/${student.studentId}`)}
            >
              Ver Perfil do Aluno
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/occurrences/new-occurrence/${student.studentId}`)
              }
            >
              Registrar Ocorrência
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteStudentDialog.openDialog}>
              Deletar aluno
            </DropdownMenuItem>
          </DropdownMenuContent>

          <StudentProfileDialog
            student={student}
            closeDialog={studentProfileDialog.closeDialog}
            isVisible={studentProfileDialog.isVisible}
          />

          <DeleteStudentDialog
            closeDialog={deleteStudentDialog.closeDialog}
            isVisible={deleteStudentDialog.isVisible}
            student={student}
          />
        </DropdownMenu>
      )
    },
  },
]
