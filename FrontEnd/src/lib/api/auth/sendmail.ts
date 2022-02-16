import client from '../client'

export async function sendmail(code: string) {
  const response = await client.post('/api/authemail/send-authemail')
  return response.data
}

export async function checkCode(code: string) {
  const response = await client.get('/api/authemail/code/' + code)
  return response.data
}
