import useAuth from './useAuth'
import { useEffect } from 'react'
import { csrf } from '../lib/api/auth/csrf'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../lib/api/me/getCurrentUser'
import { useRegisterFormState, useUserState } from '../atoms/authState'
import userStorage from '../lib/storage/userStorage'

export default function useCheckUserEffect() {
  const { authorize, logout } = useAuth()
  const navigate = useNavigate()
  const [user] = useUserState()
  const [, setRegisterForm] = useRegisterFormState()
  const { pathname } = useLocation()
  useEffect(() => {
    // set csrf-Token to axios Client
    csrf().catch(console.error)
  }, [user])

  useEffect(() => {
    const storedUser = userStorage.get()
    if (!storedUser) {
      return
    }
    getCurrentUser()
      // .then(user => authorize(user))
      .catch(() => logout())
  }, [logout])

  useEffect(() => {
    if (user) {
      if (!user.certified) {
        setRegisterForm('email-auth')
      } else {
        navigate('/')
      }
    } else {
      console.log('isloggedIn is false')
      // 현재 위치가 login/register이 아니면 로그인 페이지로 이동
      console.log(pathname)
      if (pathname === '/auth-email') {
        setRegisterForm('email-auth')
      }
      if (pathname !== '/login' && pathname !== '/register' && pathname !== '/auth-email') {
        navigate('/login')
      }
    }

  }, [user?.username])
}
