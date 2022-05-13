import AddIcon from '@mui/icons-material/Add'
import { Button, CircularProgress, Fab, FormGroup, ToggleButton } from '@mui/material'
import IconControl from 'components/IconControl/IconControl'
import useEventQuery from 'hooks/query/useEventQuery'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useEventModal } from 'hooks/useEventTitle'
import React, { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import { eventSwitchState } from 'atoms/memberShipTabState'
import EventCalendar from './EventCalendar'
import EventCard from './EventCard'
import EventModal from './EventModal'
import { noScheduleStyle, wrapper } from './styles'
import { formatDistanceToNow } from 'date-fns'
import { useCurrentEventState } from 'atoms/eventState'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ContrastIcon from '@mui/icons-material/Contrast'

type EventsProps = {}

function Events({}: EventsProps) {
  const { data, isLoading } = useEventQuery({ staleTime: 2000 })
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [checked, setChecked] = useRecoilState(eventSwitchState)
  const [outdateChecked, setOutdateChecked] = useState(false)
  const [, setEvent] = useCurrentEventState()

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev)
  }, [setChecked])
  const onOutdateChange = useCallback(() => {
    setOutdateChecked((prev) => !prev)
  }, [])
  const onClickNewEvent = useCallback(() => {
    setOpen(true)
    setEdit(false)
    setEvent({ id: '', title: '' })

    let temp_date = new Date()
    temp_date.setHours(0, 0, 0, 0)
    setStartDate(temp_date)
    temp_date = new Date()
    temp_date.setHours(23, 59, 0, 0)
    setEndDate(temp_date)
  }, [setEdit, setEndDate, setEvent, setOpen, setStartDate])

  if (isLoading)
    return (
      <div css={noScheduleStyle}>
        <IconControl name={'welcome'} />
        <CircularProgress />
        <div>Loading...</div>
      </div>
    )

  if (!data || data.length === 0) {
    return (
      <>
        <div css={noScheduleStyle}>
          <IconControl name={'welcome'} />
          <div>No events were generated.</div>
          <br />
          <Button variant={'contained'} onClick={onClickNewEvent} style={{ marginLeft: '1rem' }}>
            + Create new event
          </Button>
        </div>
        <EventModal />
      </>
    )
  }

  return (
    <>
      <FormGroup row={true} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <ToggleButton value="check" selected={checked} onChange={handleChange} color={'primary'}>
          <CalendarTodayIcon />
        </ToggleButton>
        {!checked && (
          <ToggleButton value="check" selected={outdateChecked} onChange={onOutdateChange} color={'primary'}>
            <ContrastIcon />
          </ToggleButton>
        )}
      </FormGroup>
      {checked ? (
        <EventCalendar />
      ) : (
        <div css={wrapper}>
          {[...data].reverse().map((event) => {
            const dist = formatDistanceToNow(new Date(event.end_date), {
              addSuffix: true,
            })
            if (!outdateChecked && dist.includes('ago')) {
              return null
            }
            return (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                startDate={new Date(event.start_date)}
                endDate={new Date(event.end_date)}
                count={event.meeting_list.length}
                disabled={dist.includes('ago')}
              />
            )
          })}
        </div>
      )}

      <Fab sx={{ position: 'fixed', bottom: 103, right: '2rem', zIndex: 10 }} color="primary" onClick={onClickNewEvent}>
        <AddIcon />
      </Fab>
      <EventModal />
    </>
  )
}

export default Events
