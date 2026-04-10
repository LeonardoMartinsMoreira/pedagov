import { columns } from '@/components/students/columns'
import { StudentsDataTable } from '@/components/students/data-table'

export function StudentsList() {
  return (
    <div className="w-full">
      <StudentsDataTable columns={columns} />
    </div>
  )
}
