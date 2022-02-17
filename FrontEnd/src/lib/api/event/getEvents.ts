import client from '../client'

export async function getEvents() {
  const response = await client.get('/api/event')
  return response.data
}
