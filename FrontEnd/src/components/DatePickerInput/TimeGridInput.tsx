import { useCallback, useRef, useState } from 'react'
import InputBase from '../InputBase/InputBase'
import useOnClickOutside from 'use-onclickoutside'
import { textStyle } from './TimePickerInput'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import styled from '@emotion/styled'

export type TimeGridInputProps = {
  time: Date
}

function TimeGridInput({ time }: TimeGridInputProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<FullCalendar | null>(null)
  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  useOnClickOutside(ref, onClose)

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
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      {open && (
        <CalendarContainer>
          <FullCalendar
            ref={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
            initialView="timeGridFourDay"
            selectable={true}
            slotEventOverlap={false}
            allDaySlot={false}
            initialDate={'2022-01-01'}
            selectOverlap={false}
            headerToolbar={false}
            events={[
              {
                id: '1',
                title: 'reserved',
                start: '2022-01-01T00:00:00',
                end: '2022-01-01T01:00:00',
              },
            ]}
            selectAllow={(selectInfo) => {
              let startDate = selectInfo.start
              let endDate = selectInfo.end
              endDate.setSeconds(endDate.getSeconds() - 1) // allow full day selection
              return startDate.getDate() === endDate.getDate()
            }}
            visibleRange={{
              start: new Date('2022-01-01'),
              end: new Date('2022-04-04'),
            }}
            dayHeaderFormat={{
              month: 'numeric',
              day: 'numeric',
              weekday: 'short',
            }}
            views={{
              timeGridFourDay: {
                type: 'timeGridDay',
                duration: { days: 20 },
              },
            }}
          />
        </CalendarContainer>
      )}
    </InputBase>
  )
}

const CalendarContainer = styled.div`
  position: absolute;
  z-index: 99;
  background: #fff;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;

  .fc-view {
    overflow-x: auto;
  }

  .fc-view > table {
    min-width: 100%;
    width: 2000px;
  }

  .fc-time-grid .fc-slats {
    z-index: 4;
    pointer-events: none;
  }

  .fc-scroller.fc-time-grid-container {
    overflow: initial !important;
  }

  .fc-axis {
    position: sticky;
    left: 0;
    background: white;
  }
`

export default TimeGridInput
