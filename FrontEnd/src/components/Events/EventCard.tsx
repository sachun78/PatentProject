import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentEventState } from 'atoms/eventState'
import { useEventModal } from 'hooks/useEventTitle'
import useDateRangeHook from 'hooks/useDateRangeHook'
import React, { memo, MouseEvent, useCallback } from 'react'
import { useMeetingReqUser } from 'atoms/meetingReqState'
import { FiEdit } from 'react-icons/fi'
import { periodString } from 'lib/stringParser'
import { animated, useSpring } from 'react-spring'

export type EventCardProps = {
  id: string
  title: string
  startDate: Date
  endDate: Date
  count: number
  disabled?: boolean
}

function EventCard({ title, startDate, endDate, id, count, disabled = false }: EventCardProps) {
  const navigate = useNavigate()
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [, setEvent] = useCurrentEventState()
  const [, setMeetuser] = useMeetingReqUser()

  const springProps = useSpring({
    delay: 100,
    transform: 'translateX(0px)',
    from: {
      transform: 'translateX(100%)',
    },
  })

  const handleEdit = useCallback(
    (e: MouseEvent<SVGElement>) => {
      e.stopPropagation()
      setOpen(true)
      setEdit(true)
      setEvent({ id, title })
      setStartDate(new Date(startDate))
      setEndDate(new Date(endDate))
    },
    [endDate, id, setEdit, setEndDate, setEvent, setOpen, setStartDate, startDate, title]
  )

  const onCreateSchedule = useCallback(() => {
    setEvent({ id, title })
    setStartDate(new Date(startDate))
    setEndDate(new Date(endDate))
    setMeetuser('')
  }, [endDate, id, setEndDate, setEvent, setMeetuser, setStartDate, startDate, title])

  return (
    <animated.div css={wrapper} style={{ ...springProps }}>
      <div
        className={'inner'}
        onClick={() => {
          navigate(`/meeting/event/${id}`)
        }}
      >
        <div css={eventHeaderStyle}>
          <span className="event-card-header">{title}</span>
          <div className={'toolbar'}>
            <FiEdit onClick={!disabled ? handleEdit : undefined} />
          </div>
        </div>
        <div css={contentStyle}>
          <span>
            Period : <b>{periodString(startDate.toISOString(), endDate.toISOString())}</b>
          </span>
          <span>Schedules : {count}</span>
        </div>
      </div>
      <div css={buttonStyle(disabled)} onClick={!disabled ? onCreateSchedule : undefined} aria-disabled={true}>
        <Link to={!disabled ? '/meeting/schedule/request' : '#'}>
          <div className="text">+ New Schedule</div>
        </Link>
      </div>
    </animated.div>
  )
}

export default memo(EventCard)

const wrapper = css`
  width: 37.5rem;
  min-width: 37.5rem;
  margin-bottom: 2.5rem;
  margin-right: 1.25rem;
  height: 13.5625rem;
  padding: 1.875rem;
  box-shadow: 2px 5px 11px #00000029;

  border-radius: 1rem;

  background: #fff;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    box-shadow: none;

    .event-card-header {
      color: ${brandColor};
    }

    .toolbar {
      visibility: visible;
    }
  }
`

const buttonStyle = (disabled: boolean) => css`
  ${!disabled
    ? css`
        background-color: ${brandColor};
      `
    : css`
        background-color: #9c9c9c;
      `}

  margin: 2.6875rem -1.875rem 0;

  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;

  .text {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    font: normal normal normal 16px NanumSquareOTF;
    line-height: 1.125;
    color: #fff;
  }

  a {
    text-decoration: none;
  }
`

const eventHeaderStyle = css`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  opacity: 1;

  .event-card-header {
    font: normal normal 800 18px NanumSquareOTF;
    color: #333333;
    line-height: 1.166666667;
  }

  .toolbar {
    visibility: hidden;

    svg {
      font-size: 1.25rem;
    }

    svg + svg {
      margin-left: 0.625rem;
    }
  }
`
const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  font: normal normal normal 18px NanumSquareOTF;
  color: #6c6c6c;

  b {
    font-weight: 800;
    color: #6c6c6c;
  }

  span {
    margin-bottom: 1.375rem;
  }
`
