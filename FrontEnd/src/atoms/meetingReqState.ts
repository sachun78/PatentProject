import { atom, useRecoilState } from 'recoil'
import produce from 'immer'

export type MeetingReqState = {
  date: Date
  time: Date | null
}
const initialState: MeetingReqState = {
  date: new Date(),
  time: null,
}

export const meetingReqState = atom({
  key: 'meetingReqState',
  default: initialState,
})

export const meetingReqUser = atom({
  key: 'meetingReqUser',
  default: '',
})

export const useMeetingReqUser = () => {
  return useRecoilState(meetingReqUser)
}

export const updateDate = (state: MeetingReqState, value: Date) =>
  produce(state, (draft) => {
    draft.date = value
  })

export const updateTime = (state: MeetingReqState, value: Date | null) =>
  produce(state, (draft) => {
    draft.time = value
  })
