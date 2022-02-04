import { useCallback, useEffect, useState } from 'react'
import { signin, signinInput } from '../lib/api/auth/signin'
import { useAccessTokenState, useRegisterFormState } from '../atoms/authState'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

export function useSignin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [, setType] = useRegisterFormState()
  const [, setAccessToken] = useAccessTokenState()
  const navigate = useNavigate()
  const { authorize } = useAuth()

  useEffect(() => {
    return () => setLoading(false) // cleanup function을 이용
  }, [])

  const login = useCallback(
    async (input: signinInput) => {
      try {
        setLoading(true)
        const { token, user } = await signin(input)
        setAccessToken(token)
        if (user.certified) {
          authorize(user)
          alert('로그인 성공')
          navigate('/')
        } else {
          setType('email-auth')
          navigate('/register')
        }
      } catch (e: any) {
        if (e.response.status === 404) {
          setError('password error')
          throw e
        } else {
          console.log(e)
          throw e
        }
      } finally {
        setLoading(false)
      }
    }, [authorize, navigate, setAccessToken, setType])

  return {
    login,
    loading,
    error
  }
}
