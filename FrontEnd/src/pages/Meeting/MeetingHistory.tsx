import { tableStyle } from 'components/Schedules/styles'
import { formatDistanceToNow } from 'date-fns'
import React, { useMemo } from 'react'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import ScheduleTable from 'components/Schedules/ScheduleTable'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const { data, isLoading } = useMeetingQuery(1, {
    staleTime: 2000,
  })
  const meetings = useMemo(() => {
    if (!data) return []
    return data.filter((meeting) => {
      const dist = formatDistanceToNow(new Date(meeting.date), {
        addSuffix: true,
      })
      return !(!dist.includes('ago') && !meeting.history)
    })
  }, [data])
  if (isLoading) return <div css={tableStyle}>Loading...</div>
  return <ScheduleTable meetings={meetings} />
}

export default MeetingHistory
