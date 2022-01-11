import client from '../client'

export type MeetingUser = {
  name: String,
  email: String,
  company: String,
  department: String,
  position: String,
  tel: String,
  country: String,
  meetcount: Number
  }

export type MyNetworkResult = {
  name: String,
  email: String,
  meetpeople: [MeetingUser]
  }

export type Listdata = {
    message:string,
    data: MyNetworkResult
}

  export async function mynetworklist(
    email: String,
  ) {
  const response = await client.post<Listdata>('/api/mynetwork/mynetworkfind', {
    email,
  })

  console.log(response.data)
  return response.data
}