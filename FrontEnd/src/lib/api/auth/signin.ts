import client from '../client'
import { User } from '../types'

export type signinInput = {
  name: string
  email: string
  password: string
}

export async function signin({ email, password }: signinInput) {
  const response = await client.post<signinResult>('/api/auth/signin', {
    email,
    password
  })
  return response.data
}

export type signinResult = {
  token: string
  user: User
}
