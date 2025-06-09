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
import { PedagogueProfileDialog } from './PedagogueProfileDialog'
import { DeletePedagogueDialog } from './DeletePedagogueDialog'

type TPedadogueTable = {
  id: number
  nome: string
}

export const columns: ColumnDef<TPedadogueTable>[] = [
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
            idSelectedPedagogue={row.original.id}
            isVisible={pedagogueProfileDialog.isVisible}
            closeDialog={pedagogueProfileDialog.closeDialog}
          />

          <DeletePedagogueDialog
            closeDialog={deletePedagogue.closeDialog}
            isVisible={deletePedagogue.isVisible}
            idSelectedPedagogue={row.original.id}
          />
        </div>
      )
    },
  },
]
