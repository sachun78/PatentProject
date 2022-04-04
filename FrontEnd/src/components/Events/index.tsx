import React, { useState } from 'react'
import EventModal from './EventModal'
import EventCard from './EventCard'
import useEventQuery from 'hooks/query/useEventQuery'
import IconControl from 'components/IconControl/IconControl'
import { CircularProgress, Fab, FormControlLabel, Switch } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useEventModal } from 'hooks/useEventTitle'
import useDateRangeHook from 'hooks/useDateRangeHook'
import EventCalendar from './EventCalendar'
import { noScheduleStyle, wrapper } from './styles'

type EventViewProps = {}

function Events({}: EventViewProps) {
  const { data, isLoading } = useEventQuery(1)
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  if (isLoading)
    return <div css={noScheduleStyle}>
      <IconControl name={'welcome'} />
      <CircularProgress />
      <div>Loading...</div>
    </div>

  if (data && data.length === 0) {
    return <>
      <div css={noScheduleStyle}>
        <IconControl name={'welcome'} />
        <div>There's no event created.</div>
        <div>Please make a new event.</div>
      </div>
      <Fab sx={{ position: 'fixed', bottom: 60, right: 32 }}
           color='primary'
           onClick={() => {
             setOpen(true)
             setEdit(false)
             setStartDate(new Date())
             setEndDate(new Date())
           }}>
        <AddIcon />
      </Fab>
      <EventModal />
    </>
  }

  return <>
    <FormControlLabel control={<Switch checked={checked}
                                       onChange={handleChange}
                                       name={'checked'}
                                       inputProps={{ 'aria-label': 'event-calendar' }} />}
                      label={checked ? 'CALENDAR' : 'CARD'} />
    {checked
      ? <EventCalendar />
      : <div css={wrapper}>
        {data?.map((event) =>
          <EventCard
            key={event.id} id={event.id} title={event.title}
            startDate={event.start_date} endDate={event.end_date}
            count={event.meeting_list.length} />)}
      </div>}

    <Fab sx={{ position: 'fixed', bottom: 60, right: 32 }}
         color='primary'
         onClick={() => {
           setOpen(true)
           setEdit(false)
           setStartDate(new Date())
           setEndDate(new Date())
         }}>
      <AddIcon />
    </Fab>
    <EventModal />
  </>
}

export default Events
