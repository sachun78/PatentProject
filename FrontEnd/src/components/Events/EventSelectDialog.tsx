import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRecoilState } from 'recoil'
import { eventSelectModalState, useCurrentEventState } from 'atoms/eventState'
import styled from '@emotion/styled'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useEventQuery from 'hooks/query/useEventQuery'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useNavigate } from 'react-router-dom'
import { format, isBefore } from 'date-fns'
import { useButtonStyle } from '../ProfileMenu/ProfileCardSave'
import IconControl from '../IconControl'

export type EventSelectModalProps = {}

function EventSelectDialog({}: EventSelectModalProps) {
  const [open, setOpen] = useRecoilState(eventSelectModalState)
  const { data: events } = useEventQuery()
  const [index, setIndex] = useState(0)
  const [animationState, setAnimationState] = useState(false)
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [, setEvent] = useCurrentEventState()
  const navigate = useNavigate()

  const buttonStyle = useButtonStyle()

  const eventParsed = useMemo(() => {
    if (!events) return []
    return events.filter((event) => {
      const end_date = new Date(event.end_date)
      return !isBefore(end_date, new Date())
    })
  }, [events])

  const onNextClick = useCallback(() => {
    if (!eventParsed) {
      return
    }
    if (eventParsed.length > index + 1) setIndex(index + 1)
    else setIndex(0)
    setAnimationState(true)
  }, [eventParsed, index])

  const onPrevClick = useCallback(() => {
    if (!eventParsed) return

    if (1 <= index) setIndex(index - 1)
    else setIndex(eventParsed.length - 1)
    setAnimationState(true)
  }, [eventParsed, index])

  const onSelectEvent = useCallback(() => {
    if (!eventParsed) {
      return
    }
    const { _id, title, start_date, end_date } = eventParsed[index]

    setEvent({ id: _id, title })
    setStartDate(new Date(start_date))
    setEndDate(new Date(end_date))
    navigate('/meeting/schedule/request')
  }, [eventParsed, index, setEndDate, setEvent, setStartDate])

  useEffect(() => {
    setAnimationState(false)
  }, [index])

  useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [])

  if (!eventParsed || eventParsed.length === 0) {
    return (
      <Dialog
        open={open}
        onClose={() => {
          setOpen((prev) => !prev)
        }}
        maxWidth={'xl'}
      >
        <DialogTitle>No Available Events</DialogTitle>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen((prev) => !prev)
      }}
      maxWidth={'xl'}
      PaperProps={{ sx: { width: '555px', borderRadius: '1rem' } }}
    >
      <DialogTitle
        sx={{ padding: '30px 30px 15px', color: '#910457', font: ' normal normal 800 18px/21px NanumSquareOTF' }}
      >
        Event Select
      </DialogTitle>
      <DialogContent sx={{ padding: '0 30px 25px' }}>
        <DialogContentText
          sx={{ marginBottom: '25px', color: '#6c6c6c', font: 'normal normal normal 14px/22px NanumSquareOTF' }}
        >
          To schedule a meeting with this person, please select an event.
        </DialogContentText>
        <SelectBody>
          <ArrowBlock onClick={onPrevClick}>
            <IconControl name={'left2'} />
          </ArrowBlock>
          <CardBlock>
            <h3>{eventParsed[index].title}</h3>
            <p>
              <b>Period</b> <span>{format(new Date(eventParsed[index].start_date), 'yyyy-MM-dd')}</span> ~{' '}
              <span>{format(new Date(eventParsed[index].end_date), 'yyyy-MM-dd')}</span>
            </p>
            <p>
              <b>Schedules</b> <span>{eventParsed[index].meeting_list.length}</span>
            </p>
          </CardBlock>
          <ArrowBlock onClick={onNextClick}>
            <IconControl name={'right2'} style={{ transform: 'rotate(180deg)' }} />
          </ArrowBlock>
        </SelectBody>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', padding: '0 0 30px' }}>
        <Button variant={'contained'} onClick={onSelectEvent} classes={buttonStyle} style={{ marginTop: 0 }}>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const SelectBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ArrowBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50px;

  &:hover {
    cursor: pointer;
    border: 1px solid #9c9c9c;
    box-shadow: 1px 1px 5px #00000029;
  }
`

const CardBlock = styled.div`
  padding: 1.25rem 1.5625rem;
  width: 24.6875rem;
  height: 7.75rem;
  border-radius: 1rem;
  background: #f2f2f2;
  box-shadow: 2px 5px 11px #00000029;

  h3 {
    color: #333;
    font-size: 1rem;
    font-weight: 800;
    margin-bottom: 1.25rem;
  }

  p {
    color: #6c6c6c;
    font-size: 1rem;
    display: flex;
  }

  b {
    font-weight: 800;
    min-width: 6.5625rem;
  }

  span {
    font-weight: normal;
  }

  p + p {
    margin-top: 0.625rem;
  }
`

export default EventSelectDialog
