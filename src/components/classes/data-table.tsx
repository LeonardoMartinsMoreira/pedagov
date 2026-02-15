'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedTable } from '@/hooks/use-paginated-table'
import { useGetAllGroups } from '@/services/queries/get-all-groups'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddPedagogueDialog } from './AddClassDialog'

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
}

export function ClassesDataTable<TData>({ columns }: DataTableProps<TData>) {
  const addClass = useDialogState()

  const { pagination, table } = usePaginatedTable<TData>({
    data: [],
    columns,
    totalPages: 2,
  })

  const { data, isLoading } = useGetAllGroups({
    limit: LIMIT,
    page: pagination.pageIndex + 1,
    globalFilter: '',
  })

  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      data: (data?.result ?? []) as TData[],
      pageCount: data?.totalPages ?? 0,
    }))
  }, [table, data])

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable<TData>
        table={table}
        columns={columns}
        toolbarAction={
          <Button onClick={addClass.openDialog}>Adicionar Turma</Button>
        }
        footerLeft={
          <>
            {table.getFilteredRowModel().rows.length} turma(s) encontrada(s)
          </>
        }
      />
      <AddPedagogueDialog
        isVisible={addClass.isVisible}
        closeDialog={addClass.closeDialog}
      />
    </>
  )
}
