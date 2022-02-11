import { useUserState } from '../atoms/authState'
import { User } from '../lib/api/types'

export default function useAuth() {
  const [, setUserState] = useUserState()
  const authorize = (user: User) => {
    setUserState(user)
  }
  const logout = () => {
    setUserState(null)
    try {
      // TODO(call cookie remove api, logout)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    authorize,
    logout,
  }

}
