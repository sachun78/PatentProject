import { useCallback, useEffect, useState } from 'react'
import { signin, signinInput } from '../lib/api/auth/signin'
import { useAccessTokenState, useRegisterFormState } from '../atoms/authState'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'
import { useGlobalDialogActions } from '../atoms/globalDialogState'

export function useSignin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [, setType] = useRegisterFormState()
  const [, setAccessToken] = useAccessTokenState()
  const navigate = useNavigate()
  const { authorize } = useAuth()
  const { open } = useGlobalDialogActions()

  useEffect(() => {
    return () => setLoading(false) // cleanup function을 이용
  }, [])

  const login = useCallback(
    async (input: signinInput) => {
      try {
        setLoading(true)
        const { token, user } = await signin(input)
        setError('')
        setAccessToken(token)
        if (user.certified) {
          authorize(user)
          navigate('/')
        } else {
          setType('email-auth')
          navigate('/register')
        }
      } catch (e: any) {
        setError(e.response.data.message)
        open({
          title: 'Login Failed',
          message: e.response.data.message,
          showCancel: false,
          confirmText: 'OK',
          isDestructive: true
        })
        throw e
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