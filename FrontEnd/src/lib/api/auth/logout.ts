import client from '../client'

async function logout() {
  const response = await client.post('/api/auth/logout')
  return response.data
}

export default logout
