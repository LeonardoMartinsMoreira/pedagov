import type { IPageMeta } from '../pagination'

export interface IGroup {
  name: string
  teacherId: string
  shift: 'morning' | 'afternoon' | 'night'
  id: string
  numberOfStudents: number
  serie: string
}

export interface IGroupsResponse {
  groups: IGroup[]
  page: IPageMeta
}
