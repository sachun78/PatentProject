import { getPosts } from 'lib/api/post/getPosts'
import { useQuery, UseQueryOptions } from 'react-query'
import { IPost } from '../../lib/api/types'

export default function usePostQuery(
  id: number,  
  options: UseQueryOptions<IPost[]> = {}
) {
  return useQuery<IPost[]>(createKey(id), () => getPosts(), { ...options })
}

const createKey = (id: number) => ['posts', id]
usePostQuery.createKey = createKey