import client from '../client'
import { QueryFunctionContext } from 'react-query'

export async function getMeetingInfoByCode({ queryKey }: QueryFunctionContext) {
  const [_, code, status] = queryKey
  const response = await client.get('/api/meeting/show/' + code, {
    params: {
      status: status,
    },
  })
  return response.data
}
