import type { IPageMeta } from '../pagination'

export interface IAttendee {
  id: string
  name: string
}

export interface IAttendeesResponse {
  attendees: IAttendee[]
  page: IPageMeta
}
