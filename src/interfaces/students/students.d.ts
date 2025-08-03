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

export interface IStudents {
  result: Array<IStudent>
}
