import client from '../client'

export async function csrf() {
  const response = await client.get<csrfResult>('/api/auth/csrf-token')
  client.defaults.headers.common['_csrf-token'] = response.data.csrfToken
  return response.data
}

export type csrfResult = {
  csrfToken: string
}
