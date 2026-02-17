'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedDataTable } from '@/hooks/use-paginated-data-table'
import { IGroup } from '@/interfaces/groups/groups'
import { useGetAllGroups } from '@/services/queries/get-all-groups'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddPedagogueDialog } from './AddClassDialog'

interface DataTableProps {
  columns: ColumnDef<IGroup, unknown>[]
}

export function ClassesDataTable({ columns }: DataTableProps) {
  const addClass = useDialogState()

  const { table, isLoading } = usePaginatedDataTable<IGroup, { result: IGroup[]; totalPages: number }>({
    useQueryWithPage: (page) =>
      useGetAllGroups({ limit: LIMIT, page, globalFilter: '' }),
    getData: (data) => data?.result ?? [],
    getTotalPages: (data) => data?.totalPages ?? 0,
    columns,
  })

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable<IGroup>
        table={table}
        columns={columns}
        toolbarAction={
          <Button onClick={addClass.openDialog}>Adicionar Turma</Button>
        }
        footerLeft={
          <>{table.getFilteredRowModel().rows.length} turma(s) encontrada(s)</>
        }
      />
      <AddPedagogueDialog
        isVisible={addClass.isVisible}
        closeDialog={addClass.closeDialog}
      />
    </>
  )
}
