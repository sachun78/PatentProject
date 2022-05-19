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
  phone?: string
  signature?: string
}

export type IProfileDetail = {
  username?: string
  photo_path?: string
  email?: string
} & IProfile

export type IEvent = {
  _id: string
  title: string
  start_date: Date
  end_date: Date
  meeting_list: string[] | IMeeting[]
  restricted_time: any[]
}
export type IReplan = {
  data: IMeeting
  sendData: {
    event_restritedTime: Array<{ start: string; end: string }>
    event_startDate: Date
    event_endDate: Date
    meeting_timeList: { startTime: string; endTime: string; date: string }[]
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
  ownerCompany: string
  ownerPhone: string
  toName: string
  toPhone: string
  toCompany: string
  location: string
  comment: string
  status: string
  code: string
  history: any
  isPossibleAddSchedule: boolean
  isPaidUser: string
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
  name: string
}
