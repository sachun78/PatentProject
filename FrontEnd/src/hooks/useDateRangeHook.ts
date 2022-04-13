import { useMemo } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { dateRangeState, eventState, updateDateRange } from '../atoms/eventState'

export default function useDateRangeHook() {
  const dateRange = useRecoilValue(dateRangeState)
  const setEventState = useSetRecoilState(eventState)

  const today = useMemo(() => new Date(), [])
  const lastDate = useMemo(() => (new Date(new Date().setFullYear(new Date().getFullYear() + 1))), [])

  const { startDate, endDate } = dateRange
  const setStartDate = (value: Date) => {
    setEventState((state) => updateDateRange(state, 'startDate', value))
    return true
  }
  const setEndDate = (value: Date) => {
    setEventState((state) => updateDateRange(state, 'endDate', value))
    return true
  }

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    minDate: today,
    maxDate: lastDate
  }
}
