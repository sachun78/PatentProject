import { atom, selector, useRecoilState } from 'recoil'
import { User } from '../lib/api/types'
import produce from 'immer'

export const userState = atom<User | null>({
  key: 'userState',
  default: null
})

export function useUserState() {
  return useRecoilState(userState)
}

export const photoState = selector<User['photo_path']>({
  key: 'phothPathState',
  get: ({ get }) => {
    const user = get(userState)
    if (user) {
      return user.photo_path
    }
    return ''
  }
})

export const updateUserPhoto = (
  state: User | null,
  value: string
) =>
  produce(state, (draft) => {
    if (draft) {
      draft.photo_path = value
    }
  })


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
