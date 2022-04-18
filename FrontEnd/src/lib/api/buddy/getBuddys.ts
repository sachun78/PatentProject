import client from '../client'

export async function getBuddys() {
  const response = await client.get('/api/buddy')
  return response.data
}
