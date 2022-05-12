import { tableStyle } from 'components/Schedules/styles'
import React from 'react'
import ScheduleTable from 'components/Schedules/ScheduleTable'
import { useQuery } from 'react-query'
import { getMeetingHistory } from 'lib/api/meeting/getMeetings'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const { data, isLoading } = useQuery('meeting/history', getMeetingHistory, {})

  if (isLoading) return <div css={tableStyle}>Loading...</div>
  if (!data || data.length === 0) return <div css={tableStyle}>No meeting history</div>
  return <ScheduleTable meetings={data} type="history" />
}

export default MeetingHistory
