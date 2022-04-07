import { useRecoilValue, useSetRecoilState } from 'recoil'
import { meetingReqState, updateDate, updateTime } from 'atoms/meetingReqState'

export default function useDateTimeHook(initDate?: Date) {
  const meetingReq = useRecoilValue(meetingReqState)
  const setMeetingState = useSetRecoilState(meetingReqState)

  const { time, date } = meetingReq
  const setDate = (value: Date) => {
    setMeetingState((state) => updateDate(state, value))
    return true
  }
  const setTime = (value: Date) => {
    setMeetingState((state) => updateTime(state, value))
    return true
  }

  if (initDate) {
    setDate(initDate)
  }

  return {
    time, date,
    setDate, setTime
  }
}
