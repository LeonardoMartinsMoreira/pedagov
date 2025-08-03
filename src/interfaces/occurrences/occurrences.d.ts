import { occurrencesTypesEnum } from '@/constants/occurrences-types-enum'

export type IOccurrencesTypes = typeof occurrencesTypesEnum

export interface IOccurrence {
  occurrenceId: string
  studentId: string
  student: string
  createdAt: string
  title: string
  type: string
}

export interface IOccurrences {
  result: Array<IOccurrence>
}
