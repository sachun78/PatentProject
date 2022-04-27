import { useQueryClient } from 'react-query'
import { User } from '../lib/api/types'
import { url } from 'gravatar'

export default function useProfileImg(size: number = 60) {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')

  //gravatar.url(data.email, { s: '60px', d: 'retro' })
  const profileSrc = user?.photo_path
    ? `http://localhost:4000/static/${user.photo_path}`
    : url(user?.email ?? '', {
        s: `${size}px`,
        d: 'retro',
      })
  console.log(profileSrc)
  return { profileSrc }
}
