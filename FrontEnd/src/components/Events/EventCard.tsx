import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'
import { Link, useNavigate } from 'react-router-dom'
import { deleteEvent } from 'lib/api/event/deleteEvent'
import { useCurrentEventState } from 'atoms/eventState'
import { useEventModal } from 'hooks/useEventTitle'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import media from 'lib/styles/media'

export type EventCardProps = {
  id: string
  title: string
  startDate: string
  endDate: string
  count: number
}

function EventCard({ title, startDate, endDate, id, count }: EventCardProps) {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [, setEvent] = useCurrentEventState()

  const handleEdit = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setOpen(true)
    setEdit(true)
    setEvent({ id, title })
    setStartDate(new Date(startDate))
    setEndDate(new Date(endDate))
  }, [endDate, id, startDate, title])

  const onDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    deleteEvent(id)
      .then(() => {
        qc.invalidateQueries(['events', 1])
      })
      .catch((e) => {
        const { message } = e.response?.data
        toast.error(message, {
          position: 'top-center',
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 3000
        })
      })
  }

  const onCreateSchedule = useCallback(() => {
    setEvent({ id, title })
    setStartDate(new Date(startDate))
    setEndDate(new Date(endDate))
  }, [endDate, id, startDate, title])

  return <div css={wrapper}>
    <div className={'inner'} onClick={() => {
      navigate(`/membership/event/${id}`)
    }}>
      <div css={eventHeaderStyle}>
        <span className='event-card-header'>{title}</span>
      </div>
      <div css={contentStyle}>
        <span>Period: <b>{startDate.replace(/T.*$/, '')}</b> ~ <b>{endDate.replace(/T.*$/, '')}</b></span>
        <span>Schedules: <b>{count}</b></span>
      </div>
    </div>
    <div css={buttonStyle} onClick={onCreateSchedule}>
      <Link to={'/membership/meeting/request'}>
        <div className='text'>+ New Schedule</div>
      </Link>
    </div>
  </div>
}

const wrapper = css`
  width: calc(50% - 1.25rem);
  max-width: 37.5rem;
  height: 13.9375rem;
  margin-bottom: 1.5625rem;
  margin-right: 1.25rem;
  padding: 1.875rem;
  border-radius: 1rem;

  ${media.xsmall} {
    width: calc(100% - 1rem);
  }

  background: #fff;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

const buttonStyle = css`
  background-color: ${brandColor};
  margin: 3.25rem -1.875rem 0;

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
    text-decoration: none
  }
`

const eventHeaderStyle = css`
  display: flex;
  margin-top: 7px;
  margin-bottom: 15px;

  .event-card-header {
    font: normal normal 800 18px NanumSquareOTF;
    color: #333333;
    line-height: 1.166666667;
  }
`
const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  font: normal normal normal 18px NanumSquareOTF;
  
  span {
    margin-bottom: 0.5rem
  }
`
export default EventCard
