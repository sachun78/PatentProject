import { tableStyle } from 'components/Schedules/styles'
import React, { useMemo, useState } from 'react'
import ScheduleTable from 'components/Schedules/ScheduleTable'
import { searchSelect } from 'components/Schedules'
import { useInfiniteQuery } from 'react-query'
import { getMeetingsCursor } from 'lib/api/meeting/getMeetings'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const [meetingFilter] = useState('')
  const [type] = useState<searchSelect>('title')

  const { data, isLoading } = useInfiniteQuery(
    ['meetings', '', type],
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
      return meeting.history
    })
  }, [data])

  if (isLoading) return <div css={tableStyle}>Loading...</div>
  return (
    <>
      <ScheduleTable meetings={meetings} />
    </>
  )
}

export default MeetingHistory
