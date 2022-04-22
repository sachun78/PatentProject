import client from '../client'

export async function deletePost(post_id: string) {
  const response = await client.delete(`/api/post/post/${post_id}`)
  return response.data
}
