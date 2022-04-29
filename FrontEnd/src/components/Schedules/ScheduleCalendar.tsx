import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useCallback, useMemo } from 'react'
import { calendarStyle } from './styles'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { brandColor } from '../../lib/palette'
import { IMeeting } from '../../lib/api/types'

export type ScheduleCalendarProps = {
  meetings: IMeeting[]
}

function ScheduleCalendar({ meetings }: ScheduleCalendarProps) {
  const navigate = useNavigate()

  const scheduleEvents = useMemo(() => {
    if (!meetings) return []
    return meetings.map((met) => {
      const ed = new Date(met.date)
      const dist = formatDistanceToNow(ed, {
        addSuffix: true,
      })
      return {
        id: met._id,
        title: met.title,
        start: met.date,
        end: met.date,
        backgroundColor: dist.includes('ago') ? '#9c9c9c' : brandColor,
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
          center: 'title',
          left: 'prev next',
          right: 'today',
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

/*
*    dayCellDidMount={(arg: DayCellMountArg) => {
        if (data?.findIndex((meeting) => {
          const meetingDate = new Date(meeting.date)
          return meetingDate.getMonth() === arg.date.getMonth() && meetingDate.getDate() === arg.date.getDate() &&
            meetingDate.getFullYear() === arg.date.getFullYear()
        }) === -1 && !arg.isDisabled && !arg.isPast) {
          let p = document.createElement('div')
          p.textContent = '+'
          p.style.position = 'absolute'
          p.style.left = '50%'
          p.style.bottom = '50%'
          arg.el.firstChild?.appendChild(p)
        }
      }}
* */

export default ScheduleCalendar
