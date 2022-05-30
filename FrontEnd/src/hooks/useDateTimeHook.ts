import { useRecoilState } from 'recoil'
import { MeetingDateState, MeetingTimeState } from 'atoms/meetingReqState'

export default function useDateTimeHook() {
  const [date, setDate] = useRecoilState(MeetingDateState)
  const [time, setTime] = useRecoilState(MeetingTimeState)

  return {
    time,
    date,
    setDate,
    setTime,
  }
}
