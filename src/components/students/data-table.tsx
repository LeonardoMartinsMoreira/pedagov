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

import { statusEnum } from '@/constants/status-enum'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface DataTableProps {
  columns: ColumnDef<IStudent, unknown>[]
}

export function StudentsDataTable({ columns }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [status, setStatus] = useState<string>('ACTIVE')

  const { table, isLoading, pageMeta } = useServerPaginatedDataTable<
    IStudent,
    IStudentsResponse,
    { status: string[] }
  >({
    columns,
    pageSize: LIMIT,
    useQueryWithPage: (page, filters) =>
      useGetAllStudents({ page, limit: LIMIT, status: filters?.status }),
    getData: (response) => response?.students ?? [],
    getPageMeta: (response) => response?.page,
    filters: {
      status: status === 'all' ? Object.keys(statusEnum) : [status],
    },
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
        toolbarExtra={
          <Select
            value={status}
            onValueChange={setStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {Object.entries(statusEnum).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
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
