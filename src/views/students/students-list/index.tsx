import { columns } from '@/components/students/columns'
import { StudentsDataTable } from '@/components/students/data-table'

export function StudentsList() {
  return (
    <div className="container mx-auto py-10">
      <StudentsDataTable columns={columns} />
    </div>
  )
}
