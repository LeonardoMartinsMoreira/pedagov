import { IOccurrence } from '../occurrences/occurrences'
import type { IPageMeta } from '../pagination'

export interface IStudent {
  studentId: string
  student: string
  status: string
  cpf: string
  groupId: string
  group: string
  photo?: string
  occurrences: IOccurrence[]
  responsibleEmail?: string
  responsiblePhone?: string
}

export interface IStudentsResponse {
  students: IStudent[]
  page: IPageMeta
}
