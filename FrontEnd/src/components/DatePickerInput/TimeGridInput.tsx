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
      <Dialog onClose={handleClose} open={open} fullScreen scroll={'body'}>
        <DialogTitle>Set Meeting Date</DialogTitle>
        <DialogContent dividers={true} style={{ overflow: 'auto', maxHeight: '90%' }}>
          <DialogContentText>
            Drag and select Start time and end time. You can select only validate time
          </DialogContentText>
          <CalendarContainer style={{ minWidth: '100%' }}>
            <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
              initialView="timeGridFourDay"
              selectable={true}
              slotEventOverlap={false}
              allDaySlot={false}
              initialDate={startDate}
              selectOverlap={false}
              headerToolbar={false}
              height={800}
              select={(info) => {
                timeChange(info.start, info.end)
                dateChange(info.start)
                info.view.calendar.unselect()
                setOpen(false)
              }}
              events={reserve_event}
              selectAllow={(selectInfo) => {
                let startDate = selectInfo.start
                let endDate = selectInfo.end
                endDate.setSeconds(endDate.getSeconds() - 1) // allow full day selection
                const diff = differenceInCalendarDays(startDate, new Date())
                console.log(diff, startDate)
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
              visibleRange={{ start: startDate }}
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
  height: 100%;

  .fc-view {
    overflow-x: auto;
    min-width: 100%;
  }

  .fc-view > table {
    min-width: 100%;
    width: 1440px;
    border-radius: 1rem;
    position: relative;
  }

  .fc-time-grid .fc-slats {
    z-index: 4;
    pointer-events: none;
  }

  .fc-scroller.fc-time-grid-container {
    overflow: initial !important;
  }

  .fc-axis {
    position: sticky !important;
    left: 0 !important;
  }

  .fc-timegrid-col.fc-day.fc-day-past {
    border: 1px solid #999999;
    background-color: #cccccc;
  }

  // theme start
  /* Styling for each event from Schedule */

  .fc-time-grid-event.fc-v-event.fc-event {
    border-radius: 4px;
    border: none;
    padding: 5px;
    opacity: 0.65;
    left: 5% !important;
    right: 5% !important;
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
    border-style: none !important;
    border-width: 1px !important;
    padding: 0 !important;
    vertical-align: top !important;
    border-radius: 4px !important;
  }

  /* Inherits background for each event from Schedule. */

  .fc-event .fc-bg {
    z-index: 1 !important;
    background: inherit !important;
    opacity: 0.25 !important;
  }

  /* Normal font weight for the time in each event */

  .fc-time-grid-event .fc-time {
    font-weight: normal !important;
  }

  /* Apply same opacity to all day events */

  .fc-ltr .fc-h-event.fc-not-end,
  .fc-rtl .fc-h-event.fc-not-start {
    opacity: 0.65 !important;
    margin-left: 12px !important;
    padding: 5px !important;
  }

  /* Apply same opacity to all day events */

  .fc-day-grid-event.fc-h-event.fc-event.fc-not-start.fc-end {
    opacity: 0.65 !important;
    margin-left: 12px !important;
    padding: 5px !important;
  }
`

export default TimeGridInput
