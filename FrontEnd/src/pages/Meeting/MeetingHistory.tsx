import { tableStyle } from 'components/Schedules/styles'
import { formatDistanceToNow } from 'date-fns'
import React, { useCallback, useMemo, useState } from 'react'
import ScheduleTable from 'components/Schedules/ScheduleTable'
import SearchBox from 'components/SearchBox'
import { SearchContainer } from 'components/Events/styles'
import { searchSelect } from 'components/Schedules'
import { Button, SelectChangeEvent } from '@mui/material'
import { useInfiniteQuery } from 'react-query'
import { getMeetingsCursor } from 'lib/api/meeting/getMeetings'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const [meetingFilter, setMeetingFilter] = useState('')
  const [type, setType] = useState<searchSelect>('title')

  const onTypeChange = useCallback((event: SelectChangeEvent) => {
    setType(event.target.value as searchSelect)
  }, [])

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['meetings', meetingFilter, type],
    ({ pageParam = 0 }) => getMeetingsCursor(meetingFilter, type, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        // page 길이 5이면
        const morePagesExist = lastPage?.length === 3
        if (!morePagesExist) return false
        return pages.flat().length - 1
      },
    }
  )

  const meetings = useMemo(() => {
    if (!data) return []
    return data.pages.flat().filter((meeting) => {
      const dist = formatDistanceToNow(new Date(meeting.date), {
        addSuffix: true,
      })
      return dist.includes('ago') || meeting.history
    })
  }, [data])

  if (isLoading) return <div css={tableStyle}>Loading...</div>
  return (
    <>
      <SearchContainer style={{ marginBottom: '0.625rem', maxWidth: '60rem' }}>
        <SearchBox filter={setMeetingFilter} onTypeChange={onTypeChange} type={type} />
      </SearchContainer>
      <ScheduleTable meetings={meetings} />
      {hasNextPage && (
        <Button variant={'contained'} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          View more...
        </Button>
      )}
    </>
  )
}

export default MeetingHistory
