'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedTable } from '@/hooks/use-paginated-table'
import { IPedagogue } from '@/interfaces/pedagogues/pedagogues'
import { useGetAllPedagogues } from '@/services/queries/get-all-pedagogues'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddPedagogueDialog } from './AddPedagogueDialog'

interface DataTableProps {
  columns: ColumnDef<IPedagogue, unknown>[]
}

export function PedagoguesDataTable({ columns }: DataTableProps) {
  const addPedagogue = useDialogState()

  const { pagination, table } = usePaginatedTable<IPedagogue>({
    data: [],
    columns,
    totalPages: 2,
  })

  const { data, isLoading } = useGetAllPedagogues({
    limit: LIMIT,
    page: pagination.pageIndex + 1,
  })

  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      data: data?.result ?? [],
      pageCount: 10,
    }))
  }, [table, data])

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
