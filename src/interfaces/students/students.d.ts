export interface IStudent {
  studentId: string
  student: string
  status: string
  cpf: string
  groupId: string
  group: string
  photo?: string
}

export interface IStudents {
  result: Array<IStudent>
}
