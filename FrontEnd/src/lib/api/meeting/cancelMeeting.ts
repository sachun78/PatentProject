import client from '../client'

export async function cancelMeeting(code: string) {
  const response = await client.get('/api/meeting/cancel/' + code)
  return response.data
}
