import React from 'react'
import { MdCalendarToday } from 'react-icons/md'
import { getEvent } from 'lib/api/event/getEvent'
import ScheduleCard from '../Schedules/ScheduleCard'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { Button, ButtonGroup } from '@mui/material'

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
      <span>Period : <b>{event.start_date.replace(/T.*$/, '')}</b> ~ <b>{event.end_date.replace(/T.*$/, '')}</b></span>
    </section>
    {event.meeting_list.length > 0 &&
      <>
        <h3 css={titleNameStyle}>Schedules - {event.meeting_list.length}</h3>
        <div css={scheduleWrapStyle}>
          {event.meeting_list.map((meeting: any) => {
            return <ScheduleCard key={meeting.id}
                                 from={meeting.ownerEmail} to={meeting.toEmail}
                                 comment={meeting.comment}
                                 place={meeting.location}
                                 date={meeting.date} time={meeting.time}
                                 title={meeting.title}
                                 state={meeting.status} id={meeting.id} />
          })}
        </div>
      </>}
    <ButtonGroup>
      <Button variant={'contained'}> EDIT </Button>
      <Button variant={'contained'} color={'error'}> DEL </Button>
    </ButtonGroup>
  </>
}

const titleNameStyle = css`
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  margin-bottom: 1rem;
`
const titleEventStyle = css`
  font-size: 2rem;
  line-height: 1.5;
  font-weight: bold;
`
const dateSectionStyle = css`
  display: flex;
  align-items: center;

  svg {
    font-size: 2.4rem;
    margin-right: 0.8rem;
  }

  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const scheduleWrapStyle = css`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
`

export default EventDetailContainer
