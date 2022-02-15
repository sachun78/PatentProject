export type User = {
  id: string,
  email: string,
  username: string,
  certified: boolean
}

export type IProfile = {
  company?: string
  department?: string
  position?: string
  field?: string[]
  country?: string
}
