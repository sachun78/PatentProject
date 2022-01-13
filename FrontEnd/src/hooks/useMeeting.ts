import { useState } from 'react'
import { proposalApi, proposalInput } from '../lib/api/meeting/proposal'

export function useMeetProposal() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [complete, setComplete] = useState(false)
  const proposal = async (input: proposalInput) => {
    try {
      setLoading(true)
      const result = await proposalApi(input)
      console.log(result)
    } catch (e: any) {
      if (e.response.status === 500) {
        setError('fail')
        throw e
      }
    } finally {
      setComplete(true)
      setLoading(false)
    }
  }

  return {
    proposal,
    complete,
    loading,
    error,
  }
}
