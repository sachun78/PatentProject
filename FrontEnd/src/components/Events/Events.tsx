import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'
import EventModal from './EventModal'
import { useEventModal } from '../../hooks/useEventTitle'
import EventCard from './EventCard'
import useEventQuery from '../../hooks/query/useEventQuery'

type EventViewProps = {}

export default function Events({}: EventViewProps) {
  const { setModalState } = useEventModal()
  const { data } = useEventQuery(1)

  return (
    <>
      <EventModal />
      <div css={wrapper}>
        {data?.map((event) => {
          return <EventCard key={event.id} id={event.id} title={event.title} startDate={event.start_date}
                            endDate={event.end_date} count={event.meeting_list.length} />
        })}
      </div>
      <button css={createEventButton} onClick={() => setModalState(true)}>새로운 이벤트</button>
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
  background: ${palette.cyan[500]};
  border: none;
  border-radius: 999rem;
  padding: 2.5rem;
  color: #fff;
  user-select: none;

  &:hover {
    background: ${palette.cyan[400]};
    font-weight: 400;
    cursor: pointer;
  }
`
