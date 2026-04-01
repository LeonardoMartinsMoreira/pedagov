export interface IPageMeta {
  total: number
  lastPage: number
  currentPage: number
  limit: number
  prev: number | null
  next: number | null
}
