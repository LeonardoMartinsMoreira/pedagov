'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedDataTable } from '@/hooks/use-paginated-data-table'
import { ITeacher } from '@/interfaces/teachers/teacher'
import { useGetAllTeachers } from '@/services/queries/get-all-teachers'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddTeacherDialog } from './AddTeacherDialog'

interface DataTableProps {
  columns: ColumnDef<ITeacher, unknown>[]
}

export function TeachersDataTable({ columns }: DataTableProps) {
  const addTeacher = useDialogState()

  const { table, isLoading } = usePaginatedDataTable<
    ITeacher,
    ITeacher[] | undefined
  >({
    useQueryWithPage: (page) => useGetAllTeachers({ limit: LIMIT, page }),
    getData: (data) => data ?? [],
    getTotalPages: () => 1,
    columns,
  })

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        toolbarAction={
          <Button onClick={addTeacher.openDialog}>
            Adicionar Professor(a)
          </Button>
        }
      />
      <AddTeacherDialog
        closeDialog={addTeacher.closeDialog}
        isVisible={addTeacher.isVisible}
      />
    </>
  )
}
