import client from '../client'

type resetPasswordInput = {
  password: string
  email: string
}

export async function resetPassword(req: resetPasswordInput) {
  const response = await client.post('/api/auth/changepw', req)
  return response.data
}
