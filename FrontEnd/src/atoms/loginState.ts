import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { produce } from 'immer'
import { useMemo } from 'react'

export type LoginValue = {
  isloggedIn: boolean
  loginType: 'USER' | 'NOTUSER'
}

const defaultLoginState: LoginValue = {
  isloggedIn: false,
  loginType: 'USER',
}

export const loginState = atom<LoginValue>({
  key: 'loginState',
  default: defaultLoginState,
})

export function useLoginValue() {
  return useRecoilValue(loginState)
}

export function useLoginStateActions() {
  const set = useSetRecoilState(loginState)
  return useMemo(
    () => ({
      toggle() {
        set((prev) =>
          produce(prev, (draft) => {
            if (prev.loginType === 'USER') {
              draft.loginType = 'NOTUSER'
            } else {
              draft.loginType = 'USER'
            }
          })
        )
      },
      setLoggedIn(islogin: boolean) {
        set((prev) =>
          produce(prev, (draft) => {
            draft.isloggedIn = islogin
          })
        )
      },
    }),
    [set]
  )
}
