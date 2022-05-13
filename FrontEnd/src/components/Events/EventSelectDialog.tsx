import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRecoilState } from 'recoil'
import { eventSelectModalState, useCurrentEventState } from 'atoms/eventState'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import EventCard from './EventCard'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useEventQuery from 'hooks/query/useEventQuery'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useNavigate } from 'react-router-dom'
import { isBefore } from 'date-fns'

export type EventSelectModalProps = {}

function EventSelectDialog({}: EventSelectModalProps) {
  const [open, setOpen] = useRecoilState(eventSelectModalState)
  const { data: events, isLoading } = useEventQuery()
  const [index, setIndex] = useState(0)
  const [animationState, setAnimationState] = useState(false)
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [, setEvent] = useCurrentEventState()
  const navigate = useNavigate()

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
    >
      <DialogTitle>Event Select</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To schedule a meeting with this person, please select an event and click the next button.
        </DialogContentText>
        <SelectBody>
          <div onClick={onPrevClick}>{'<'}</div>
          <div css={animationStyle(animationState)}>
            <EventCard
              title={eventParsed[index].title}
              id={eventParsed[index]._id}
              count={eventParsed[index].meeting_list.length}
              endDate={new Date(eventParsed[index].end_date)}
              startDate={new Date(eventParsed[index].start_date)}
              cardView
            />
          </div>
          <div onClick={onNextClick}>{'>'}</div>
        </SelectBody>
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} onClick={onSelectEvent}>
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

const bounce = keyframes`
  0% {
    transform: translateY(-10%);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
`

const animationStyle = (state: boolean) => css`
  ${!state
    ? css`
        animation: ${bounce} 0.4s ease-in forwards;
      `
    : null}
`
export default EventSelectDialog
