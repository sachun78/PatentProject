import { useQueryClient } from 'react-query'
import { User } from '../lib/api/types'
import { url } from 'gravatar'

const API_PATH = process.env.REACT_APP_API_PATH

export default function useProfileImg(size: number = 60) {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')

  const profileSrc = user?.photo_path
    ? // ? `http://localhost:4000/static/${user.photo_path}`
      `${API_PATH}static/${user.photo_path}`
    : url(user?.email ?? '', {
        s: `${size}px`,
        d: 'retro',
      })
  return { profileSrc }
}
