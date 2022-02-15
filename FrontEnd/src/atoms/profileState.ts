import { atom, useRecoilState } from 'recoil'
import { IProfile } from '../lib/api/types'

const profileState = atom<IProfile | null>({
  key: 'profileState',
  default: null
})

export function useProfileState() {
  return useRecoilState(profileState)
}
