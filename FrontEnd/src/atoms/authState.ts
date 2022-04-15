import { atom } from 'recoil'
import { User } from '../lib/api/types'
import produce from 'immer'

export const userState = atom<User | null>({
  key: 'userState',
  default: null
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
