import client from '../client'

export async function deleteEvent(event_id: string) {
  const response = await client.delete(`/api/event/${event_id}`)
  return response.data
}
