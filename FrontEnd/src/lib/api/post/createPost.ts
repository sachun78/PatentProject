import client from '../client'

export async function createPost(input: postInput) {
  const response = await client.post('/api/post', {
    ...input,
  })
  return response.data
}

type postInput = {
  contents: string
  images: string[]
}
