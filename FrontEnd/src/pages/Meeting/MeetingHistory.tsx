import { tableStyle } from '../../components/Schedules/styles'
import { formatDistanceToNow } from 'date-fns'
import ScheduleCard from '../../components/Schedules/ScheduleCard'
import React from 'react'
import useMeetingQuery from '../../hooks/query/useMeetingQuery'
import ScheduleSkeleton from '../../components/Schedules/ScheduleSkeleton'

export type MeetingHistoryProps = {}

function MeetingHistory({}: MeetingHistoryProps) {
  const { data, isLoading } = useMeetingQuery(1, {
    staleTime: 2000,
  })

  if (isLoading)
    return (
      <div css={tableStyle}>
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
      </div>
    )

  return (
    <div css={tableStyle}>
      {data?.map((v) => {
        const dist = formatDistanceToNow(new Date(v.date), {
          addSuffix: true,
        })
        if (!dist.includes('ago') && !v.history) return null
        return (
          <ScheduleCard
            key={v.id}
            from={v.ownerEmail}
            to={v.toEmail}
            comment={v.comment}
            place={v.location}
            date={v.date}
            time={v.time}
            title={v.title}
            state={v.status}
            id={v.id}
            outdated={!v.history}
          />
        )
      })}
    </div>
  )
}

export default MeetingHistory
