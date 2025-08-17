/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Loading } from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { occurrencesTypesEnum } from '@/constants/occurrences-types-enum'
import { statusEnum } from '@/constants/status-enum'
import { useDialogState } from '@/hooks/use-dialog-state'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'
import { useGetStudent } from '@/services/queries/get-student'
import { cpfMask } from '@/utils/cpf-mask'
import { phoneMask } from '@/utils/phone-mask'
import {
  IdentificationCard,
  ImageBroken,
  UsersFour,
} from '@phosphor-icons/react/dist/ssr'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { EditStudentDialog } from '../EditStudentDialog'

export function ProfileCard() {
  const router = useRouter()
  const { id } = useParams()

  const { data, isLoading } = useGetStudent(id as string)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnOccurrenceDetailsClick = (occurrenceId: string) => {
    router.push(`/occurrences/${occurrenceId}`)
  }

  const columns = useMemo<ColumnDef<IOccurrence, any>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Título',
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
        cell: ({ row }) => occurrencesTypesEnum[row.original.type],
      },
      {
        accessorKey: 'createdAt',
        header: 'Data',
        cell: ({ row }) => row.getValue('date'),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleOnOccurrenceDetailsClick(row.original.occurrenceId)
            }
          >
            Detalhes
          </Button>
        ),
      },
    ],
    [handleOnOccurrenceDetailsClick]
  )

  const editStudentDialog = useDialogState()

  const {
    cpf,
    group,
    status,
    student,
    photo,
    responsibleEmail,
    responsiblePhone,
    occurrences,
  } = data! ?? {}

  const table = useReactTable({
    data: occurrences,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  if (isLoading) return <Loading />

  const lastOccurrence = occurrences?.at(-1)

  const handleOnEditClick = () => {
    editStudentDialog.openDialog()
  }

  return (
    <div className="w-full flex gap-8 justify-center">
      <div className="w-full h-full max-w-lg rounded-3xl shadow-lg border border-border">
        <div className="flex flex-col items-center p-6">
          <div className="w-full h-32 mb-4">
            {Boolean(photo) ? (
              <Image
                src={photo!}
                width={500}
                height={300}
                alt="user-photo"
                priority
              />
            ) : (
              <div className="w-full border flex items-center justify-center rounded h-full">
                <div className="flex flex-col items-center">
                  <ImageBroken size={80} />
                  <span>Este(a) aluno(a) não possuí foto.</span>
                </div>
              </div>
            )}
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl font-bold">{student}</h2>
              <Badge>{statusEnum[status]}</Badge>
            </div>
            <div className="flex items-center">
              <IdentificationCard
                size={16}
                className="text-muted-foreground mr-2"
              />
              <p className="text-md text-muted-foreground">{cpfMask(cpf)}</p>
            </div>
            <div className="flex items-center">
              <UsersFour size={16} className="text-muted-foreground mr-2" />
              <p className="text-md text-muted-foreground">{group}</p>
            </div>

            {lastOccurrence?.createdAt && (
              <p className="text-muted-foreground mb-4">
                Ultima ocorrência: {lastOccurrence?.createdAt}
                <br />
              </p>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <p className="text-md font-bold text-lg">
                  Dados do responsável
                </p>
              </div>

              {responsiblePhone && (
                <div className="flex items-center">
                  <Phone size={16} className="text-muted-foreground mr-2" />
                  <p className="text-md text-muted-foreground">
                    {phoneMask(responsiblePhone)}
                  </p>
                </div>
              )}

              {responsibleEmail && (
                <div className="flex items-center">
                  <Mail size={16} className="text-muted-foreground mr-2" />
                  <p className="text-md text-muted-foreground">
                    {responsibleEmail}
                  </p>
                </div>
              )}
            </div>

            <Button onClick={handleOnEditClick} className="w-full py-2.5 px-4">
              Editar
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-full max-w-lg rounded-3xl shadow-lg border border-border">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Lista de Ocorrências</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="font-medium">
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
                      Nenhuma ocorrência encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()} | Total:{' '}
              {table.getFilteredRowModel().rows.length} ocorrências
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Itens por página:</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              className="flex h-8 w-16 items-center justify-center rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {[5, 10].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <EditStudentDialog
        student={data}
        closeDialog={editStudentDialog.closeDialog}
        isVisible={editStudentDialog.isVisible}
      />
    </div>
  )
}
