import client from '../client'

export async function updateEvent(id: string, title: string, start: Date, end: Date) {
  console.log(id, title, start, end)
  const response = await client.put('/api/event/' + id, {
    title,
    start_date: start,
    end_date: end
  })
  return response.data
}
