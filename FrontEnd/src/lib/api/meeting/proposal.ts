import client from '../client'

export type subUser = {
  name: string
  company: string
  email: string
  tel: string
  member: boolean
}

export type proposalInput = {
  email: string
  event: string
  date: string
  time: string
  location: string
  guests: subUser[]
  comment: string
}

export async function proposalApi(Input: proposalInput) {
  const response = await client.post('/api/meeting/meetingup', {
    ...Input,
    ismeet: 0,
    confirm: false,
    withmycompany: [],
    photofolder: '',
    cardfolder: '',
  })
  return response.data
}
// {
//   "email": "ryanhe4@naver.com",
//   "event": "2022INTA",
//   "date": "2022-01-01",
//   "time": "12:00",
//   "location": "성수역 2호선",
//   "photofolder": "",
//   "cardfolder": "",
//   "withmycompany": [],
//   "guests": "ryanhe4@naver.com",
//   "confirm": false,
//   "ismeet": 0
// }
