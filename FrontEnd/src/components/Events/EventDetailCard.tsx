import { css } from '@emotion/react'
import { Avatar, AvatarGroup } from '@mui/material'
import { brandColor } from 'lib/palette'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export type EventDetailCardProps = {
  id: string
  from: string
  to: string
  comment: string
  place: string
  time: Date
  date: Date
  state: string
  title: string
}

function EventDetailCard({ title, from, to, date, time, place, state, id }: EventDetailCardProps) {
  return <Link css={wrapper} to={'/membership/schedule/' + id}>
    <h1>{title}</h1>
    <AvatarGroup max={3} css={avatarGroupStyle}>
      <Avatar alt={from} src='/assets/KimMinjun.png' />
      <Avatar alt={to} src='/assets/ParkMina.png' />
    </AvatarGroup>
    <hr css={dividerStyle} />
    <ScheduleDetailContents>
      <p className={'schedule-td'}> {new Date(date).toLocaleDateString()}
        {' '}
        {new Date(time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      <p className={'schedule-place'}>{place}</p>
      <div className={'schedule-state'} css={stateStyle(state)}>{state === 'none' ? 'pending' : state}</div>
    </ScheduleDetailContents>
  </Link>
}

const wrapper = css`
  width: 15.125rem;
  height: 18.8125rem;
  margin-right: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  &:hover {
    box-shadow: 0 3px 6px #00000029;

    h1 {
      color: ${brandColor};
    }
  }

  h1 {
    margin: 0 0 30px;
    font: normal normal 800 18px/21px NanumSquareOTF;
    color: #333333;
  }
`
const dividerStyle = css`
  border: 0.5px solid #D9D9D9;
  width: 100%;
  margin: 0 0 10px;
`
const avatarGroupStyle = css`
  .MuiAvatarGroup-avatar {
    background: ${brandColor};
    width: 60px;
    height: 60px;
  }

  margin-bottom: 30px;
`

const ScheduleDetailContents = styled.section`
  position: relative;
  width: 100%;

  p {
    margin: 0;
    color: #6C6C6C;
    text-align: center;
  }

  .schedule-td {
    font: normal normal normal 16px/18px NanumSquareOTF;
    margin-bottom: 10px;
  }

  .schedule-place {
    font: normal normal normal 16px/21px NanumSquareOTF;
  }

  .schedule-state {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    height: 37px;
    margin-bottom: 17px;
    font: normal normal normal 16px/18px NanumSquareOTF;
    border-radius: 0.25rem;
    box-shadow: 0px 8px 6px #00000029;
    user-select: none;
  }
`

const stateStyle = (state: string) => css`
  color: #F9F9FC;
  background: ${brandColor};

  ${state === 'confirm' && css`
    background: #fff;
    color: #6C6C6C;
  `}

  ${state === 'none' && css`
    background: #9C9C9C;
    color: #fff;
  `}
`

export default EventDetailCard
