import client from '../client'

export async function getEvents() {
  const response = await client.get('/api/event')
  return response.data
}

export async function getEventSearch(searchParam: string) {
  const response = await client.get('/api/event', {
    params: {
      search: searchParam,
    },
  })
  return response.data
}
