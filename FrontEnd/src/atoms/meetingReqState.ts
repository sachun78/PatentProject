import { atom, selector, useRecoilState } from 'recoil'
import produce from 'immer'

export type MeetingReqState = {
  date: Date
  time: Date
}
const initialState: MeetingReqState = {
  date: new Date(),
  time: new Date(),
}

export const networkUserFindModalState = atom({
  key: 'networkUserFindModalState',
  default: false,
})

export const meetingReqState = atom({
  key: 'meetingReqState',
  default: initialState,
})

export const MeetingDateState = selector<MeetingReqState['date']>({
  key: 'MeetingDateState',
  get: ({ get }) => {
    const state = get(meetingReqState)
    return state.date
  },
  set: ({ set }, date) => {
    set(
      meetingReqState,
      produce((state) => {
        state.date = date
      })
    )
  },
})

export const MeetingTimeState = selector<MeetingReqState['date']>({
  key: 'MeetingTimeState',
  get: ({ get }) => {
    const state = get(meetingReqState)
    return state.time
  },
  set: ({ set }, time) => {
    set(
      meetingReqState,
      produce((state) => {
        state.date = time
        state.time = time
      })
    )
  },
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

export const updateTime = (state: MeetingReqState, value: Date) =>
  produce(state, (draft) => {
    draft.time = value
  })
