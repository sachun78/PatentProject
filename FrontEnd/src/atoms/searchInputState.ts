import { atom, useRecoilState } from 'recoil'

const searchInputState = atom<string>({
  key: 'searchInputState',
  default: '',
})

export function useSearchInputState() {
  return useRecoilState(searchInputState)
}

const postSearchInputState = atom<string>({
  key: 'postSearchInputState',
  default: '',
})

export function usePostSearchInputState() {
  return useRecoilState(postSearchInputState)
}