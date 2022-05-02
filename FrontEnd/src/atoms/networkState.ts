import { atom, useRecoilState } from 'recoil'

export const networkModalState = atom<boolean>({
  key: 'networkState',
  default: false,
})

export function useNetworkModalState() {
  return useRecoilState(networkModalState)
}
