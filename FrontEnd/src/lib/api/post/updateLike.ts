import client from '../client'

export async function updateLike([input, postId, status]: [
updateLikeInput,
  string,
  string
]) {
  const response = await client.patch(
    `/api/post/like?` + `postId=${postId}&status=${status}`,
    {
      ...input,
    }
  )
  return response.data
}

type updateLikeInput = {
  userId: string
  email: string
}
