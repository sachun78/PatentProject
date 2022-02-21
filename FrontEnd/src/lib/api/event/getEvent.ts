import client from '../client'

export async function getEvent(id: string) {
  const response = await client.get('/api/event/' + id)
  return response.data
}
