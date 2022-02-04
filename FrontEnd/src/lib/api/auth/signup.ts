import client from '../client'
import { User } from '../types'

export type signupInput = {
  username: string
  email: string
  password: string
}

export type signupResult = {
  token: string,
  user: User
}

export async function signup({ username, email, password }: signupInput) {
  try {
    const response = await client.post<signupResult>('/api/auth/signup', { username, email, password })
    return response.data
  } catch (e: any) {
    console.error(e)
    return e
  }
}
