import type { IPageMeta } from '../pagination'

export interface IPedagogue {
  id: string
  name: string
  email: string
  status: string
  role: string
}

export interface IPedagoguesResponse {
  pedagogues: IPedagogue[]
  page: IPageMeta
}
