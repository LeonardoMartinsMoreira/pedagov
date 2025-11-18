export interface ITeacher {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export interface ITeachers {
  result: Array<ITeacher>
}
