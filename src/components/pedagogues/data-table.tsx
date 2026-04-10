'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/data-table'
import { LIMIT } from '@/constants/pagination'
import { useDialogState } from '@/hooks/use-dialog-state'
import { useServerPaginatedDataTable } from '@/hooks/use-server-paginated-data-table'
import { IPedagogue, IPedagoguesResponse } from '@/interfaces/pedagogues/pedagogues'
import { useGetAllPedagogues } from '@/services/queries/get-all-pedagogues'
import { Loading } from '../loading'
import { Button } from '../ui/button'
import { AddPedagogueDialog } from './AddPedagogueDialog'

import { statusEnum } from '@/constants/status-enum'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface DataTableProps {
  columns: ColumnDef<IPedagogue, unknown>[]
}

export function PedagoguesDataTable({ columns }: DataTableProps) {
  const { data: session } = useSession()
  const isAdmin = session?.user.roles?.includes('ADMIN')

  const addPedagogue = useDialogState()
  const [status, setStatus] = useState<string>('ACTIVE')

  const { table, isLoading, pageMeta } = useServerPaginatedDataTable<
    IPedagogue,
    IPedagoguesResponse,
    { status: string[] }
  >({
    columns,
    pageSize: LIMIT,
    useQueryWithPage: (page, filters) =>
      useGetAllPedagogues({ limit: LIMIT, page, status: filters?.status }),
    getData: (response) => response?.pedagogues ?? [],
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
          isAdmin ? (
            <Button onClick={addPedagogue.openDialog}>
              Adicionar Pedagogo(a)
            </Button>
          ) : null
        }
        footerLeft={
          pageMeta ? (
            <>
              Página {pageMeta.currentPage} - {pageMeta.total} pedagogo(s)
            </>
          ) : null
        }
      />
      <AddPedagogueDialog
        isVisible={addPedagogue.isVisible}
        closeDialog={addPedagogue.closeDialog}
      />
    </>
  )
}
