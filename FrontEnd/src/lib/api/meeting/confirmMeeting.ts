import client from '../client'

export async function confirmMeeting(code: string) {
  const response = await client.get('/api/meeting/confirm/' + code)
  return response.data
}
