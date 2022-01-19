import client from '../client'

export type signupInput = {
  username: string
  email: string
  password: string
}

export type signupResult = {
  message: string,
  data: signupInput
}

export async function signup({
  username,
  email,
  password,
}: signupInput) {
  const response = await client.post<signupResult>('/api/member/signup', {
    name: username,
    email,
    password,
  })
  return response.data
}
