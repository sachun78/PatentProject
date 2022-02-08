import client from '../client'

export async function upload(form_data: FormData) {
  const response = await client.post('/api/user/upload', form_data, {
    headers: { 'content-type': 'multipart/form-data' },
  })
  console.log(response.data)
  return response.data
}
