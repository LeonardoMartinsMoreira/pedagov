export interface IPedagogue {
  id: string
  name: string
  status: string
  role: string
}

export interface IPedagogues {
  result: Array<IPedagogue>
}
