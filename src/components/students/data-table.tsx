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
import { useDialogState } from '@/hooks/useDialogState'
import { faker } from '@faker-js/faker'
import { SelectItem } from '@radix-ui/react-select'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { AddStudentDialog } from './AddStudentDialog'

const generateFakeClass = () => {
  const series = `${faker.number.int({ min: 1, max: 9 })}º Ano`
  const turma = faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E'])

  return {
    serie: series,
    turma: turma,
  }
}

export const fakeClass = Array.from({ length: 6 }, () => generateFakeClass())

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function StudentsDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string[]>([])
  const [filterByClass, setFilterByClass] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const adicionarAluno = useDialogState()

  const table = useReactTable({
    data,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [serie, ano, turma] = filterByClass.split(' ')

      return setColumnFilters([
        { id: 'serie', value: `${serie} ${ano}` },
        { id: 'turma', value: turma },
      ])
    }
    setColumnFilters([])
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
                <SelectValue placeholder="Selecione uma turma" />
                {filterByClass && <span>{filterByClass}</span>}
              </SelectTrigger>
              <SelectContent className="p-2">
                {fakeClass.map(({ serie, turma }) => {
                  const itemId = `${serie} ${turma}`

                  return (
                    <SelectItem key={itemId} value={itemId}>
                      {itemId}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={adicionarAluno.openDialog}>Adicionar Aluno</Button>
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
        closeDialog={adicionarAluno.closeDialog}
        isVisible={adicionarAluno.isVisible}
      />
    </div>
  )
}
