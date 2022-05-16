import { atom, useRecoilState } from 'recoil'

export const profileFormState = atom<string>({
  key: 'profileFormState',
  default: '',
})

export function useProfileFormState() {
  return useRecoilState(profileFormState)
}
