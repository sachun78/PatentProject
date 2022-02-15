import { css } from '@emotion/react'
import ViewBase from '../ViewBase'
import React from 'react'
import palette from '../../lib/palette'
import CreateEventModal from './CreateEventModal'
import { useEventModal } from '../../hooks/useEventTitle'
import EventCard from './EventCard'

type EventViewProps = {}

export default function Events({}: EventViewProps) {
  const { setModalState } = useEventModal()
  const handleClick = () => {
    setModalState(true)
  }

  return (
    <>
      <CreateEventModal />
      <ViewBase title='EVENT'>
        <div css={wrapper}>
          <EventCard title='2022 INTA' />
          <EventCard title='2022INTA' />
          <EventCard title='2022INTA' />
          <EventCard title='2022INTA' />
        </div>
      </ViewBase>
      <button css={createEventButton} onClick={handleClick}>이벤트 생성</button>
    </>
  )
}

const wrapper = css`
  height: 100%;
  flex: 1;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  min-width: 60rem;
`

const createEventButton = css`
  position: fixed;
  bottom: 2rem;
  right: 4rem;
  background: ${palette.blue[200]};
  border: none;
  border-radius: 999rem;
  width: 9rem;
  height: 9rem;
  color: #fff;
  user-select: none;

  &:hover {
    background: ${palette.blue[500]};
    font-weight: 400;
    cursor: pointer;
  }
`
