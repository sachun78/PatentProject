import useAuth from './useAuth'
import { useEffect } from 'react'
import { csrf } from '../lib/api/auth/csrf'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../lib/api/me/getCurrentUser'
import { useRegisterFormState, useUserState } from '../atoms/authState'
import { User } from '../lib/api/types'

export default function useCheckUserEffect() {
  const { authorize, logout } = useAuth()
  const navigate = useNavigate()
  const [user] = useUserState()
  const [, setRegisterForm] = useRegisterFormState()
  useEffect(() => {
    // set csrf-Token to axios Client
    csrf()
      .then(console.log)
      .catch(console.error)
  }, [])

  useEffect(() => {
    // TODO(request me API)
    getCurrentUser()
      .then(user => authorize(user))
      .catch(() => {
        logout()
      })
  }, [])

  useEffect(() => {
    if (user) {
      console.log(user)
      if (!user.certified) {
        setRegisterForm('email-auth')
        navigate('/register')
      } else {
        navigate('/')
      }
    } else {
      console.log('isloggedIn is false')
      navigate('/login')
    }

  }, [user])
}
