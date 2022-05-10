import client from '../client'

export async function getPosts(pageParam: number) {  
  const response = await client.get('/api/post', {
    params: {
      curPos: pageParam,
      cnt: 5,
    }
  })
  return response.data
}