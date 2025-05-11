import { faker } from '@faker-js/faker'
import { fakeClasses } from './classes'

const generateFakeStudent = (id: number) => {
  const turma = faker.helpers.arrayElement(fakeClasses)

  return {
    id,
    nome: faker.person.fullName(),
    turma: turma.class,
  }
}

export const students1000 = Array.from({ length: 1000 }, (_, index) =>
  generateFakeStudent(index + 1)
)
