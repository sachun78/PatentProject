import client from '../client'

export async function editPost([input, post_id]: [editInput, string]) {
  const response = await client.patch(`/api/post/post/${post_id}`, {
    ...input
  })
  return response.data
}

type editInput = {
  contents: string
  images: string []
}


