import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import { useMemo } from 'react'
import { calendarStyle } from './styles'

export type ScheduleCalendarProps = {}

function ScheduleCalendar({}: ScheduleCalendarProps) {
  const { data } = useMeetingQuery(1, { enabled: false })
  const scheduleEvents = useMemo(() => {
    const ret = []
    if (data) {
      for (const meeting of data) {
        console.log(meeting)
        const eventObj = {
          id: meeting.id,
          title: meeting.title,
          start: meeting.date,
          end: meeting.date
        }
        ret.push(eventObj)
      }
      return ret
    }
  }, [data])

  return <div css={calendarStyle}><FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
    headerToolbar={{
      left: 'title',
      right: 'today prev,next'
    }}
    initialEvents={scheduleEvents}
    showNonCurrentDates={false}
    fixedWeekCount={false}
  />
  </div>
}

export default ScheduleCalendar
