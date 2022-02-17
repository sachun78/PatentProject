import React, { useMemo } from 'react'
import FullCalendar, { EventApi, EventClickArg, EventContentArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import useEventQuery from '../../hooks/query/useEventQuery'

export type ScheduleCalendarProps = {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}

function ScheduleCalendar({}: ScheduleCalendarProps) {
  const { data } = useEventQuery(1, { enabled: false })
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
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    }
  }

  return <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: ''
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

  />
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

function getRandomColor() {
  return 'hsl(' + Math.random() * 360 + ', 100%, 40%)'
}

export default ScheduleCalendar
