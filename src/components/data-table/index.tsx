'use client'

import type { ColumnDef, Table as TanStackTable } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DATA_TABLE } from '@/constants/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface DataTableProps<TData> {
  table: TanStackTable<TData>
  columns: ColumnDef<TData, unknown>[]
  searchPlaceholder?: string
  toolbarAction?: React.ReactNode
  toolbarExtra?: React.ReactNode
  emptyMessage?: string
  emptyComponent?: React.ReactNode
  footerLeft?: React.ReactNode
  showPagination?: boolean
  paginationPrevLabel?: string
  paginationNextLabel?: string
}

export function DataTable<TData>({
  table,
  columns,
  searchPlaceholder = DATA_TABLE.SEARCH_PLACEHOLDER,
  toolbarAction,
  toolbarExtra,
  emptyMessage = DATA_TABLE.EMPTY_MESSAGE,
  emptyComponent,
  footerLeft,
  showPagination = true,
  paginationPrevLabel = DATA_TABLE.PAGINATION_PREV,
  paginationNextLabel = DATA_TABLE.PAGINATION_NEXT,
}: DataTableProps<TData>) {
  const globalFilter = table.getState().globalFilter ?? ''

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="max-w-sm"
          />
          {toolbarExtra}
        </div>
        {toolbarAction}
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
                  {emptyComponent ?? emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-end gap-2 py-4">
          {footerLeft && (
            <div className="mr-auto text-sm text-muted-foreground">
              {footerLeft}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {paginationPrevLabel}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {paginationNextLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
