import useAuth from './useAuth'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../lib/api/me/getCurrentUser'
import { useRegisterFormState, useUserState } from '../atoms/authState'
import userStorage from '../lib/storage/userStorage'

export default function useCheckUserEffect() {
  const { logout } = useAuth()
  const [user] = useUserState()
  const [, setRegisterForm] = useRegisterFormState()
  const { pathname } = useLocation()

  useEffect(() => {
    const storedUser = userStorage.get()
    if (!storedUser) {
      return
    }
    getCurrentUser()
      .catch(() => logout())
  }, [logout])

  useEffect(() => {
    if (user) {
      if (!user.certified) {
        setRegisterForm('email-auth')
      }
    } else {
      console.log('isloggedIn is false')
      // 현재 위치가 login/register/auth-mail이 아니면 로그인 페이지로 이동
      if (pathname === '/auth-email') {
        setRegisterForm('email-auth')
      }
    }

  }, [user?.username])
}
