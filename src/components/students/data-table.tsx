'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { DataTable } from '@/components/data-table'
import { useDialogState } from '@/hooks/use-dialog-state'
import { IStudent, IStudentsResponse } from '@/interfaces/students/students'
import { useGetAllStudents } from '@/services/queries/get-all-students'
import { LIMIT } from '@/constants/pagination'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddStudentDialog } from './AddStudentDialog'
import { useServerPaginatedDataTable } from '@/hooks/use-server-paginated-data-table'

interface DataTableProps {
  columns: ColumnDef<IStudent, unknown>[]
}

export function StudentsDataTable({ columns }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { table, isLoading, pageMeta } = useServerPaginatedDataTable<
    IStudent,
    IStudentsResponse
  >({
    columns,
    pageSize: LIMIT,
    useQueryWithPage: (page) => useGetAllStudents({ page, limit: LIMIT }),
    getData: (response) => response?.students ?? [],
    getPageMeta: (response) => response?.page,
  })

  const addStudent = useDialogState()

  const wrappedTable = useReactTable({
    data: table.options.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      ...table.getState(),
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: table.options.onPaginationChange,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: table.getPageCount(),
  })

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable
        table={wrappedTable}
        columns={columns}
        toolbarAction={
          <Button onClick={addStudent.openDialog}>Adicionar Aluno</Button>
        }
        footerLeft={
          pageMeta ? (
            <>
              Pagina {pageMeta.currentPage} - {pageMeta.total} aluno(s)
            </>
          ) : null
        }
      />
      <AddStudentDialog
        closeDialog={addStudent.closeDialog}
        isVisible={addStudent.isVisible}
      />
    </>
  )
}
