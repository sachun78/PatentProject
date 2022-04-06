import React, { useMemo } from 'react'
import FullCalendar, { EventClickArg, EventContentArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import useEventQuery from 'hooks/query/useEventQuery'
import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'
import { useNavigate } from 'react-router-dom'
import listPlugin from '@fullcalendar/list'

export type ScheduleCalendarProps = {}

function EventCalendar({}: ScheduleCalendarProps) {
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
          backgroundColor: brandColor
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
    plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
    headerToolbar={{
      left: 'title',
      right: 'today prev,next'
    }}
    initialView='dayGridMonth'
    editable={false}
    selectable={false}
    selectMirror={true}
    dayMaxEvents={true}
    weekends={true}
    showNonCurrentDates={false}
    eventContent={renderEventContent}
    eventClick={handleEventClick}
    dayMaxEventRows={true}
    fixedWeekCount={false}
    views={{ dayGridMonth: { dayMaxEventRows: true } }}
    events={calendarEvents}
  />
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <><i css={eventStyle}>{eventContent.event.title}</i></>
  )
}

const eventStyle = css`
  font-size: 1.3rem;
  line-height: 1.34;
  font-weight: 600;
  padding: 0.5rem;
`

export default EventCalendar
