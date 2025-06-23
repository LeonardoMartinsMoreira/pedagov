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
import { IPedagogue } from '@/interfaces/pedagogues/pedagogues'
import { PedagogueProfileDialog } from './PedagogueProfileDialog'
import { DeletePedagogueDialog } from './DeletePedagogueDialog'

export const columns: ColumnDef<IPedagogue>[] = [
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
    accessorKey: 'role',
    header: '',
    cell: ({ row }) => {
      const roleLabel = row.original.role === 'ADMIN' ? 'Administrador' : ''

      return <div className="flex justify-end">{roleLabel}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const deletePedagogue = useDialogState()
      const pedagogueProfileDialog = useDialogState()

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
              <DropdownMenuItem onClick={pedagogueProfileDialog.openDialog}>
                Ver Perfil do Pedagogo(a)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deletePedagogue.openDialog}>
                Deletar Pedagogo(a)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <PedagogueProfileDialog
            pedagogue={row.original}
            isVisible={pedagogueProfileDialog.isVisible}
            closeDialog={pedagogueProfileDialog.closeDialog}
          />

          <DeletePedagogueDialog
            closeDialog={deletePedagogue.closeDialog}
            isVisible={deletePedagogue.isVisible}
            pedagogue={row.original}
          />
        </div>
      )
    },
  },
]
