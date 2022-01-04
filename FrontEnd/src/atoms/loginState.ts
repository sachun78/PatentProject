import { atom, useRecoilState } from 'recoil'
import { produce } from 'immer'

export const loginState = atom<LoginValue | null>({
  key: 'loginState',
  default: {
    isloggedIn: false,
    loginType: 'USER',
  },
})

export function useLoginState() {
  return useRecoilState(loginState)
}

export const updateLoginState = (
  state: LoginValue,
  key: keyof LoginValue,
  value: boolean
) =>
  produce(state, (draft) => {
    draft.isloggedIn = value
  })

export const toggleLoginType = (state: LoginValue, key: keyof LoginValue) =>
  produce(state, (draft) => {
    const type = state.loginType === 'USER' ? 'NOTUSER' : 'USER'
    draft.loginType = type
  })

export type LoginValue = {
  isloggedIn: boolean
  loginType: 'USER' | 'NOTUSER'
}
