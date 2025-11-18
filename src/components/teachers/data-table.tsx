'use client'

import { type ColumnDef, flexRender } from '@tanstack/react-table'

import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedTable } from '@/hooks/use-paginated-table'
import { ITeacher } from '@/interfaces/teachers/teacher'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { useGetAllTeachers } from '@/services/queries/get-all-teachers'

interface DataTableProps {
  columns: ColumnDef<ITeacher, unknown>[]
}

export function TeachersDataTable({ columns }: DataTableProps) {
  const addTeacher = useDialogState()

  const { pagination, globalFilter, setGlobalFilter, table } =
    usePaginatedTable<ITeacher>({
      data: [],
      columns,
      totalPages: 2,
    })

  const { data, isLoading } = useGetAllTeachers({
    limit: LIMIT,
    page: pagination.pageIndex + 1,
  })

  const teachers = data?.result ?? []

  table.setOptions((prev) => ({
    ...prev,
    data: teachers,
    pageCount: 10,
  }))

  if (isLoading) return <Loading />

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="w-full flex gap-x-4">
          <Input
            placeholder="Filtre por Nome"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Button onClick={addTeacher.openDialog}>Adicionar Pedagogo(a)</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                  Nenhum resultado encontrado.
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
    </div>
  )
}
