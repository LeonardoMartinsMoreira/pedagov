export interface IGroup {
  name: string
  teacherId: string
  shift: 'morning' | 'afternoon' | 'night'
  id: string
  numberOfStudents: number
  serie: string
}
