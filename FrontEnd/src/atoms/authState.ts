import { atom, useRecoilState } from 'recoil'
import { User } from '../lib/api/types'

export const userState = atom<User | null>({
  key: 'userState',
  default: null
})

export function useUserState() {
  return useRecoilState(userState)
}

type formType = 'default' | 'email-auth'

export const registerFormState = atom<formType>({
  key: 'registerFormState',
  default: 'default'
})

export function useRegisterFormState() {
  return useRecoilState(registerFormState)
}
