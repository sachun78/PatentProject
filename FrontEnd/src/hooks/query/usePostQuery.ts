import { getPosts } from 'lib/api/post/getPosts'
import { useQuery, UseQueryOptions } from 'react-query'
import { IPost } from '../../lib/api/types'

export default function usePostQuery(options: UseQueryOptions<IPost[]> = {}) {
  return useQuery<IPost[]>(createKey(), () => getPosts(), {...options})
}

const createKey = () => ['posts']
usePostQuery.createKey = createKey
