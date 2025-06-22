import { columns } from '@/components/pedagogues/columns'
import { PedagoguesDataTable } from '@/components/pedagogues/data-table'

export function PedagoguesList() {
  return (
    <div className="container mx-auto py-10">
      <PedagoguesDataTable columns={columns} />
    </div>
  )
}
