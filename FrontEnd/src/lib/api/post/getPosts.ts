import client from '../client'

export async function getPosts() {  
  const response = await client.get('/api/post')
  return response.data
}
