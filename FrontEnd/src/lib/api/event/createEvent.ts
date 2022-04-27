import client from '../client'

export async function createEvent(title: string, start: Date, end: Date) {
  console.log(start, end)
  const response = await client.post('/api/event', {
    title,
    start_date: start.toJSON(),
    end_date: end.toJSON(),
  })
  return response.data
}
