import { useQuery } from 'react-query'
import { getCurrentUser } from 'lib/api/me/getCurrentUser'

function useUserQuery() {
  return useQuery('user', getCurrentUser, {
    retry: false,
    staleTime: 2000,
  })
}

export default useUserQuery
