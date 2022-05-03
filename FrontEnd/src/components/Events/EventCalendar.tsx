import React, { useMemo, useRef } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import useEventQuery from 'hooks/query/useEventQuery'
import { brandColor } from 'lib/palette'
import { useNavigate } from 'react-router-dom'
import listPlugin from '@fullcalendar/list'
import { calendarStyle } from '../Schedules/styles'
import { formatDistanceToNow } from 'date-fns'
import randomColor from 'randomcolor'

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
        backgroundColor: dist.includes('ago')
          ? '#9c9c9c'
          : randomColor({
              hue: brandColor,
              format: 'rgb', // e.g. 'rgb(225,200,20)'
              seed: event._id,
            }),
        allDay: true,
      }
    })
  }, [data])

  const handleEventClick = (clickInfo: EventClickArg) => {
    navigate('/meeting/event/' + clickInfo.event.id)
  }

  return (
    <div css={calendarStyle}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev next',
          center: 'title',
          right: 'today',
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        showNonCurrentDates={false}
        dayMaxEventRows={true}
        fixedWeekCount={false}
        events={calendarEvents}
        eventClick={handleEventClick}
        aspectRatio={2.079796265}
        select={(info) => {
          info.view.calendar.unselect()
        }}
      />
    </div>
  )
}

export default EventCalendar
