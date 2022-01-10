import client from '../client'

export type PostResult = {
  _id: String,
  email: String,
  postmessage: String,
  postdate: String,
  likecount: Number
  }

  export type Listdata = {
    message:string,
    data: [PostResult]
}

  export async function postlist(
    email: String,
  ) {
  const response = await client.post<Listdata>('/api/post/postfind', {
    email,
  })
  return response.data
}
