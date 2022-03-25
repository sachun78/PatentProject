import client from '../client'
import { User } from '../types'

export function getCurrentUser() {
  return client.get<User>('/api/auth/me')
    .then(res => res.data)
    .catch(err => null)
}
