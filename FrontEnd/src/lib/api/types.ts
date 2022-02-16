export type User = {
  id: string,
  email: string,
  username: string,
  photh_path: string
  certified: boolean
}

export type IProfile = {
  company?: string
  department?: string
  position?: string
  field?: string[]
  country?: string
}
