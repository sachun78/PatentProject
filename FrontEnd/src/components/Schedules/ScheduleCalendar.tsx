import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import { useCallback, useMemo } from 'react'
import { calendarStyle } from './styles'
import { useNavigate } from 'react-router-dom'

export type ScheduleCalendarProps = {}

function ScheduleCalendar({}: ScheduleCalendarProps) {
  const { data } = useMeetingQuery(1, { enabled: false })
  const navigate = useNavigate()

  const scheduleEvents = useMemo(() => {
    const ret = []
    if (data) {
      for (const meeting of data) {
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

  const onScheduleClick = useCallback((clickInfo: EventClickArg) => {
    navigate('/membership/meeting/' + clickInfo.event.id)
  }, [navigate])

  return <div css={calendarStyle}>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        center: 'title',
        left: 'prev next today',
        right: ''
      }}
      initialEvents={scheduleEvents}
      showNonCurrentDates={false}
      fixedWeekCount={false}
      eventClick={onScheduleClick}
      aspectRatio={2.079796265}
    />
  </div>
}

export default ScheduleCalendar
