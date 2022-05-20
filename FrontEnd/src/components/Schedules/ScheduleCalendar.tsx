import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useCallback, useMemo } from 'react'
import { calendarStyle } from './styles'
import { useNavigate } from 'react-router-dom'
import { isBefore } from 'date-fns'
import palette, { brandColor } from 'lib/palette'
import { IMeeting } from 'lib/api/types'

export type ScheduleCalendarProps = {
  meetings: IMeeting[]
}

function ScheduleCalendar({ meetings }: ScheduleCalendarProps) {
  const navigate = useNavigate()

  const scheduleEvents = useMemo(() => {
    if (!meetings) return []
    return meetings.map((met) => {
      const ed = new Date(met.date)
      const backgroundColor =
        met.status === 'confirm'
          ? palette.green[400]
          : met.status === 'replan'
          ? brandColor
          : met.status === 'cancel'
          ? '#9c9c9c'
          : !isBefore(ed, new Date())
          ? palette.deepOrange[400]
          : '#9c9c9c'
      return {
        id: met._id,
        title: met.title,
        start: met.date,
        end: met.date,
        backgroundColor,
      }
    })
  }, [meetings])

  const onScheduleClick = useCallback(
    (clickInfo: EventClickArg) => {
      navigate('/meeting/schedule/' + clickInfo.event.id)
    },
    [navigate]
  )

  return (
    <div css={calendarStyle}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          center: 'prev,title,next',
          left: '',
          right: '',
        }}
        events={scheduleEvents}
        showNonCurrentDates={false}
        fixedWeekCount={false}
        eventClick={onScheduleClick}
        aspectRatio={2.079796265}
      ></FullCalendar>
    </div>
  )
}

export default ScheduleCalendar
