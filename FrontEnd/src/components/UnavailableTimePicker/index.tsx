import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CalendarContainer } from './styles'
import { useMutation } from 'react-query'
import { updateEventRestrictedTime } from 'lib/api/event/updateEvent'
import { IMeeting } from 'lib/api/types'
import { brandColor } from 'lib/palette'

export type UnavailableTimePickerProps = {
  id: string
  startDate: Date
  endDate: Date
  unavailableList: Array<{ start: Date; end: Date }>
  reserveEvent: IMeeting[]
}

function UnavailableTimePicker({ id, startDate, endDate, unavailableList, reserveEvent }: UnavailableTimePickerProps) {
  const [open, setOpen] = useState(false)
  const [currentUnavailableList, setCurrentUnavailableList] = useState(unavailableList)
  const calendarRef = useRef<FullCalendar | null>(null)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const editUnavailableTime = useMutation(
    (editData: { id: string; restricted_time: { start: Date; end: Date }[] }) => {
      return updateEventRestrictedTime(editData.id, editData.restricted_time)
    },
    {
      onSuccess: () => {
        handleClose()
      },
    }
  )
  const onSave = useCallback(() => {
    editUnavailableTime.mutate({ id, restricted_time: currentUnavailableList })
  }, [currentUnavailableList, editUnavailableTime, id])

  const events = useMemo(() => {
    const unavailableEvent = currentUnavailableList.map((unavailable) => ({
      title: 'unavailable',
      start: new Date(unavailable.start),
      end: new Date(unavailable.end),
      backgroundColor: '#ff0000',
      borderColor: '#f5f5f5',
      textColor: '#f5f5f5',
      editable: false,
      display: 'background',
    }))

    const formatTimeEvents = reserveEvent
      .filter((event) => event.status === 'confirm')
      .map((event) => {
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
  }, [currentUnavailableList, reserveEvent])

  return (
    <>
      <Button
        variant={'contained'}
        onClick={handleOpen}
        tabIndex={0}
        style={{
          position: 'relative',
          marginBottom: '1.875rem',
          width: '20rem',
        }}
      >
        Select Unavailable Time
      </Button>
      <Dialog onClose={handleClose} open={open} fullScreen>
        <DialogTitle>Set Meeting Date</DialogTitle>
        <DialogContent dividers={true}>
          <CalendarContainer>
            <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
              initialView="timeGridWeek"
              events={events}
              selectable={true}
              slotEventOverlap={false}
              allDaySlot={false}
              initialDate={new Date(endDate)}
              selectOverlap={false}
              slotDuration={'01:00:00'}
              select={(info) => {
                setCurrentUnavailableList([
                  ...currentUnavailableList,
                  {
                    start: info.start,
                    end: info.end,
                  },
                ])
              }}
              eventClick={(info) => {
                setCurrentUnavailableList(
                  currentUnavailableList.filter((item) => {
                    return new Date(item.start).getTime() !== info.event.start?.getTime()
                  })
                )
                info.event.remove()
              }}
              headerToolbar={{
                left: 'prev next',
                center: 'title',
                right: '',
              }}
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }}
              stickyHeaderDates={true}
              contentHeight={'auto'}
              height={'auto'}
              stickyFooterScrollbar={true}
              validRange={{ start: startDate, end: endDate }}
              dayHeaderFormat={{
                month: 'numeric',
                day: 'numeric',
              }}
            />
          </CalendarContainer>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} disabled={editUnavailableTime.isLoading} onClick={onSave}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UnavailableTimePicker
