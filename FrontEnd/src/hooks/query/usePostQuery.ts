import { getPosts } from 'lib/api/post/getPosts'
import { useQuery, UseQueryOptions } from 'react-query'
import { IPost } from 'lib/api/types'

export default function usePostQuery(pageParam: number, options: UseQueryOptions<IPost[]> = {}) {
  return useQuery<IPost[]>(createKey(), () => getPosts(pageParam), { ...options })
}

const createKey = () => ['posts']
usePostQuery.createKey = createKey
