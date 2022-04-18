import React from 'react'
import { MdCalendarToday } from 'react-icons/md'
import { getEvent } from 'lib/api/event/getEvent'
import ScheduleCard from '../Schedules/ScheduleCard'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { Button, ButtonGroup } from '@mui/material'
import EventDetailCard from './EventDetailCard'

export type EventDetailLeftProps = {
  id: string
}

function EventDetailContainer({ id }: EventDetailLeftProps) {
  const { data: event, isLoading, error } = useQuery(['event', id], getEvent, {
    enabled: !!id,
    retry: false
  })

  if (isLoading) return (<div>Loading!</div>)
  if (error) return (<Navigate to={'/'} />)
  if (!event) return (<div>No event</div>)

  return <>
    <h1 css={titleEventStyle}>{event.title}</h1>
    <section css={dateSectionStyle}><MdCalendarToday />
      <span>{event.start_date.replace(/T.*$/, '')} ~ {event.end_date.replace(/T.*$/, '')}</span>
    </section>
    {event.meeting_list.length > 0 &&
      <>
        <h3 css={titleEventStyle}>Meeting List</h3>
        <div css={scheduleWrapStyle}>
          {event.meeting_list.map((meeting: any) => {
            return <EventDetailCard key={meeting.id}
                                    from={meeting.ownerEmail} to={meeting.toEmail}
                                    comment={meeting.comment}
                                    place={meeting.location}
                                    date={meeting.date} time={meeting.time}
                                    title={meeting.title}
                                    state={meeting.status} id={meeting.id} />
          })}
        </div>
      </>}
  </>
}

const titleEventStyle = css`
  font: normal normal 800 20px/23px NanumSquareOTF;
  margin: 0 0 15px;
  color: #333333;
`
const dateSectionStyle = css`
  display: flex;
  align-items: center;
  color: #6C6C6C;

  svg {
    font-size: 1rem;
    margin-right: 0.625rem;
  }

  font: normal normal normal 16px/18px NanumSquareOTF;
  margin-bottom: 15px;
`

const scheduleWrapStyle = css`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
`

export default EventDetailContainer
