'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { useServerPaginatedDataTable } from '@/hooks/use-server-paginated-data-table'
import { ITeacher, ITeachersResponse } from '@/interfaces/teachers/teacher'
import { useGetAllTeachers } from '@/services/queries/get-all-teachers'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddTeacherDialog } from './AddTeacherDialog'

import { statusEnum } from '@/constants/status-enum'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'

interface DataTableProps {
  columns: ColumnDef<ITeacher, unknown>[]
}

export function TeachersDataTable({ columns }: DataTableProps) {
  const addTeacher = useDialogState()
  const [status, setStatus] = useState<string>('ACTIVE')

  const { table, isLoading, pageMeta } = useServerPaginatedDataTable<
    ITeacher,
    ITeachersResponse,
    { status: string[] }
  >({
    columns,
    pageSize: LIMIT,
    useQueryWithPage: (page, filters) =>
      useGetAllTeachers({ limit: LIMIT, page, status: filters?.status }),
    getData: (response) => response?.teachers ?? [],
    getPageMeta: (response) => response?.page,
    filters: {
      status: status === 'all' ? Object.keys(statusEnum) : [status],
    },
  })

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable
        table={table}
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
          <Button onClick={addTeacher.openDialog}>
            Adicionar Professor(a)
          </Button>
        }
        footerLeft={
          pageMeta ? (
            <>
              Página {pageMeta.currentPage} - {pageMeta.total} professor(es)
            </>
          ) : null
        }
      />
      <AddTeacherDialog
        closeDialog={addTeacher.closeDialog}
        isVisible={addTeacher.isVisible}
      />
    </>
  )
}
