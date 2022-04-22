import { useQuery } from 'react-query'
import { getBuddys } from 'lib/api/buddy/getBuddys'

export default function useBuddyQuery() {
  return useQuery('buddy', getBuddys, {
    retry: false,
    staleTime: 2000,
  })
}
