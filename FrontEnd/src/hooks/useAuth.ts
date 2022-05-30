import { useQueryClient } from 'react-query'
import logoutAPI from 'lib/api/auth/logout'

export default function useAuth() {
  const queryClient = useQueryClient()
  const logout = () => {
    logoutAPI().then(() => queryClient.invalidateQueries('user'))
  }

  return { logout }
}
