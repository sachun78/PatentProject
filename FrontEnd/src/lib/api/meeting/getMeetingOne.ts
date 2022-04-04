import client from '../client'

export async function getMeetingOne(code: string) {
  const response = await client.get('/api/meeting/' + code)
  return response.data
}
