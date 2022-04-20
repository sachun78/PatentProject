import AddIcon from '@mui/icons-material/Add'
import {
  Alert,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material'
import IconControl from 'components/IconControl/IconControl'
import useEventQuery from 'hooks/query/useEventQuery'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useEventModal } from 'hooks/useEventTitle'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { eventSwitchState } from 'atoms/memberShipTabState'
import EventCalendar from './EventCalendar'
import EventCard from './EventCard'
import EventModal from './EventModal'
import { noScheduleStyle, wrapper } from './styles'
import { labelStyle } from '../Schedules/styles'
import { formatDistanceToNow } from 'date-fns'

type EventsProps = {}

function Events({}: EventsProps) {
  const { data, isLoading } = useEventQuery(1)
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [checked, setChecked] = useRecoilState(eventSwitchState)
  const [outdateChecked, setOutdateChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const onOutdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOutdateChecked((prev) => !prev)
  }

  if (isLoading)
    return (
      <div css={noScheduleStyle}>
        <IconControl name={'welcome'} />
        <CircularProgress />
        <div>Loading...</div>
      </div>
    )

  if (data && data.length === 0) {
    return (
      <>
        <div css={noScheduleStyle}>
          <IconControl name={'welcome'} />
          <div>There's no event created.</div>
          <div>Please make a new event.</div>
        </div>
        <Fab
          sx={{ position: 'fixed', bottom: 60, right: 32 }}
          color="primary"
          onClick={() => {
            setOpen(true)
            setEdit(false)
            setStartDate(new Date())
            setEndDate(new Date())
          }}
        >
          <AddIcon />
        </Fab>
        <EventModal />
      </>
    )
  }

  return (
    <>
      <FormGroup row={true} style={{ marginBottom: '20px' }}>
        <Alert severity="info" style={{ alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                name={'checked'}
                centerRipple={true}
              />
            }
            label={checked ? 'CALENDAR' : 'CARD'}
            css={labelStyle}
          />
          {!checked && (
            <FormControlLabel
              control={
                <Checkbox checked={outdateChecked} onChange={onOutdateChange} />
              }
              label="Outdated"
            />
          )}
        </Alert>
      </FormGroup>
      {checked ? (
        <EventCalendar />
      ) : (
        <div css={wrapper}>
          {data?.map((event) => {
            const dist = formatDistanceToNow(new Date(event.end_date), {
              addSuffix: true,
            })
            if (!outdateChecked && dist.includes('ago')) {
              return null
            }
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                startDate={event.start_date}
                endDate={event.end_date}
                count={event.meeting_list.length}
                disabled={dist.includes('ago')}
              />
            )
          })}
        </div>
      )}

      <Fab
        sx={{ position: 'fixed', bottom: 103, right: 32, zIndex: 10 }}
        color="primary"
        onClick={() => {
          setOpen(true)
          setEdit(false)
          setStartDate(new Date())
          setEndDate(new Date())
        }}
      >
        <AddIcon />
      </Fab>
      <EventModal />
    </>
  )
}

export default Events
