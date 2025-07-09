import { columns } from '@/components/classes/columns'
import { ClassesDataTable } from '@/components/classes/data-table'

export function ClassesList() {
  return (
    <div className="container mx-auto py-10">
      <ClassesDataTable columns={columns} />
    </div>
  )
}
