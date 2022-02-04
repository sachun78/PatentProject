import { atom, useRecoilState } from 'recoil'
import { User } from '../lib/api/types'

const userState = atom<User | null>({
  key: 'userState',
  default: null
})

export function useUserState() {
  return useRecoilState(userState)
}

const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null
})

export function useAccessTokenState() {
  return useRecoilState(accessTokenState)
}

type formType = 'default' | 'email-auth'

export const registerFormState = atom<formType>({
  key: 'registerFormState',
  default: 'default'
})

export function useRegisterFormState() {
  return useRecoilState(registerFormState)
}
