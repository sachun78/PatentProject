import { useQuery, UseQueryOptions } from 'react-query'
import { getEvents } from 'lib/api/event/getEvents'
import { IEvent } from 'lib/api/types'

export default function useEventQuery(options: UseQueryOptions<IEvent[]> = {}) {
  return useQuery<IEvent[]>('events', () => getEvents(), { ...options })
}

const createKey = (id: number) => ['events', id]
useEventQuery.createKey = createKey
