import { useQuery, UseQueryOptions } from 'react-query'
import { IMeeting } from 'lib/api/types'
import { getMeetings } from 'lib/api/meeting/getMeetings'

export default function useMeetingQuery(
  id: number,
  options: UseQueryOptions<IMeeting[]> = {}
) {
  return useQuery<IMeeting[]>(createKey(id), () => getMeetings(), { ...options })
}

const createKey = (id: number) => ['meetings', id]
useMeetingQuery.createKey = createKey
