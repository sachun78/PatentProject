import client from '../client'

export async function createComments([input, id]: [commentInput, string]) {
  const response = await client.post('/api/post/comment/' + id, {
    ...input,
  })
  return response.data
}

type commentInput = {
  contents: string
  createdAt: Date
}
