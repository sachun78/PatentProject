import client from '../client'

export async function getAllUser() {
  const response = await client.get('/api/auth')
  return response.data
}

export async function getAllUserCursor(pageParam: number) {
  const response = await client.get('/api/auth', {
    params: {
      curPos: pageParam,
      cnt: 10,
    },
  })
  return response.data
}
