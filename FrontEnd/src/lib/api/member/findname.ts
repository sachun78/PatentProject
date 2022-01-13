import client from '../client'

export type UserInfo = {
    name: String,
    email: String,
    password: String,
    company: String,
    department: String,
    position: String,
    tel: String,
    country: String,
  }

  export type Listdata = {
    message:string,
    data: [UserInfo]
}

export async function findname(
    name: String
    ) {
    const response = await client.post<Listdata>('/api/member/findname', {
        name
    })
    return response.data
  }
