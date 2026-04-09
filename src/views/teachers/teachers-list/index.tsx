import { columns } from '@/components/teachers/columns'
import { TeachersDataTable } from '@/components/teachers/data-table'

export function TeachersList() {
  return (
    <div className="w-full">
      <TeachersDataTable columns={columns} />
    </div>
  )
}
