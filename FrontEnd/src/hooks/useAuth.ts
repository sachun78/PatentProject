import { useUserState } from '../atoms/authState'
import { User } from '../lib/api/types'
import { useProfileState } from '../atoms/profileState'

export default function useAuth() {
  const [, setUserState] = useUserState()
  const [, setProfile] = useProfileState()
  const authorize = (user: User) => {
    setUserState(user)
  }
  const logout = () => {
    setUserState(null)
    setProfile(null)
    console.log('logout')
    try {
      // TODO(call cookie remove api, logout)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    authorize,
    logout
  }

}
