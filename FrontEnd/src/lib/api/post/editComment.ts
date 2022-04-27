import client from '../client'

export async function editComment([input, postId, commentId]: [
  editCommentInput,
  string,
  string
]) {
  const response = await client.patch(
    `/api/post/comment?` + `postId=${postId}&commentId=${commentId}`,
    {
      ...input,
    }
  )
  return response.data
}

type editCommentInput = {
  contents: string
}
