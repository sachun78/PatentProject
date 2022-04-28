import { atom, useRecoilState } from 'recoil'

const searchInputState = atom<string>({
  key: 'searchInputState',
  default: '',
})

export function useSearchInputState() {
  return useRecoilState(searchInputState)
}
