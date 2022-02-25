import client from '../client'

export async function getMeetingInfoByCode(code: string) {
  const response = await client.get('/api/meeting/show/' + code)
  return response.data
}
