'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { useServerPaginatedDataTable } from '@/hooks/use-server-paginated-data-table'
import { ITeacher, ITeachersResponse } from '@/interfaces/teachers/teacher'
import { useGetAllTeachers } from '@/services/queries/get-all-teachers'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddTeacherDialog } from './AddTeacherDialog'

interface DataTableProps {
  columns: ColumnDef<ITeacher, unknown>[]
}

export function TeachersDataTable({ columns }: DataTableProps) {
  const addTeacher = useDialogState()

  const { table, isLoading, pageMeta } = useServerPaginatedDataTable<
    ITeacher,
    ITeachersResponse
  >({
    columns,
    pageSize: LIMIT,
    useQueryWithPage: (page) => useGetAllTeachers({ limit: LIMIT, page }),
    getData: (response) => response?.teachers ?? [],
    getPageMeta: (response) => response?.page,
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
        footerLeft={
          pageMeta ? (
            <>
              Página {pageMeta.currentPage} - {pageMeta.total} professor(es)
            </>
          ) : null
        }
      />
      <AddTeacherDialog
        closeDialog={addTeacher.closeDialog}
        isVisible={addTeacher.isVisible}
      />
    </>
  )
}
