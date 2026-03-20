import { IOccurrence } from '../occurrences/occurrences'

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

export interface IPageMeta {
  total: number
  lastPage: number
  currentPage: number
  limit: number
  prev: number | null
  next: number | null
}

export interface IStudentsResponse {
  students: IStudent[]
  page: IPageMeta
}
