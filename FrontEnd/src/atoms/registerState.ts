import { atom, useRecoilState } from 'recoil'

export type RegisterState = {
  username: string
  email: string
  password: string
  password_confirm: string
  company: string
  company_part: string
  tel: string
  country: string // OR CountryValue?
}

const initialState: RegisterState = {
  username: '',
  email: '',
  password: '',
  password_confirm: '',
  company: '',
  company_part: '',
  tel: '',
  country: '',
}

export const registerState = atom({
  key: 'registerState',
  default: initialState,
})

export function useRegisterState() {
    return useRecoilState(registerState)
}