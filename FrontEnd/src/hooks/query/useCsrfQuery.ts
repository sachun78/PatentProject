import { useQuery, UseQueryOptions } from 'react-query'
import { csrf, csrfResult } from '../../lib/api/auth/csrf'

export default function useCsrfQuery(
  options: UseQueryOptions<csrfResult> = {}
) {
  return useQuery<csrfResult>(['csrf-token'], () => csrf(), { ...options })
}
