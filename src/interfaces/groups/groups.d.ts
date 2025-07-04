export interface IGroup {
  name: string
  teacherId: string
  studentsId: Array<number>
  shift: 'morning' | 'afternoon' | 'night'
}
