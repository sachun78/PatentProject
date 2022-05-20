import React, { useMemo, useRef } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import useEventQuery from 'hooks/query/useEventQuery'
import { useNavigate } from 'react-router-dom'
import listPlugin from '@fullcalendar/list'
import { calendarStyle } from '../Schedules/styles'
import { formatDistanceToNow } from 'date-fns'

export type ScheduleCalendarProps = {}

function EventCalendar({}: ScheduleCalendarProps) {
  const { data } = useEventQuery({ enabled: false })
  const navigate = useNavigate()
  const calendarRef = useRef<FullCalendar | null>(null)
  const calendarEvents = useMemo(() => {
    if (!data) return []
    return data.map((event) => {
      const ed = new Date(event.end_date)
      const dist = formatDistanceToNow(ed, {
        addSuffix: true,
      })
      return {
        id: event._id,
        title: event.title,
        start: event.start_date,
        end: event.end_date,
        backgroundColor: dist.includes('ago') ? '#9c9c9c' : 'rgba(97, 193, 190, 0.1)',
        borderColor: dist.includes('ago') ? '#9c9c9c' : 'rgba(97, 193, 190, 0.1)',
        textColor: '#6C6C6C',
        allDay: true,
      }
    })
  }, [data])

  const handleEventClick = (clickInfo: EventClickArg) => {
    navigate('/meeting/event/' + clickInfo.event.id)
  }

  return (
    <div css={calendarStyle} style={{ top: 0 }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: '',
          center: 'prev title next',
          right: '',
        }}
        initialView="dayGridMonth"
        editable={false}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        showNonCurrentDates={false}
        dayMaxEventRows={true}
        fixedWeekCount={false}
        events={calendarEvents}
        eventClick={handleEventClick}
        height={'auto'}
        aspectRatio={1.765557164}
        select={(info) => {
          info.view.calendar.unselect()
        }}
      />
    </div>
  )
}

export default EventCalendar
