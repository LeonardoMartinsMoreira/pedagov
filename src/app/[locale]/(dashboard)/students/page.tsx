import { columns } from '@/components/students/columns'
import { StudentsDataTable } from '@/components/students/data-table'
import { faker } from '@faker-js/faker'

const generateFakeStudent = (id: number) => {
  const series = `${faker.number.int({ min: 3, max: 9 })}º Ano`
  const turma = faker.helpers.arrayElement(['A', 'B', 'C'])

  return {
    id,
    nome: faker.person.fullName(),
    serie: series,
    turma: turma,
  }
}

export const students1000 = Array.from({ length: 1000 }, (_, index) =>
  generateFakeStudent(index + 1)
)

export default function StudentsPage() {
  return (
    <div className="container mx-auto py-10">
      <StudentsDataTable columns={columns} data={students1000} />
    </div>
  )
}
