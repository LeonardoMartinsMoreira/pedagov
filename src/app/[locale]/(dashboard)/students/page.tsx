import { columns } from '@/components/students/columns'
import { StudentsDataTable } from '@/components/students/data-table'
import { students1000 } from '@/faker/students'

export default function StudentsPage() {
  return (
    <div className="container mx-auto py-10">
      <StudentsDataTable columns={columns} data={students1000} />
    </div>
  )
}
