import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdDeleteForever, MdUpdate } from 'react-icons/md'
import { deleteEvent } from '../../lib/api/event/deleteEvent'
import { useCurrentEventState } from '../../atoms/eventState'
import { useEventModal } from '../../hooks/useEventTitle'
import useDateRangeHook from '../../hooks/useDateRangeHook'
import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import media from '../../lib/styles/media'

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

  const handleNewMeet = async () => {
    setEvent({ id, title })
  }

  return <div css={wrapper}>
    <div className={'inner'} onClick={() => {
      navigate(`/membership/event/${id}`)
    }}>
      <div css={eventHeaderStyle}>
        <span className='event-header-header'>{title}</span>
        <div className='event-header-tool'>
          <div className='tool-edit' onClick={handleEdit}><MdUpdate /></div>
          <div className='tool-delete' onClick={onDelete}><MdDeleteForever /></div>
        </div>
      </div>
      <div css={contentStyle}>
        <span>Begin: <b>{startDate.replace(/T.*$/, '')}</b></span>
        <span>END: <b>{endDate.replace(/T.*$/, '')}</b></span>
        <span>Associated Meetings: <b>{count}</b></span>
      </div>
    </div>
    <div css={buttonStyle} onClick={handleNewMeet}>
      <NavLink to={'/membership/meeting/request'}>
        <div className='text'>Propose a meeting</div>
      </NavLink>
    </div>
  </div>
}

const wrapper = css`
  width: calc(50% - 1rem);
  margin: 2rem 0.5rem 2rem;
  padding: 1.5rem;
  line-height: 1.2;
  border-radius: 0.8rem;
  box-shadow: rgb(0 0 0 / 4%) 0 4px 16px 0;

  ${media.xsmall} {
    width: calc(100% - 1rem);
  }
  
  background-color: #fff;
  text-align: left;

  .inner:hover {
    .event-header-tool {
      visibility: visible
    }
  }
`

const buttonStyle = css`
  background-color: ${palette.purple[500]};
  margin: 1.5rem -1.5rem -1.5rem -1.5rem;
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  text-align: center;

  .text {
    padding-top: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
    color: #fff;
  }

  &:hover {
    background-color: ${palette.purple[400]};
  }

  a {
    text-decoration: none
  }
`

const eventHeaderStyle = css`
  display: flex;
  height: 3rem;

  .event-header-header {
    flex-grow: 1;
    font-weight: 800;
    font-size: 1.5rem;
  }

  .event-header-tool {
    visibility: hidden;
    display: flex;
    font-size: 1.6rem;
    color: ${palette.purple[500]};
    align-items: center;

    svg {
      width: 2rem;
      height: 2rem;
    }

    .tool-delete:hover {
      color: ${palette.red[700]};
    }

    .tool-edit:hover {
      color: ${palette.purple[400]};
    }
  }
`
const contentStyle = css`
  min-height: 4rem;
  font-size: 1.2rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  span {
    margin-bottom: 0.5rem
  }
`
export default EventCard
