'use client'

import { Loading } from '@/components/loading'
import { columns } from '@/components/pedagogues/columns'
import { PedagoguesDataTable } from '@/components/pedagogues/data-table'
import { LIMIT, PAGE } from '@/constants/pagination'
import { useGetAllPedagogues } from '@/services/queries/get-all-pedagogues'

export function PedagoguesList() {
  const { data, isLoading } = useGetAllPedagogues({
    limit: LIMIT,
    page: PAGE,
  })

  if (isLoading) return <Loading />

  const allPedagogues = data?.result ?? []

  return (
    <div className="container mx-auto py-10">
      <PedagoguesDataTable data={allPedagogues} columns={columns} />
    </div>
  )
}
