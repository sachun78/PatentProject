import { useQuery, UseQueryOptions } from 'react-query'
import { getEvents } from '../../lib/api/event/getEvents'
import { IEvent } from '../../lib/api/types'

export default function useEventQuery(
  id: number,
  options: UseQueryOptions<IEvent[], unknown, IEvent[]> = {}
) {
  // @ts-ignore
  return useQuery(createKey(id), () => getEvents(), { ...options })
}

const createKey = (id: number) => ['events', id]
useEventQuery.createKey = createKey
