import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { NavLink } from 'react-router-dom'
import { MdDeleteForever, MdUpdate } from 'react-icons/md'

export type EventCardProps = {
  title: string
}

function EventCard({ title = '' }: EventCardProps) {
  const handleEdit = () => {
    alert(`edit! ${title}`)
  }
  const handleDel = () => {
    alert(`del! ${title}`)
  }

  return <div css={wrapper}>
    <div css={eventHeaderStyle}>
      <span className='event-header-header'>{title}</span>
      <div className='event-header-tool'>
        <div onClick={handleEdit}><MdUpdate /></div>
        <div className='tool-delete' onClick={handleDel}><MdDeleteForever /></div>
      </div>
    </div>
    <div css={contentStyle}>
      <span>Begin: <b>{new Date().toDateString()}</b></span>
      <span>END: <b>{new Date().toDateString()}</b></span>
      <span>생성된 스케줄: <b>N개</b></span>
    </div>
    <div css={buttonStyle}>
      <NavLink to={'/meeting/request'}>
        <div className='text'>미팅 생성</div>
      </NavLink>
    </div>
  </div>
}

const wrapper = css`
  width: calc(33.3333% - 1rem);
  margin: 0.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  line-height: 1.2;
  border-radius: 0.8rem;

  background-color: #fff;
  text-align: left;

  &:hover {
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
    font-weight: 600;
    font-size: 1.5rem;
  }

  .event-header-tool {
    visibility: hidden;
    display: flex;
    font-size: 1.6rem;
    color: ${palette.blue[400]};
    align-items: center;

    &:hover {
      color: ${palette.blue[700]};

      .tool-delete {
        color: ${palette.red[700]};
      }
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
