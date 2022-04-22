import client from '../client'

export async function upload(form_data: FormData) {
  const response = await client.post('/api/profile/upload', form_data, {
    headers: { 'content-type': 'multipart/form-data' },
  })
  return response.data
}
