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
import { OcorrenciaDialog } from './OcorrenciaDialog/OcorrenciaDialog'

export type Payment = {
  id: number
  nome: string
  serie: string
  turma: string
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: 'serie',
    header: 'Serie',
  },
  {
    accessorKey: 'turma',
    header: 'Turma',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const student = row.original

      const ocorrenciaDialog = useDialogState()

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
            <DropdownMenuItem>Ver Perfil do Aluno</DropdownMenuItem>
            <DropdownMenuItem onClick={ocorrenciaDialog.openDialog}>
              Registrar Ocorrência
            </DropdownMenuItem>
            <DropdownMenuItem>Deletar aluno</DropdownMenuItem>
          </DropdownMenuContent>

          <OcorrenciaDialog
            idSelectedStudent={student.id}
            closeDialog={ocorrenciaDialog.closeDialog}
            isVisible={ocorrenciaDialog.isVisible}
          />
        </DropdownMenu>
      )
    },
  },
]
