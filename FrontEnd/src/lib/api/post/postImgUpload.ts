import client from '../client'

export async function postImgUpload(form_data: FormData) {
  const response = await client.post('/api/post/upload/', form_data, {
    headers: { 'content-type': 'multipart/form-data' },
  })

  return response.data
}
