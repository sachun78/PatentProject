import { useState } from 'react'
import { signin, signinInput } from '../lib/api/auth/signin'
import { useRegisterFormState } from '../atoms/authState'
import { useNavigate } from 'react-router-dom'
import { useLoginStateActions } from '../atoms/loginState'

export function useSignin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [, setType] = useRegisterFormState()
  const navigate = useNavigate()
  const loginActions = useLoginStateActions()
  const login = async (input: signinInput) => {
    try {
      setLoading(true)
      const result = await signin(input)
      if (!result.user.certified) {
        setType('email-auth')
        navigate('/register')
      } else {
        navigate('/')
        loginActions.setLoggedIn(true)
        alert('로그인 성공')
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
  }

  return {
    login,
    loading,
    error
  }
}
