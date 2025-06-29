'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDialogState } from '@/hooks/use-dialog-state'
import { SelectItem } from '@radix-ui/react-select'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { AddStudentDialog } from './AddStudentDialog'
import { fakeClasses } from '@/faker/classes'
import { useGetAllStudents } from '@/services/queries/get-all-students'
import { IStudent } from '@/interfaces/students/students'

interface DataTableProps {
  columns: ColumnDef<IStudent, unknown>[]
}

export function StudentsDataTable({ columns }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState<string[]>([])
  const [filterByClass, setFilterByClass] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { data } = useGetAllStudents()

  const addStudent = useDialogState()

  const students = data?.result ?? []

  const table = useReactTable({
    data: students,
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

  useEffect(() => {
    if (filterByClass) {
      setColumnFilters([{ id: 'turma', value: filterByClass }])
    } else {
      setColumnFilters([])
    }
  }, [filterByClass])

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="w-full flex gap-x-4">
          <Input
            placeholder="Filtre por Nome / Turma / Serie"
            value={globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="max-w-sm"
          />

          <div className="space-y-2">
            <Select value={filterByClass} onValueChange={setFilterByClass}>
              <SelectTrigger id="class">
                <SelectValue placeholder="Selecione uma turma">
                  {filterByClass && <span>{filterByClass}</span>}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="p-2">
                {fakeClasses.map(({ class: className }) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={addStudent.openDialog}>Adicionar Aluno</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado foi encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} aluno(s) encontrada(s)
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Voltar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>

      <AddStudentDialog
        closeDialog={addStudent.closeDialog}
        isVisible={addStudent.isVisible}
      />
    </div>
  )
}
