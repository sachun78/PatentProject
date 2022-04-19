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

export type ScheduleCalendarProps = {}

function EventCalendar({}: ScheduleCalendarProps) {
  const { data } = useEventQuery(1, { enabled: false })
  const navigate = useNavigate()
  const calendarRef = useRef<any>(null)
  const calendarEvents = useMemo(() => {
    const retArr = []
    if (data) {
      for (const event of data) {
        const ed = new Date(event.end_date)
        const dist = formatDistanceToNow(ed, {
          addSuffix: true,
        })
        ed.setDate(ed.getDate() + 1)
        const edStr = ed.toISOString()
        const eventObj = {
          id: event.id,
          title: event.title,
          start: event.start_date.replace(/T.*$/, ''),
          end: edStr.replace(/T.*$/, ''),
          backgroundColor: dist.includes('ago') ? '#9c9c9c' : brandColor,
        }
        retArr.push(eventObj)
      }
    }
    return retArr
  }, [data])

  const handleEventClick = (clickInfo: EventClickArg) => {
    navigate('/membership/event/' + clickInfo.event.id)
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
