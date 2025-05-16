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
import { useDialogState } from '@/hooks/useDialogState'
import { StudentProfileDialog } from './StudentProfileDialog'
import { DeleteStudentDialog } from './DeleteStudentDialog'
import { useRouter } from 'next/navigation'

type TAlunoTable = {
  id: number
  nome: string
  turma: string
}

export const columns: ColumnDef<TAlunoTable>[] = [
  {
    accessorKey: 'nome',
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
    accessorKey: 'turma',
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
              onClick={() => router.push(`students/${student.id}`)}
            >
              Ver Perfil do Aluno
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/occurrences/new-occurrence/${student.id}`)
              }
            >
              Registrar Ocorrência
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteStudentDialog.openDialog}>
              Deletar aluno
            </DropdownMenuItem>
          </DropdownMenuContent>

          <StudentProfileDialog
            idSelectedStudent={student.id}
            closeDialog={studentProfileDialog.closeDialog}
            isVisible={studentProfileDialog.isVisible}
          />

          <DeleteStudentDialog
            closeDialog={deleteStudentDialog.closeDialog}
            isVisible={deleteStudentDialog.isVisible}
            idSelectedStudent={student.id}
          />
        </DropdownMenu>
      )
    },
  },
]
