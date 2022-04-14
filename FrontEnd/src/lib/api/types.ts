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

export type IMeeting = {
  id: string
  title: string,
  date: Date,
  time: Date,
  eventId: string,
  toEmail: string,
  ownerEmail: string,
  ownerName: string,
  location: string,
  comment: string
  status: string,
  code: string
}

export type IAuthCode = {
  email: string
}

export type IPost = {
  id: string,
  title: string,
  text: string,
  comments: IComment[],
  like: number,
  writer: string,
  created_at: Date,
  updated_at?: Date
}

export type IComment = {
  id: string,
  text: string,
  created_at?: Date,
  updated_at?: Date,
  writer: string
}