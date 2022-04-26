import client from '../client'

export async function deleteComment([postId, commentId] : [string, string]) {
  const response = await client.delete(`/api/post/comment?`+ `postId=${postId}&commentId=${commentId}`)
  
  return response.data      
}