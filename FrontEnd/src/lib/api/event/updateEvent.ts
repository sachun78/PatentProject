import client from '../client'

export async function updateEvent(title?: string, start?: Date, end?: Date) {
  const response = await client.put('/api/event', {
    title,
    start,
    end
  })
  return response.data
}
