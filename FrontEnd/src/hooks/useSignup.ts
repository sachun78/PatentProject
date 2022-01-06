import { useState } from 'react'
import { signin, signinInput } from '../lib/api/member/signin'
import { signup, signupInput } from '../lib/api/member/signup'

export default function useSignup() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sign = async (input: signupInput) => {
    try {
      setLoading(true)
      const result = await signup(input)
      console.log(result)
    } catch (e: any) {
      if (e.response.status === 409) {
        setError('Username already exists')
        throw e
      }
    } finally {
      setLoading(false)
    }
  }
  return {
    sign,
    loading,
    error,
  }
}

export function useSignin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = async(input: signinInput) => {
    try {
      setLoading(true)
      const result = await signin(input)
      console.log(result)
    } catch (e: any) {
      if (e.response.status === 409) {
        setError('Username already exists')
        throw e
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    loading,
    error
  }
}