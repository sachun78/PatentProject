import { useQuery } from 'react-query'
import { getCurrentUser } from '../../lib/api/me/getCurrentUser'

function useUserQuery() {
  return useQuery('user', getCurrentUser, {staleTime: Infinity, retry: false})
}

export default useUserQuery;
