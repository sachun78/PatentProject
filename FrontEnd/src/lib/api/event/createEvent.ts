import client from '../client'

export async function createEvent(title: string, start: Date, end: Date) {
  const response = await client.post('/api/event', {
    title,
    start_date: start,
    end_date: end
  })
  return response.data
}
