import { columns } from '@/components/students/columns'
import { StudentsDataTable } from '@/components/students/data-table'

const data = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  ]

export default function StudentsPage() {
  return (
    <div className="container mx-auto py-10">
      <StudentsDataTable columns={columns} data={data} />
    </div>
  )
}
