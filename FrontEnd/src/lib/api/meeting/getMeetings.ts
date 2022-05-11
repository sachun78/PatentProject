import client from '../client'

export async function getMeetingsCursor(pageParam: number) {
  const response = await client.get('/api/meeting', {
    params: {
      curPos: pageParam,
      cnt: 3,
    },
  })
  return response.data
}

export async function getMeetingSearch(searchParam: string) {
  const response = await client.get('/api/meeting', {
    params: {
      search: searchParam,
    },
  })
  return response.data
}
