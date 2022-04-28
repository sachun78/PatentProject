import client from '../client'
import { searchSelect } from '../../../components/Schedules'

export async function getMeetings(id: string, type: searchSelect) {
  const prefix = type === 'email' ? 'toEmail' : 'title'
  const suffix = id ? `?${prefix}=${id}` : ``
  const response = await client.get('/api/meeting' + suffix)
  return response.data
}
