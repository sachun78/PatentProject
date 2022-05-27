import client from '../client'
import { IAuthCode } from '../types'

export async function sendmail(email: string) {
  const response = await client.post('/api/authemail/send-authemail', { email })
  return response.data
}

export async function forgot_passwd(email: string) {
  const response = await client.post('/api/authemail/forget-passwd', { email })
  return response.data
}

type authType = 'auth' | 'passwd'

export async function checkCode(code: string, type: authType) {
  const response = await client.get<IAuthCode>('/api/authemail/code', { params: { type, code } })
  return response.data
}
