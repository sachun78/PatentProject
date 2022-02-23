import client from '../client'

export async function getMeetings() {
  const response = await client.get('/api/meeting/')
  return response.data
}
