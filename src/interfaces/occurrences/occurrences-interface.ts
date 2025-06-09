export interface IOccurrence {
  id: string
  authorId: string
  title: string
  description: string
  type: string
  createdAt: string
}

export interface IOccurrences {
  result: Array<IOccurrence>
}
