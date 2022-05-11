import { tableStyle } from 'components/Schedules/styles'
import React, { useMemo } from 'react'
import ScheduleTable from 'components/Schedules/ScheduleTable'
import { useInfiniteQuery } from 'react-query'
import { getMeetingsCursor } from 'lib/api/meeting/getMeetings'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const { data, isLoading } = useInfiniteQuery(['meetings'], ({ pageParam = 0 }) => getMeetingsCursor(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      // page 길이 5이면
      const morePagesExist = lastPage?.length === 3
      if (!morePagesExist) return false
      return pages.flat().length - 1
    },
    enabled: false,
  })

  const meetings = useMemo(() => {
    if (!data) return []
    return data.pages.flat().filter((meeting) => {
      return meeting.history
    })
  }, [data])

  if (isLoading) return <div css={tableStyle}>Loading...</div>
  if (!meetings.length) return <div css={tableStyle}>No meeting history</div>
  return (
    <>
      <ScheduleTable meetings={meetings} />
    </>
  )
}

export default MeetingHistory
