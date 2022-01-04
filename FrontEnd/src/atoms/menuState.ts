import { atom, useRecoilState } from "recoil";

export const selectMenuState = atom({
    key: 'selectMenuState',
    default: '',
  })

export function useSelectMenuState() {
    return useRecoilState(selectMenuState)
}