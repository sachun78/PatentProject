import client from '../client'

export async function deleteBuddy(email: string) {
  const response = await client.patch(`/api/buddy/${email}`)
  return response.data
}
