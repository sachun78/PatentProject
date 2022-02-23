import { useLocation, useNavigate } from 'react-router-dom'
import { useUserState } from '../atoms/authState'
import { useEffect } from 'react'

export function usePageRelocationEffect() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [user] = useUserState()
  useEffect(() => {
    console.log(pathname)
    if (user) {
      if (['/login', '/register'].includes(pathname)) {
        navigate('/')
      }
    } else {
      if (!['/login', '/register', '/auth-email'].includes(pathname)) {
        navigate('/login')
      }
    }
  }, [user?.username, pathname])
}
