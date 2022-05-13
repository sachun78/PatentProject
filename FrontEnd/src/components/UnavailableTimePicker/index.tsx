import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CalendarContainer } from './styles'
import { useMutation } from 'react-query'
import { updateEventRestrictedTime } from 'lib/api/event/updateEvent'

export type UnavailableTimePickerProps = {
  id: string
  startDate: Date
  endDate: Date
  unavailableList: Array<{ start: Date; end: Date }>
}

function UnavailableTimePicker({ id, startDate, endDate, unavailableList }: UnavailableTimePickerProps) {
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

  const events = useMemo(() => {
    return currentUnavailableList.map((item) => {
      return {
        title: 'Unavailable',
        start: item.start,
        end: item.end,
        color: '#ff0000',
        rendering: 'background',
      }
    })
  }, [currentUnavailableList])

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
          <Button
            variant={'contained'}
            disabled={editUnavailableTime.isLoading}
            onClick={() => editUnavailableTime.mutate({ id, restricted_time: currentUnavailableList })}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UnavailableTimePicker
