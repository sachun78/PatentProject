import { useCallback, useMemo, useRef, useState } from 'react'
import InputBase from '../InputBase/InputBase'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { differenceInCalendarDays, formatDistanceToNow } from 'date-fns'

import styled from '@emotion/styled'
import { brandColor } from 'lib/palette'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import useToggle from 'hooks/useToggle'
import { css } from '@emotion/react'
import { IMeeting } from 'lib/api/types'

export type TimeGridInputProps = {
  startTime: Date | null
  endTime: Date | null
  startDate: Date
  endDate: Date
  date: Date
  timeChange: (start: Date, end: Date) => void
  dateChange: (date: Date) => void
  timeEvent: Array<{ startTime: string; endTime: string; date: string }> | IMeeting[]
  unavailables: Array<{ start: string; end: string }>
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
  unavailables,
}: TimeGridInputProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<FullCalendar | null>(null)
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const [isHour, onToggleUnit] = useToggle(true)
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const reserve_event = useMemo(() => {
    const unavailableEvent = unavailables.map((unavailable) => ({
      title: 'unavailable',
      start: new Date(unavailable.start),
      end: new Date(unavailable.end),
      backgroundColor: '#ff0000',
      borderColor: '#f5f5f5',
      textColor: '#f5f5f5',
      editable: false,
      display: 'background',
    }))
    const formatTimeEvents = timeEvent.map((event) => {
      const date = new Date(event.date)
      const start = new Date(event.startTime)
      start.setFullYear(date.getFullYear())
      start.setDate(date.getDate())
      const end = new Date(event.endTime)
      end.setFullYear(date.getFullYear())
      end.setDate(date.getDate())

      return {
        title: 'reserved',
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: false,
        backgroundColor: brandColor,
      }
    })
    return [...unavailableEvent, ...formatTimeEvents]
  }, [timeEvent, unavailables])

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
          ? `${date.toDateString()}, ${startTime?.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })} ~ ${endTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`
          : 'Select Date'}
      </div>
      <Dialog onClose={handleClose} open={open} fullScreen>
        <DialogTitle
          sx={{ padding: '30px 30px 15px', color: '#910457', font: 'normal normal 800 18px/21px NanumSquareOTF' }}
        >
          Set Meeting Date
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText></DialogContentText>
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
                left: '',
                center: 'prev title next',
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
              slotDuration={isHour ? '01:00:00' : '00:30:00'}
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
            />
          </CalendarContainer>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={1} alignItems="center">
            <div css={rectangleStyle('#ccc')}></div>
            unavailable
            <div css={rectangleStyle('#fff')}></div>
            available
          </Stack>
          <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>30 minute</Typography>
            <Switch value={isHour} defaultChecked onChange={onToggleUnit} />
            <Typography>1 hour</Typography>
          </Stack>
        </DialogActions>
      </Dialog>
    </InputBase>
  )
}

const rectangleStyle = (color: string) => css`
  width: 20px;
  height: 20px;
  background: ${color};
  margin-right: 4px !important;
  border: 1px solid #ddd;
`

const CalendarContainer = styled.div`
  .fc-toolbar-chunk {
    display: flex !important;
  }

  .fc-view > table thead th:first-of-type {
    position: sticky !important;
    left: 0 !important;
    z-index: 2 !important;
  }

  .fc-timegrid-col.fc-day.fc-day-past {
    border: 1px solid #999999;
    background-color: rgba(208, 208, 208, 0.3);
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

  .fc-next-button,
  .fc-prev-button {
    background: ${brandColor} !important;
  }
`

export const textStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;

  color: #6c6c6c;

  &:focus-visible {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  }
`

export default TimeGridInput
