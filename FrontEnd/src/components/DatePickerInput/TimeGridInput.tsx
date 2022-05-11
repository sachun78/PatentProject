import { useCallback, useMemo, useRef, useState } from 'react'
import InputBase from '../InputBase/InputBase'
import { textStyle } from './TimePickerInput'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { differenceInCalendarDays, formatDistanceToNow } from 'date-fns'

import styled from '@emotion/styled'
import { brandColor } from '../../lib/palette'
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export type TimeGridInputProps = {
  startTime: Date
  endTime: Date | null
  startDate: Date
  endDate: Date
  date: Date
  timeChange: (start: Date, end: Date) => void
  dateChange: (date: Date) => void
  timeEvent: { startTime: string; endTime: string; date: string }[]
}

function TimeGridInput({
  startTime,
  endTime,
  startDate,
  endDate,
  timeChange,
  timeEvent,
  dateChange,
  date,
}: TimeGridInputProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<FullCalendar | null>(null)
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  const reserve_event = useMemo(() => {
    return timeEvent.map((event) => {
      const date = new Date(event.date)
      const start = new Date(event.startTime)
      start.setFullYear(date.getFullYear())
      start.setDate(date.getDate())
      const end = new Date(event.endTime)
      end.setFullYear(date.getFullYear())
      end.setDate(date.getDate())

      return {
        title: 'MET',
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: false,
        backgroundColor: brandColor,
      }
    })
  }, [timeEvent])

  const dateDiff = useMemo(() => {
    return differenceInCalendarDays(endDate, startDate) + 1
  }, [endDate, startDate])

  return (
    <InputBase ref={ref} style={{ position: 'relative', width: '100%' }}>
      <div
        css={textStyle}
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (['Enter', 'Space'].includes(e.key)) {
            handleOpen()
          }
        }}
      >
        {endTime
          ? `${date.toDateString()}, ${startTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })} ~ ${endTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`
          : 'Select Date'}
      </div>
      <Dialog onClose={handleClose} open={open} fullScreen>
        <DialogTitle>Set Meeting Date</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            Drag and select Start time and end time. You can select only validate time
          </DialogContentText>
          <CalendarContainer>
            <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              slotEventOverlap={false}
              allDaySlot={false}
              initialDate={new Date()}
              selectOverlap={false}
              headerToolbar={{
                left: 'prev next',
                center: 'title',
                right: '',
              }}
              select={(info) => {
                timeChange(info.start, info.end)
                dateChange(info.start)
                info.view.calendar.unselect()
                setOpen(false)
              }}
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }}
              slotDuration={'00:30:00'}
              nowIndicator={true}
              stickyHeaderDates={true}
              contentHeight={'auto'}
              height={'auto'}
              stickyFooterScrollbar={true}
              events={reserve_event}
              selectAllow={(selectInfo) => {
                let startDate = selectInfo.start
                let endDate = selectInfo.end
                endDate.setSeconds(endDate.getSeconds() - 1) // allow full day selection
                const diff = differenceInCalendarDays(startDate, new Date())
                if (diff >= 0) {
                  return (
                    startDate.getDate() === endDate.getDate() &&
                    !formatDistanceToNow(startDate, { addSuffix: true }).includes('ago')
                  )
                }
                // return이 false 이면 disable select.
                // return이 true 이면 enable select.
                return false
              }}
              validRange={{ start: startDate, end: endDate }}
              dayHeaderFormat={{
                month: 'numeric',
                day: 'numeric',
              }}
              views={{
                timeGridFourDay: {
                  type: 'timeGridDay',
                  duration: { days: dateDiff ?? 1 },
                },
              }}
            />
          </CalendarContainer>
        </DialogContent>
      </Dialog>
    </InputBase>
  )
}

const CalendarContainer = styled.div`
  .fc-view {
    //overflow-x: auto;
  }

  .fc-view > table thead th:first-of-type {
    position: sticky !important;
    left: 0 !important;
    z-index: 2 !important;
  }

  .fc-timegrid-col.fc-day.fc-day-past {
    border: 1px solid #999999;
    background-color: #cccccc;
  }

  // theme start
  /* Styling for each event from Schedule */

  .fc-time-grid-event.fc-v-event.fc-event {
  }

  /* Bolds the name of the event and inherits the font size */

  .fc-event {
    font-size: inherit !important;
    font-weight: bold !important;
  }

  .fc-event-time,
  .fc-event-title {
    padding: 0 1px !important;
    white-space: normal !important;
  }

  /* Remove the header border from Schedule */

  .fc td,
  .fc th {
    border-width: 1px !important;
    padding: 0 !important;
    vertical-align: top !important;
  }

  .fc-day-today {
    background: #fff !important;
  }
`

export default TimeGridInput
