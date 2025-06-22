'use client'

import { type ColumnDef, flexRender } from '@tanstack/react-table'

import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { usePaginatedTable } from '@/hooks/use-paginated-table'
import { IPedagogue } from '@/interfaces/pedagogues/pedagogues'
import { useGetAllPedagogues } from '@/services/queries/get-all-pedagogues'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { AddPedagogueDialog } from './AddPedagogueDialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

interface DataTableProps {
  columns: ColumnDef<IPedagogue, unknown>[]
}

export function PedagoguesDataTable({ columns }: DataTableProps) {
  const addPedagogue = useDialogState()

  const { pagination, globalFilter, setGlobalFilter, table } =
    usePaginatedTable<IPedagogue>({
      data: [],
      columns,
      totalPages: 2,
    })

  const { data, isLoading } = useGetAllPedagogues({
    limit: LIMIT,
    page: pagination.pageIndex + 1,
  })

  const pedagogues = data?.result ?? []

  table.setOptions((prev) => ({
    ...prev,
    data: pedagogues,
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

        <Button onClick={addPedagogue.openDialog}>Adicionar Pedagogo(a)</Button>
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
        <div className="flex-1 text-sm text-muted-foreground">
          {0} pedagogo(s) encontrado(s)
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
