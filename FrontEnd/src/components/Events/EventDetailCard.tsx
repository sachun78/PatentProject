import { css } from '@emotion/react'
import { Avatar, AvatarGroup } from '@mui/material'
import { brandColor } from 'lib/palette'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import React, { memo, useMemo } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { API_PATH } from 'lib/api/client'
import { url } from 'gravatar'

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
  const isExpired = useMemo(() => {
    const dist = formatDistanceToNow(new Date(time), {
      addSuffix: true,
    })
    return dist.includes('ago')
  }, [time])

  return (
    <Link css={wrapper} to={'/meeting/schedule/' + id}>
      <h1>{title}</h1>
      <AvatarGroup max={3} css={avatarGroupStyle}>
        <Avatar
          alt={from}
          src={API_PATH + 'static/' + from}
          imgProps={{ crossOrigin: 'anonymous' }}
          style={{ border: '0.1px solid lightgray' }}
        >
          <img src={url(from, { s: '60px', d: 'retro' })} alt={'no-image'} />
        </Avatar>
        <Avatar
          alt={to}
          src={API_PATH + 'static/' + to}
          imgProps={{ crossOrigin: 'anonymous' }}
          style={{ border: '0.1px solid lightgray' }}
        >
          <img src={url(to, { s: '60px', d: 'retro' })} alt={'no-image'} />
        </Avatar>
      </AvatarGroup>
      <hr css={dividerStyle} />
      <ScheduleDetailContents>
        <p className={'schedule-td'}>
          {new Date(date).toLocaleDateString()}
          {new Date(time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className={'schedule-place'}>{place}</p>
        <div className={'schedule-state'} css={stateStyle(state)}>
          {state !== 'none' ? state : isExpired ? 'expired' : 'pending'}
        </div>
      </ScheduleDetailContents>
    </Link>
  )
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
    width: 202px;
    margin: 0 0 30px;
    font: normal normal 800 18px/21px NanumSquareOTF;
    color: #333333;
    height: 21px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }
`
const dividerStyle = css`
  border: 0.5px solid #d9d9d9;
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
    color: #6c6c6c;
    text-align: center;
  }

  .schedule-td {
    font: normal normal normal 16px/18px NanumSquareOTF;
    margin-bottom: 10px;
  }

  .schedule-place {
    font: normal normal normal 16px/21px NanumSquareOTF;
    height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 4px;
  }

  .schedule-state {
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    height: 37px;

    font: normal normal normal 16px/18px NanumSquareOTF;
    border-radius: 0.25rem;
    box-shadow: 0 8px 6px #00000029;
    user-select: none;
  }
`

const stateStyle = (state: string) => css`
  color: #f9f9fc;
  background: ${brandColor};

  ${state === 'confirm' &&
  css`
    background: #fff;
    color: #6c6c6c;
  `}

  ${state === 'none' &&
  css`
    background: #9c9c9c;
    color: #fff;
  `}
`

export default memo(EventDetailCard)
