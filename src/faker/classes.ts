import { faker } from '@faker-js/faker'

const steps = [
  { nome: 'Fundamental', anos: [1, 2, 3, 4, 5] },
  { nome: 'Fundamental', anos: [6, 7, 8, 9] },
  { nome: 'Ensino Médio', anos: [1, 2, 3] },
]

const letras = ['A', 'B', 'C', 'D']

const generateFakeClasses = (id: number) => {
  const step = faker.helpers.arrayElement(steps)
  const year = faker.helpers.arrayElement(step.anos)
  const letter = faker.helpers.arrayElement(letras)

  const anoFormatado =
    step.nome === 'Ensino Médio' ? `${year}º ano` : `${year}º ano`
  const className = `${anoFormatado} ${letter} - ${step.nome}`

  return {
    id,
    class: className,
  }
}

export const fakeClasses = Array.from({ length: 20 }, (_, index) =>
  generateFakeClasses(index + 1)
)
