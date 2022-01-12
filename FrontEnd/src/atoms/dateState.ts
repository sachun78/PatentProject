import moment from 'moment'
import { atom, useRecoilState } from 'recoil'

export type dateValue = {
  date: moment.Moment
}

const defaultdateValue: dateValue = {
  date: moment('2022-01-01'),
}

export const dateState = atom<dateValue>({
  key: 'dateState',
  default: defaultdateValue,
})

export function useDateState() {
  return useRecoilState(dateState)
}
