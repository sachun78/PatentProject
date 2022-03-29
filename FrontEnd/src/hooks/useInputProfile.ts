import { useState } from 'react'
import { patchProfile } from '../lib/api/me/getProfile'
import { IProfile } from '../lib/api/types'
import { useProfileState } from '../atoms/profileState'

export function useInputProfile(initialValue: string, type: string) {
  const [value, setValue] = useState(initialValue)
  const [prevValue, setPrevValue] = useState(initialValue)
  const [, setProfile] = useProfileState()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(prevValue)
  }
  const prev_to_current = async () => {
    try {
      const profileRequest: IProfile = {}
      if (type === 'company') profileRequest.company = value
      if (type === 'position') profileRequest.position = value
      if (type === 'department') profileRequest.department = value
      const result = await patchProfile(profileRequest)
      if (result) {
        setProfile(result)
        setPrevValue(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [value, onChange, reset, prev_to_current] as const
}
