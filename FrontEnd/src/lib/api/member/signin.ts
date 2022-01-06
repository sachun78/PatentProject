import client from '../client'

export type signinInput = {
  email: string
  password: string
}

export type signupResult = {
  message: string,
  data: signinInput
}

export async function signin({
  email,
  password,
}: signinInput) {
  const response = await client.post<signupResult>('/api/member/signin', {
    email,
    password,
  })
  return response.data
}
