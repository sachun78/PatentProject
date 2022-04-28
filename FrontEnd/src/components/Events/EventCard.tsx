import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentEventState } from 'atoms/eventState'
import { useEventModal } from 'hooks/useEventTitle'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { memo, useCallback } from 'react'
import media from 'lib/styles/media'
import { useMeetingReqUser } from 'atoms/meetingReqState'
import { FiEdit } from 'react-icons/fi'
import { periodString } from 'lib/stringParser'

export type EventCardProps = {
  id: string
  title: string
  startDate: string
  endDate: string
  count: number
  cardView?: boolean
  disabled?: boolean
}

function EventCard({ title, startDate, endDate, id, count, cardView = false, disabled = false }: EventCardProps) {
  const navigate = useNavigate()
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [, setEvent] = useCurrentEventState()
  const [, setMeetuser] = useMeetingReqUser()

  const handleEdit = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
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
    <div css={wrapper(cardView)}>
      <div
        className={'inner'}
        onClick={() => {
          if (!cardView) {
            navigate(`/meeting/event/${id}`)
          }
        }}
      >
        <div css={eventHeaderStyle}>
          <span className="event-card-header">{title}</span>
          {!cardView && (
            <div className={'toolbar'}>
              <FiEdit onClick={!disabled ? handleEdit : undefined} />
            </div>
          )}
        </div>
        <div css={contentStyle}>
          <span>
            Period: <b>{periodString(startDate, endDate)}</b>
          </span>
          <span>
            Schedule(s): <b>{count}</b>
          </span>
        </div>
      </div>
      {!cardView && (
        <div css={buttonStyle(disabled)} onClick={!disabled ? onCreateSchedule : undefined} aria-disabled={true}>
          <Link to={!disabled ? '/meeting/schedule/request' : '#'}>
            <div className="text">+ New Schedule</div>
          </Link>
        </div>
      )}
    </div>
  )
}

const wrapper = (maxWidth: boolean) => css`
  ${maxWidth
    ? css`
        width: 37.5rem;
        margin-bottom: 0;
        margin-right: 0;
        height: 6rem;
        padding: 0 1rem;
      `
    : css`
        width: 37.5rem;
        min-width: 37.5rem;
        margin-bottom: 1.5625rem;
        margin-right: 1.25rem;
        height: 13.9375rem;
        padding: 1.875rem;
      `}

  max-width: 37.5rem;
  border-radius: 1rem;

  ${media.xsmall} {
    width: calc(100% - 1rem);
  }

  background: #fff;
  opacity: 0.7;

  &:hover {
    opacity: 1;

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

  margin: 3rem -1.875rem 0;

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
  margin-top: 7px;
  margin-bottom: 20px;
  justify-content: space-between;

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

  span {
    margin-bottom: 0.5rem;
  }
`
export default memo(EventCard)
