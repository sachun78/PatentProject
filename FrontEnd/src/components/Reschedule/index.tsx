import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { getMeetingInfoByCode } from 'lib/api/meeting/getMeetingInfoByCode'
import BookingSide from '../Booking/BookingSide'
import BookingReplanMain from '../Booking/BookingRepalnMain'
import { wrapper } from '../Booking/styles'
import { IMeeting } from 'lib/api/types'

export type MeetingRescheduleProps = {}

function MeetingReschedule({}: MeetingRescheduleProps) {
  const [param] = useSearchParams()
  const code = useMemo(() => param.get('code'), [param])

  const { data: meetingData, isLoading } = useQuery<IMeeting>(
    ['meeting', code ?? ''],
    getMeetingInfoByCode,
    {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!meetingData) {
    return <div>Not Found</div>
  }

  return (
    <div css={wrapper}>
      <BookingSide meeting={meetingData} />
      <BookingReplanMain meeting={meetingData} />
    </div>
  )
}

export default MeetingReschedule
