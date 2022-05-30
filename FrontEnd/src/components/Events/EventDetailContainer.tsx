import React, { useMemo } from 'react'
import { getEvent } from 'lib/api/event/getEvent'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import EventDetailCard from './EventDetailCard'
import UnavailableTimePicker from '../UnavailableTimePicker'
import { IEvent, IMeeting } from 'lib/api/types'
import { format, isBefore } from 'date-fns'
import IconControl from '../IconControl'
import { noScheduleStyle } from './styles'
import { Helmet } from 'react-helmet-async'

export type EventDetailLeftProps = {
  id: string
}

function EventDetailContainer({ id }: EventDetailLeftProps) {
  const {
    data: event,
    isLoading,
    error,
  } = useQuery<IEvent>(['event', id], getEvent, {
    enabled: !!id,
    retry: false,
  })

  const isBeforeEvent = useMemo(() => {
    if (!event) return true
    return isBefore(new Date(event.end_date), new Date())
  }, [event])

  if (isLoading) return <div>Loading!</div>
  if (error) return <Navigate to={'/'} />
  if (!event)
    return (
      <div css={noScheduleStyle}>
        <h1>No event</h1>
      </div>
    )

  return (
    <>
      <Helmet>
        <title>{event.title} - WEMET</title>
      </Helmet>
      <h1 css={titleEventStyle}>{event.title}</h1>
      <section css={dateSectionStyle}>
        <IconControl name={'date'} />
        <span>
          {format(new Date(event.start_date), 'yyyy/MM/dd')} - {format(new Date(event.end_date), 'yyyy/MM/dd')}
        </span>
      </section>
      {!isBeforeEvent && (
        <UnavailableTimePicker
          startDate={event.start_date}
          endDate={event.end_date}
          unavailableList={event.restricted_time}
          reserveEvent={event.meeting_list as IMeeting[]}
          id={id}
        />
      )}
      <h3 css={titleEventStyle}>Meeting List</h3>
      {event.meeting_list.length > 0 ? (
        <div css={scheduleWrapStyle}>
          {event.meeting_list.map((meeting: any) => {
            return (
              <EventDetailCard
                key={meeting._id}
                from={meeting.ownerEmail}
                to={meeting.toEmail}
                comment={meeting.comment}
                place={meeting.location}
                date={meeting.date}
                time={meeting.startTime}
                title={meeting.title}
                state={meeting.status}
                id={meeting._id}
              />
            )
          })}
        </div>
      ) : (
        <div css={noScheduleStyle}>
          <h1>There are no meeting schedules!</h1>
        </div>
      )}
    </>
  )
}

const titleEventStyle = css`
  font: normal normal 800 20px/23px NanumSquareOTF;
  margin: 0 0 15px;
  color: #333333;
`
const dateSectionStyle = css`
  display: flex;
  align-items: center;
  color: #6c6c6c;

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
`

export default EventDetailContainer
