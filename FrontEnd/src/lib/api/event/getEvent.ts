import client from '../client'
import { QueryFunctionContext } from 'react-query'

export async function getEvent({ queryKey }: QueryFunctionContext) {
  const [_, id] = queryKey
  const response = await client.get('/api/event/' + id)
  return response.data
}
