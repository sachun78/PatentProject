import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle
} from '@mui/material'
import { useRecoilState } from 'recoil'
import { eventSelectModalState, useCurrentEventState } from 'atoms/eventState'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import EventCard from './EventCard'
import { useCallback, useEffect, useState } from 'react'
import useEventQuery from 'hooks/query/useEventQuery'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useNavigate } from 'react-router-dom'

export type EventSelectModalProps = {}

function EventSelectDialog({}: EventSelectModalProps) {
  const [open, setOpen] = useRecoilState(eventSelectModalState)
  const { data: events, isLoading } = useEventQuery(1)
  const [index, setIndex] = useState(0)
  const [animationState, setAnimationState] = useState(false)
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [, setEvent] = useCurrentEventState()
  const navigate = useNavigate()

  const onNextClick = useCallback(() => {
    if (!events) {
      return
    }
    if (events.length > index + 1)
      setIndex(index + 1)
    else
      setIndex(0)
    setAnimationState(true)
  }, [events, index])

  const onPrevClick = useCallback(() => {
    if (!events)
      return

    if (1 <= index)
      setIndex(index - 1)
    else
      setIndex(events.length - 1)
    setAnimationState(true)
  }, [events, index])

  const onSelectEvent = useCallback(() => {
    if (!events) {
      return
    }
    const { id, title, start_date, end_date } = events[index]

    setEvent({ id, title })
    setStartDate(new Date(start_date))
    setEndDate(new Date(end_date))
    navigate('/membership/schedule/request')
  }, [events, index, setEndDate, setEvent, setStartDate])

  useEffect(() => {
    setAnimationState(false)
  }, [index])

  useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [])

  if (!events) {
    return null
  }

  return <Dialog open={open} onClose={() => {
    setOpen(prev => !prev)
  }} maxWidth={'xl'}>
    <DialogTitle>Event Select</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To scheduling to this people, please select your event here. and click the next button.
      </DialogContentText>
      <SelectBody>
        <div onClick={onPrevClick}>{'<'}</div>
        <div css={animationStyle(animationState)}>
          <EventCard title={events[index].title} id={events[index].id} count={events[index].meeting_list.length}
                     endDate={events[index].end_date} startDate={events[index].start_date} cardView />
        </div>
        <div onClick={onNextClick}>{'>'}</div>
      </SelectBody>
    </DialogContent>
    <DialogActions>
      <Button onClick={onSelectEvent}>Next</Button>
    </DialogActions>
  </Dialog>
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
  ${!state ? css`animation: ${bounce} 0.4s ease-in forwards;`
          : null}
`
export default EventSelectDialog
