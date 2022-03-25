import { useState } from 'react'
import { signup, signupInput } from '../lib/api/auth/signup'
import { sendmail } from '../lib/api/auth/sendmail'

export default function useSignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const register = async (input: signupInput) => {
    try {
      setLoading(true)
      const result = await signup(input)
      await sendmail(result.user.email)
    } catch (e: any) {
      if (e.response.status === 409) {
        setError('email already exists')
        throw e
      }
    } finally {
      setLoading(false)
    }
  }
  return {
    register,
    loading,
    error
  }
}
