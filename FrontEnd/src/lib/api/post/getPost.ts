import client from '../client'
import { QueryFunctionContext } from 'react-query'

export async function getPost({ queryKey }: QueryFunctionContext) {    
  const [_, id] = queryKey
  const response = await client.get('/api/post/' + id)
  return response.data
}