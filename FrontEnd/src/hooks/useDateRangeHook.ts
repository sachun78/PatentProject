import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { dateRangeState } from '../atoms/eventState'

export default function useDateRangeHook() {
  const [dateRange, setDateRange] = useRecoilState(dateRangeState)

  const today = useMemo(() => {
    const day = new Date()
    day.setHours(0, 0, 0, 0)
    return day
  }, [])
  const lastDate = useMemo(() => new Date(new Date().setFullYear(new Date().getFullYear() + 1)), [])

  const { startDate, endDate } = dateRange
  const setStartDate = (value: Date) => {
    setDateRange({
      startDate: value,
      endDate: endDate,
    })
  }
  const setEndDate = (value: Date) => {
    setDateRange({
      startDate: startDate,
      endDate: value,
    })
  }

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    minDate: today,
    maxDate: lastDate,
  }
}
