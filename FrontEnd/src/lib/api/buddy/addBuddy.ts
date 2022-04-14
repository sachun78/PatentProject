import client from '../client'

export async function addBuddy(email: string) {
  const response = await client.post('/api/buddy', { email })
  return response.data
}
