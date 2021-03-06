import React from 'react'
import ScheduleTable from 'components/Schedules/ScheduleTable'
import { useQuery } from 'react-query'
import { getMeetingHistory } from 'lib/api/meeting/getMeetings'
import { noScheduleStyle } from 'components/Events/styles'
import { CircularProgress } from '@mui/material'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const { data, isLoading } = useQuery('meeting/history', getMeetingHistory, {})

  if (isLoading)
    return (
      <div css={noScheduleStyle}>
        <CircularProgress />
        <div>Loading...</div>
      </div>
    )
  if (!data || data.length === 0)
    return (
      <div css={noScheduleStyle}>
        <h1>No meeting history</h1>
      </div>
    )
  return <ScheduleTable meetings={data} type="history" />
}

export default MeetingHistory
