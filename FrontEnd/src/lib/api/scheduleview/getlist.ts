import client from '../client'

export type Event = {
  name: String,
  email: String,
  startdate: Date,
  enddate: Date,
  comment: String
}

export type MeetingUser = {
    name: String,
    company: String,
    email: String,
    tel: String,
    member: Boolean,
  }

  export type MeetingResult = {
    _id: String,
    event: Event,
    date: Date,
    time: String,
    location: String,
    guests: [MeetingUser],
    confirm: Boolean,
    ismeet: Number,
  }

export type Listdata = {
    message:string,
    data: [MeetingResult]
}

  export async function meetinglist(
    email: String,
  ) {
  const response = await client.post<Listdata>('/api/meeting/meetingfind', {
    email,
  })
  return response.data
}

export async function meetingAlllist(
  email: String,
) {
const response = await client.post<Listdata>('/api/meeting/meetingnetwork', {
  email,
})
return response.data
}
