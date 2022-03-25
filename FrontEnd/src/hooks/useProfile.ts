import { useEffect, useState } from 'react'
import { getCurrentProfile } from '../lib/api/me/getProfile'
import { useProfileState } from '../atoms/profileState'
import useModal from './useModal'

export function useProfile() {
  const [profile, setProfile] = useProfileState()
  const [loading, setLoading] = useState(true)
  const { open, setOpen, handleClose } = useModal(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getCurrentProfile()
      if (result) {
        await setProfile(result)
      }
    }

    if (profile === null) {
      console.log('profile is null')
      fetchProfile()
    }
    return () => setLoading(false)
  }, [])

  useEffect(() => {
    if (profile) {
      setOpen(profile.company?.length === 0)
    }
  }, [profile])

  return { profile, loading, setProfile, open, setOpen, handleClose }
}
