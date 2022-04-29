import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import { useCallback, useMemo } from 'react'
import { calendarStyle } from './styles'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { brandColor } from '../../lib/palette'

export type ScheduleCalendarProps = {}

function ScheduleCalendar({}: ScheduleCalendarProps) {
  const { data } = useMeetingQuery('', 'title', { enabled: false })
  const navigate = useNavigate()

  const scheduleEvents = useMemo(() => {
    const ret = []
    if (data) {
      for (const meeting of data) {
        const ed = new Date(meeting.date)
        const dist = formatDistanceToNow(ed, {
          addSuffix: true,
        })
        const eventObj = {
          id: meeting._id,
          title: meeting.title,
          start: meeting.date,
          end: meeting.date,
          backgroundColor: dist.includes('ago') ? '#9c9c9c' : brandColor,
        }
        ret.push(eventObj)
      }
      return ret
    }
  }, [data])

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
        initialEvents={scheduleEvents}
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
