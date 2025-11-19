import { occurrencesTypesEnum } from '@/constants/occurrences-types-enum'

export type IOccurrencesTypes = typeof occurrencesTypesEnum

export interface IOccurrence {
  occurrenceId: string
  authorId: string
  author: string
  teacherId: string
  teacher: string
  title: string
  description: string
  type: string
  createdAt: string
  studentId: string
  students: {
    id: string
    name: string
    cpf: { value: string }
    groupId: string
    responsibleEmail: string
    responsiblePhone: string
    status: string
  }[]
  attendees: {
    id: string
    name: string
  }[]
  attachments: {
    id: string
    title: string
    url: string
  }[]
}

export interface IOccurrences {
  result: Array<IOccurrence>
}
