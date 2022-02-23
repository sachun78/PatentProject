import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdDeleteForever, MdUpdate } from 'react-icons/md'
import { deleteEvent } from '../../lib/api/event/deleteEvent'
import useEventQuery from '../../hooks/query/useEventQuery'
import { memo } from 'react'
import { useCurrentEventState } from '../../atoms/eventState'

export type EventCardProps = {
  id: string
  title: string
  startDate: string
  endDate: string
  count: number
}

function EventCard({ title = '', startDate, endDate, id, count }: EventCardProps) {
  const { refetch } = useEventQuery(1, { enabled: false })
  const navigate = useNavigate()
  const [, setCurEvent] = useCurrentEventState()
  const handleEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    alert(`edit! ${title}`)
  }
  const handleDel = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    try {
      await deleteEvent(id)
      refetch()
    } catch (error) {
      console.log(error)
      //TODO(Open ERROR DIALOG)
    }
  }
  const handleNewMeet = async () => {
    setCurEvent({
      id,
      title
    })
  }

  return <div css={wrapper}>
    <div className={'inner'} onClick={() => {
      navigate(`/membership/event/${id}`)
    }}>
      <div css={eventHeaderStyle}>
        <span className='event-header-header'>{title}</span>
        <div className='event-header-tool'>
          <div className='tool-edit' onClick={handleEdit}><MdUpdate /></div>
          <div className='tool-delete' onClick={handleDel}><MdDeleteForever /></div>
        </div>
      </div>
      <div css={contentStyle}>
        <span>Begin: <b>{startDate.replace(/T.*$/, '')}</b></span>
        <span>END: <b>{endDate.replace(/T.*$/, '')}</b></span>
        <span>Associated Meetings: <b>{count}</b></span>
      </div>
    </div>
    <div css={buttonStyle} onClick={handleNewMeet}>
      <NavLink to={'/meeting/request'}>
        <div className='text'>Propose a meeting</div>
      </NavLink>
    </div>
  </div>
}

const wrapper = css`
  width: calc(33.3333% - 1rem);
  margin: 0.5rem 0.5rem 2rem;
  padding: 1.5rem;
  line-height: 1.2;
  border-radius: 0.8rem;
  box-shadow: rgb(0 0 0 / 4%) 0 4px 16px 0;

  background-color: #fff;
  text-align: left;

  .inner:hover {
    .event-header-tool {
      visibility: visible
    }
  }
`

const buttonStyle = css`
  background-color: ${palette.blue[200]};
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
    background-color: ${palette.blue[500]};
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
    color: ${palette.blue[400]};
    align-items: center;

    svg {
      width: 2rem;
      height: 2rem;
    }

    .tool-delete:hover {
      color: ${palette.red[700]};
    }

    .tool-edit:hover {
      color: ${palette.blue[700]};
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
export default memo(EventCard)
