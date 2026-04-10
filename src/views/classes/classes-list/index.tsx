import { columns } from '@/components/classes/columns'
import { ClassesDataTable } from '@/components/classes/data-table'

export function ClassesList() {
  return (
    <div className="w-full">
      <ClassesDataTable columns={columns} />
    </div>
  )
}
