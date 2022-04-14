import { Box, Button, Modal, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import { eventSelectModalState } from 'atoms/eventState'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import EventCard from './EventCard'
import { useCallback, useState } from 'react'
import useEventQuery from 'hooks/query/useEventQuery'

export type EventSelectModalProps = {}

function EventSelectModal({}: EventSelectModalProps) {
  const [open, setOpen] = useRecoilState(eventSelectModalState)
  const { data: events, isLoading } = useEventQuery(1)
  const [index, setIndex] = useState(0)

  const onNextClick = useCallback(() => {
    if (!events) {
      return
    }
    if (events.length > index + 1)
      setIndex(index + 1)
    else
      setIndex(0)
  }, [events, index])

  const onPrevClick = useCallback(() => {
    if (!events) {
      return
    }
    if (1 <= index)
      setIndex(index - 1)
    else
      setIndex(events.length - 1)
  }, [events, index])

  if (!events) {
    return null
  }

  return <Modal open={open} onClose={() => {
    setOpen(prev => !prev)
  }}>
    <Box css={eventSelectModalStyle}>
      <Typography variant={'h4'}>
        Event Select
      </Typography>
      <SelectBody>
        <div onClick={onPrevClick}>{'<'}</div>
        <EventCard title={events[index].title} id={events[index].id} count={events[index].meeting_list.length}
                   endDate={events[index].end_date} startDate={events[index].start_date} cardView />
        <div onClick={onNextClick}>{'>'}</div>
      </SelectBody>
      <Button>Next</Button>
    </Box>
  </Modal>
}

const eventSelectModalStyle = css`
  width: 50%;
  background: linear-gradient(45deg, #f1f1f1 45%, #fff 100%);
  position: absolute;
  left: 25%;
  top: 25%;
  padding: 2rem;
  border-radius: 1rem;
`
const SelectBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`

export default EventSelectModal
