import { atom, useRecoilState } from 'recoil'

export const profileFormState = atom<string>({
  key: 'networkState',
  default: '',
})

export function useProfileFormState() {
  return useRecoilState(profileFormState)
}
