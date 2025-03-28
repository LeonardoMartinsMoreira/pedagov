import { faker } from '@faker-js/faker'

const generateFakePedagogue = (id: number) => {
  return {
    id,
    nome: faker.person.fullName(),
  }
}

export const fakePedagogues = Array.from({ length: 15 }, (_, index) =>
  generateFakePedagogue(index + 1)
)
