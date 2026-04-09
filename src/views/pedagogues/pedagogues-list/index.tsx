import { columns } from '@/components/pedagogues/columns'
import { PedagoguesDataTable } from '@/components/pedagogues/data-table'

export function PedagoguesList() {
  return (
    <div className="w-full">
      <PedagoguesDataTable columns={columns} />
    </div>
  )
}
