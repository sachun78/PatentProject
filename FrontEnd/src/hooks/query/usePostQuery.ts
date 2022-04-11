import DummyPost from 'lib/api/post/dummyPost'
import { useQuery, UseQueryOptions } from 'react-query'
import { IPost } from '../../lib/api/types'

export default function usePostQuery(  
  options: UseQueryOptions<IPost[]> = {}
) {
  return useQuery<IPost[]>('posts', () => DummyPost(), { ...options })
}