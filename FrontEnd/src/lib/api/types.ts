export type User = {
  id: string,
  email: string,
  username: string,
  photo_path: string
  certified: boolean
}

export type IProfile = {
  company?: string
  department?: string
  position?: string
  field?: string[]
  country?: string
}

export type IEvent = {
  id: string
  title: string,
  start_date: string,
  end_date: string,
  meeting_list: string[],
}
