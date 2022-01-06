import client from '../client'

export type signupInput = {
  username: string
  email: string
  password: string
  company: string
  department: string
  position: string
  tel: string
  country: string
}

export type signupResult = {
  message: string,
  data: signupInput
}

export async function signup({
  username,
  email,
  password,
  company,
  department,
  position,
  tel,
  country,
}: signupInput) {
  const response = await client.post<signupResult>('/api/member/signup', {
    name: username,
    email,
    password,
    company,
    department,
    position,
    tel,
    country,
  })
  return response.data
}
