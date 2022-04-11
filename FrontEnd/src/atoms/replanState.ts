import { atom } from 'recoil'

export type IReplan = {
  code: string,
}

// 회원가입을 위한 Replan 상태 저장
// 회원 가입후 바로 Replan Page로 이동하기 위해 사용
export const replanState = atom<IReplan | null>({
  key: 'replanState',
  default: null
})
