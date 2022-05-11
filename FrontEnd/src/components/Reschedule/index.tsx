import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookingSide from '../Booking/BookingSide'
import BookingReplanMain from '../Booking/BookingRepalnMain'
import { wrapper } from '../Booking/styles'
import { IReplan } from 'lib/api/types'
import { useQuery } from 'react-query'
import { getMeetingInfoByCode } from 'lib/api/meeting/getMeetingInfoByCode'

export type MeetingRescheduleProps = {}

function MeetingReschedule({}: MeetingRescheduleProps) {
  const [param] = useSearchParams()
  const code = useMemo(() => param.get('code'), [param])
  const { data: meeting, isLoading } = useQuery<IReplan>(['meeting', code ?? '', 'replan'], getMeetingInfoByCode, {
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (!code || isLoading || !meeting) {
    return <div>Loading</div>
  }

  return (
    <div css={wrapper}>
      <BookingSide meeting={meeting.data} />
      <BookingReplanMain meeting={meeting} />
    </div>
  )
}

export default MeetingReschedule
