export interface IPedagogue {
  id: string
  name: string
  email: string
  status: string
  role: string
}

export interface IPedagogues {
  result: Array<IPedagogue>
}
