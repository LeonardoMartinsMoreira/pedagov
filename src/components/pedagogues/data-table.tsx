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

interface DataTableProps {
  columns: ColumnDef<IPedagogue, unknown>[]
}

export function PedagoguesDataTable({ columns }: DataTableProps) {
  const addPedagogue = useDialogState()

  const { table, isLoading, pageMeta } = useServerPaginatedDataTable<
    IPedagogue,
    IPedagoguesResponse
  >({
    columns,
    pageSize: LIMIT,
    useQueryWithPage: (page) => useGetAllPedagogues({ limit: LIMIT, page }),
    getData: (response) => response?.pedagogues ?? [],
    getPageMeta: (response) => response?.page,
  })

  if (isLoading) return <Loading />

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        toolbarAction={
          <Button onClick={addPedagogue.openDialog}>
            Adicionar Pedagogo(a)
          </Button>
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
