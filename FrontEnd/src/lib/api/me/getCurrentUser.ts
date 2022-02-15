import client from '../client'
import { User } from '../types'

export async function getCurrentUser() {
  const response = await client.get<User>('/api/auth/me')
  return response.data
}
