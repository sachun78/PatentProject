import client from '../client'
import { QueryFunctionContext } from 'react-query'

export async function getMeetingsCursor(pageParam: number) {
  const response = await client.get('/api/meeting', {
    params: {
      curPos: pageParam,
      cnt: 10,
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

export async function getMeetingHistory() {
  const response = await client.get('/api/meeting/history')
  return response.data
}

export async function getMeetingHistoryUser({ queryKey }: QueryFunctionContext) {
  const [, email] = queryKey
  const response = await client.get('/api/meeting/history', {
    params: { toEmail: email },
  })
  return response.data
}
