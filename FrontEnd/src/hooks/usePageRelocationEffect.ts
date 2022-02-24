import { useLocation, useNavigate } from 'react-router-dom'
import { useRegisterFormState, useUserState } from '../atoms/authState'
import { useEffect } from 'react'
import { useProfileState } from '../atoms/profileState'

export function usePageRelocationEffect() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [user] = useUserState()
  const [profile] = useProfileState()
  const [, setRegisterForm] = useRegisterFormState()

  useEffect(() => {
    console.log(pathname)
    if (user) {
      if (!user.certified) {
        if (!['/login', '/register', '/auth-email'].includes(pathname)) {
          console.log('to login')
          navigate('/login')
        } else {
          if (pathname === '/register') {
            setRegisterForm('email-auth')
          } else if (pathname === '/auth-email') {
            setRegisterForm('email-auth')
          }
        }
      } else {
        if (['/login', '/register'].includes(pathname)) {
          console.log('to main?')
          navigate('/')
        } else if (['/profile', '/event', '/membership', '/network'].includes(pathname)) {
          if (profile?.company === '' || profile === null) {
            navigate('/')
          }
        }
      }
    } else {
      console.log('isloggedIn is false')
      if (pathname === '/auth-email') {
        setRegisterForm('email-auth')
      } else {
        setRegisterForm('default')
      }
      if (!['/login', '/register', '/auth-email'].includes(pathname)) {
        navigate('/login')
      }
    }
  }, [user?.username,user?.certified, pathname])
}
