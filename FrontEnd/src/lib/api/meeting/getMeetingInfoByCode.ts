import client from '../client'
import { QueryFunctionContext } from 'react-query'

export async function getMeetingInfoByCode({ queryKey }: QueryFunctionContext) {
  const [_, code] = queryKey
  const response = await client.get('/api/meeting/show/' + code)
  return response.data
}
