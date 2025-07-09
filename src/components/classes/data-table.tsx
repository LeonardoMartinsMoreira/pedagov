'use client'

import { type ColumnDef, flexRender } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedTable } from '@/hooks/use-paginated-table'
import { useGetAllGroups } from '@/services/queries/get-all-groups'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { AddPedagogueDialog } from './AddClassDialog'

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
}

export function ClassesDataTable<TData>({ columns }: DataTableProps<TData>) {
  const addPedagogue = useDialogState()

  const { pagination, globalFilter, setGlobalFilter, table } =
    usePaginatedTable<TData>({
      data: [],
      columns,
      totalPages: 2,
    })

  const { data, isLoading } = useGetAllGroups({
    limit: LIMIT,
    page: pagination.pageIndex + 1,
    globalFilter: '',
  })

  const groups = data?.result ?? []

  table.setOptions((prev) => ({
    ...prev,
    data: groups as TData[],
    pageCount: data?.totalPages ?? 0,
  }))

  if (isLoading) return <Loading />

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="w-full flex gap-x-4">
          <Input
            placeholder="Filtre por Nome da turma"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Button onClick={addPedagogue.openDialog}>Adicionar Turma</Button>
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
                  Nenhum resultado foi encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} turma(s) encontrada(s)
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

      <AddPedagogueDialog
        isVisible={addPedagogue.isVisible}
        closeDialog={addPedagogue.closeDialog}
      />
    </div>
  )
}
