import type { IPageMeta } from '../pagination'

export interface ITeacher {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export interface ITeachersResponse {
  teachers: ITeacher[]
  page: IPageMeta
}
