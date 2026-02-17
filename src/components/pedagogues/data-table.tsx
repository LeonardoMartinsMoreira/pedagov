'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedDataTable } from '@/hooks/use-paginated-data-table'
import { IPedagogue, IPedagogues } from '@/interfaces/pedagogues/pedagogues'
import { useGetAllPedagogues } from '@/services/queries/get-all-pedagogues'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddPedagogueDialog } from './AddPedagogueDialog'

interface DataTableProps {
  columns: ColumnDef<IPedagogue, unknown>[]
}

export function PedagoguesDataTable({ columns }: DataTableProps) {
  const addPedagogue = useDialogState()

  const { table, isLoading } = usePaginatedDataTable<IPedagogue, IPedagogues>({
    useQueryWithPage: (page) => useGetAllPedagogues({ limit: LIMIT, page }),
    getData: (data) => data?.result ?? [],
    getTotalPages: () => Infinity,
    columns,
  })

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        toolbarAction={
          <Button onClick={addPedagogue.openDialog}>
            Adicionar Pedagogo(a)
          </Button>
        }
      />
      <AddPedagogueDialog
        isVisible={addPedagogue.isVisible}
        closeDialog={addPedagogue.closeDialog}
      />
    </>
  )
}
