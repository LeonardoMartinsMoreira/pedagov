import { columns } from '@/components/pedagogues/columns'
import { TeachersDataTable } from '@/components/teachers/data-table'

export function TeachersList() {
  return (
    <div className="container mx-auto py-10">
      <TeachersDataTable columns={columns} />
    </div>
  )
}
