import { useQuery } from 'react-query'
import { getCurrentProfile } from '../../lib/api/me/getProfile'

function useProfileQuery() {
  return useQuery('profile', getCurrentProfile, {
    retry: false,
    staleTime: 2000
  })
}

export default useProfileQuery
