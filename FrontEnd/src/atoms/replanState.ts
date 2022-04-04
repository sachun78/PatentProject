import { atom } from 'recoil'

export type IReplan = {
  code: string,
}

export const replanState = atom<IReplan | null>({
  key: 'replanState',
  default: null
})
