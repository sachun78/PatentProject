import client from '../client'
import { searchSelect } from 'components/Schedules'

export async function getMeetings(id: string, type: searchSelect) {
  const prefix = type === 'email' ? 'toEmail' : 'title'
  // const suffix = id ? `?${prefix}=${id}` : ``
  const response = await client.get('/api/meeting', {
    params: {
      [prefix]: id ?? undefined,
    },
  })
  return response.data
}

export async function getMeetingsCursor(id: string, type: searchSelect, pageParam: number) {
  const prefix = !id ? 'title' : type === 'email' ? 'toEmail' : 'title'
  const response = await client.get('/api/meeting', {
    params: {
      curPos: pageParam,
      cnt: 3,
      [prefix]: id,
    },
  })
  return response.data
}
