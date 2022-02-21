import React, { useMemo } from 'react'
import FullCalendar, { EventApi, EventClickArg, EventContentArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import useEventQuery from '../../hooks/query/useEventQuery'
import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { useNavigate } from 'react-router-dom'

export type ScheduleCalendarProps = {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}

function ScheduleCalendar({}: ScheduleCalendarProps) {
  const { data } = useEventQuery(1, { enabled: false })
  const navigate = useNavigate()
  const calendarEvents = useMemo(() => {
    const retArr = []
    if (data) {
      for (const event of data) {
        const eventObj = {
          id: event.id,
          title: event.title,
          start: event.start_date.replace(/T.*$/, ''),
          end: event.end_date.replace(/T.*$/, ''),
          backgroundColor: getRandomColor()
        }
        retArr.push(eventObj)
      }
    }
    return retArr
  }, [data])
  const handleEventClick = (clickInfo: EventClickArg) => {
    navigate('/membership/event/' + clickInfo.event.id)
  }

  return <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    height={650}
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    }}
    initialView='dayGridMonth'
    editable={false}
    selectable={false}
    initialEvents={calendarEvents}
    selectMirror={true}
    dayMaxEvents={true}
    weekends={true}
    eventContent={renderEventContent}
    eventClick={handleEventClick}
    eventColor={'#00bcd4'}
    eventMouseEnter={(info) => {
      info.el.style.backgroundColor = '#00bcd4'
    }}
    eventMouseLeave={(info) => {
      info.el.style.backgroundColor = info.event.backgroundColor
    }}
    dayMaxEventRows={true}
    views={{
      dayGridMonth: {
        dayMaxEventRows: true
      }
    }}
  />
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <i css={eventStyle}>{eventContent.event.title}</i>
    </>
  )
}

function getRandomColor() {
  return 'hsl(' + Math.random() * 360 + ', 100%, 40%)'
}

const eventStyle = css`
  font-size: 1.3rem;
  line-height: 1.5;
  font-weight: 600;
  padding: 0.5rem;

  &:hover {
    color: ${palette.lightGreen[100]};
  }
`

export default ScheduleCalendar
