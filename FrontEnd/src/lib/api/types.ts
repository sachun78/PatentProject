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
  _id: string
  title: string
  start_date: string
  end_date: string
  meeting_list: string[]
}
export type IReplan = {
  data: IMeeting
  sendData: {
    event_startDate: Date
    event_endDate: Date
    meeting_timeList: { startTime: string; endTime: string; date: string }[]
  }
  sendProfile: {
    company: string
    country: string
  }
}
export type IMeeting = {
  _id: string
  title: string
  date: Date
  startTime: Date
  endTime: Date
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
  _id: string
  contents: string
  comment: IComment[]
  owner_id: string
  owner_email: string
  owner_username: string
  like_cnt: string[]
  writer: string
  createdAt: Date
  updatedAt?: Date
  images: string[]
}

export type IComment = {
  id: string
  owner_id: string
  owner_email: string
  owner_username: string
  text: string
  contents: string
  createdAt: Date
  updatedAt?: Date
}

export type IBuddy = {
  _id: string
  email: string
  profile: IProfile
}
