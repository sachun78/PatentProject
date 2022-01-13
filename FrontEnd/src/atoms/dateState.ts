import moment from 'moment'
import { atom, useRecoilState } from 'recoil'

export type dateValue = {
  date: moment.Moment
  time: moment.Moment
}

export const timeformat = 'HH:mm'
const defaultDateValue: dateValue = {
  date: moment('2022-01-01'),
  time: moment('12:00', timeformat),
}

export const dateState = atom<dateValue>({
  key: 'dateState',
  default: defaultDateValue,
})

// 미팅 생성시 시간, 날짜 선택값 사용
export function useDateState() {
  return useRecoilState(dateState)
}
