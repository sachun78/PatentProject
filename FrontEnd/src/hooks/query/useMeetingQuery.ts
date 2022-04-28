import { useQuery, UseQueryOptions } from 'react-query'
import { IMeeting } from 'lib/api/types'
import { getMeetings } from 'lib/api/meeting/getMeetings'
import { searchSelect } from '../../components/Schedules'

export default function useMeetingQuery(id: string, type: searchSelect, options: UseQueryOptions<IMeeting[]> = {}) {
  return useQuery<IMeeting[]>(createKey(id, type), () => getMeetings(id, type), { ...options })
}

const createKey = (id: string, type: searchSelect) => ['meetings', type, id]
useMeetingQuery.createKey = createKey
