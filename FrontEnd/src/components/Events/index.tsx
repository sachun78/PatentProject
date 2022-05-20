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
import { isBefore } from 'date-fns'
import { useCurrentEventState } from 'atoms/eventState'
import EventTable from './EventTable'
import { css } from '@emotion/react'

type EventsProps = {}

function Events({}: EventsProps) {
  const { data, isLoading } = useEventQuery({ staleTime: 2000 })
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [checked, setChecked] = useRecoilState(eventSwitchState)
  const [tableChecked, setTableChecked] = useState(false)
  const [, setEvent] = useCurrentEventState()

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev)
  }, [setChecked])
  const onTableViewChange = useCallback(() => {
    setTableChecked((prev) => !prev)
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
      <FormGroup
        row={true}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          maxWidth: '76.25rem',
          position: 'relative',
          top: '-44px',
        }}
        css={groupStyle}
      >
        {!checked && (
          <ToggleButton
            value="check"
            selected={!tableChecked}
            onChange={onTableViewChange}
            color={'primary'}
            sx={{
              borderRadius: '50px',
              border: '1px solid #910457',
              background: tableChecked ? '' : '#910457 !important',
            }}
          >
            {tableChecked ? <IconControl name={'card'} /> : <IconControl name={'cardSelect'} />}
          </ToggleButton>
        )}
        {!checked && (
          <ToggleButton
            value="check"
            selected={tableChecked}
            onChange={onTableViewChange}
            color={'primary'}
            sx={{
              borderRadius: '50px',
              border: '1px solid #910457',
              background: !tableChecked ? '' : '#910457 !important',
            }}
          >
            {!tableChecked ? <IconControl name={'list'} /> : <IconControl name={'listSelect'} />}
          </ToggleButton>
        )}
        <ToggleButton
          value="check"
          selected={checked}
          onChange={handleChange}
          color={'primary'}
          sx={{
            borderRadius: '50px',
            border: '1px solid #910457',
            background: checked ? '#910457 !important' : '',
          }}
        >
          {checked ? <IconControl name={'dateSelect'} /> : <IconControl name={'date'} />}
        </ToggleButton>
      </FormGroup>
      {checked ? (
        <EventCalendar />
      ) : tableChecked ? (
        <EventTable events={data} />
      ) : (
        <div css={wrapper}>
          {data.map((event) => {
            if (isBefore(new Date(event.end_date), new Date())) {
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

const groupStyle = css`
  button + button {
    margin-left: 1.25rem;
  }
`

export default Events
