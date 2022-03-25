import { useProfileState } from '../atoms/profileState'
import { useQueryClient } from 'react-query'
import logoutAPI from 'lib/api/auth/logout'

export default function useAuth() {
  const [, setProfile] = useProfileState()
  const queryClient = useQueryClient()
  const logout = () => {
    queryClient.setQueryData('user', null)
    setProfile(null)
    logoutAPI()
    console.log('logout')
  }

  return { logout }
}
