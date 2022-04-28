import { tableStyle } from 'components/Schedules/styles'
import { formatDistanceToNow } from 'date-fns'
import React, { useCallback, useMemo, useState } from 'react'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import ScheduleTable from 'components/Schedules/ScheduleTable'
import SearchBox from '../../components/SearchBox'
import { SearchContainer } from '../../components/Events/styles'
import { searchSelect } from '../../components/Schedules'
import { SelectChangeEvent } from '@mui/material'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const [meetingFilter, setMeetingFilter] = useState('')
  const [type, setType] = useState<searchSelect>('title')

  const onTypeChange = useCallback((event: SelectChangeEvent) => {
    console.log(event.target.value)
    setType(event.target.value as searchSelect)
  }, [])

  const { data, isLoading } = useMeetingQuery(meetingFilter, type, {
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
  return (
    <>
      <SearchContainer style={{ marginBottom: '0.625rem', maxWidth: '60rem' }}>
        <SearchBox filter={setMeetingFilter} onTypeChange={onTypeChange} type={type} />
      </SearchContainer>
      <ScheduleTable meetings={meetings} />
    </>
  )
}

export default MeetingHistory
