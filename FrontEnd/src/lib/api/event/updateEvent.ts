import client from '../client'

export async function updateEvent(id: string, title: string, start: Date, end: Date) {
  const response = await client.put('/api/event/' + id, {
    title,
    start_date: start,
    end_date: end,
  })
  return response.data
}

export async function updateEventRestrictedTime(id: string, restricted_time: Array<{ start: Date; end: Date }>) {
  const response = await client.put('/api/event/' + id, {
    restricted_time,
  })
  return response.data
}
