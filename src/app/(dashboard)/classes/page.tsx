import { columns } from '@/components/classes/columns'
import { ClassesDataTable } from '@/components/classes/data-table'
import { fakeClasses } from '@/faker/classes'

export default function ClassesPage() {
  return (
    <div className="container mx-auto py-10">
      <ClassesDataTable data={fakeClasses} columns={columns} />
    </div>
  )
}
