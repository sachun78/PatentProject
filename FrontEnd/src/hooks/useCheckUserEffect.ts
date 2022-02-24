import useAuth from './useAuth'
import { useEffect } from 'react'
import { getCurrentUser } from '../lib/api/me/getCurrentUser'
import userStorage from '../lib/storage/userStorage'

export default function useCheckUserEffect() {
  const { logout } = useAuth()

  useEffect(() => {
    const storedUser = userStorage.get()
    if (!storedUser) {
      return
    }
    getCurrentUser()
      .catch(() => logout())
  }, [logout])
}
