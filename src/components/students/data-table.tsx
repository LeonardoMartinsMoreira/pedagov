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
import { IStudent } from '@/interfaces/students/students'
import { useGetAllStudents } from '@/services/queries/get-all-students'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddStudentDialog } from './AddStudentDialog'

interface DataTableProps {
  columns: ColumnDef<IStudent, unknown>[]
}

export function StudentsDataTable({ columns }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { data, isLoading } = useGetAllStudents()
  const addStudent = useDialogState()

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        toolbarAction={
          <Button onClick={addStudent.openDialog}>Adicionar Aluno</Button>
        }
      />
      <AddStudentDialog
        closeDialog={addStudent.closeDialog}
        isVisible={addStudent.isVisible}
      />
    </>
  )
}
