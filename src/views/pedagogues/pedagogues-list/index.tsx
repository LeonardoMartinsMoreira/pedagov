import { columns } from '@/components/pedagogues/columns'
import { PedagoguesDataTable } from '@/components/pedagogues/data-table'
import { fakePedagogues } from '@/faker/pedadogues'

export function PedagoguesList() {
  return (
    <div className="container mx-auto py-10">
      <PedagoguesDataTable data={fakePedagogues} columns={columns} />
    </div>
  )
}
