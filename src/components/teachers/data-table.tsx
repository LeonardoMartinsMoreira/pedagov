'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedTable } from '@/hooks/use-paginated-table'
import { ITeacher } from '@/interfaces/teachers/teacher'
import { useGetAllTeachers } from '@/services/queries/get-all-teachers'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddTeacherDialog } from './AddTeachersDialog'

interface DataTableProps {
  columns: ColumnDef<ITeacher, unknown>[]
}

export function TeachersDataTable({ columns }: DataTableProps) {
  const addTeacher = useDialogState()

  const { pagination, table } = usePaginatedTable<ITeacher>({
      data: [],
      columns,
      totalPages: 1,
    })

  const { data, isLoading } = useGetAllTeachers({
    limit: LIMIT,
    page: pagination.pageIndex + 1,
  })

  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      data: data ?? [],
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
