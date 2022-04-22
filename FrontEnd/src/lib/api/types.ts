export type User = {
  id: string
  email: string
  username: string
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

export type IProfileDetail = {
  username?: string
  photo_path?: string
} & IProfile

export type IEvent = {
  id: string
  title: string
  start_date: string
  end_date: string
  meeting_list: string[]
}

export type IMeeting = {
  id: string
  title: string
  date: Date
  time: Date
  eventId: string
  toEmail: string
  ownerEmail: string
  ownerName: string
  location: string
  comment: string
  status: string
  code: string
  history: any
}

export type IAuthCode = {
  email: string
}

export type IPost = {
  id: string,  
  contents: string,
  comment: IComment[],
  owner_id: string,
  owner_thumb: string,
  owner_username: string,
  like_cnt: number,
  writer: string,
  createdAt: Date,
  updated_at?: Date,
  images: string []
}

export type IComment = {
  _id: string,
  owner_id: string,
  owner_thumb: string,
  text: string,
  contents: string,
  created_at?: Date,
  updated_at?: Date,
  writer: string
}
