import { css } from '@emotion/react'
import { Avatar } from '@mui/material'
import { API_PATH } from 'lib/api/client'
import React from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import palette, { brandColor } from '../../lib/palette'

export type PostHeaderProps = {
  owner_username: string
  owner_thumb: string
  createdAt: Date
}

function PostHeader({ owner_username, owner_thumb, createdAt }: PostHeaderProps) {
  return (
    <div css={headerStyle}>
      <div css={iconStyle}>
        <Avatar
          alt={owner_username}
          src={`${API_PATH}static/` + owner_thumb}
          sx={{ width: 60, height: 60 }}
          style={{ border: '0.1px solid lightgray' }}
          imgProps={{ crossOrigin: 'anonymous' }}
        />
      </div>
      <div css={titleStyle}>
        <h4>
          <span>{owner_username}/ etc ..</span>
        </h4>
        <div className={'time-date'}>{createdAt}</div>
      </div>
      <div css={moreStyle} onClick={() => {}}>
        <MdMoreHoriz />
      </div>
    </div>
  )
}

const headerStyle = css`
  display: flex;
  padding-top: 1.875rem;
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  align-items: flex-start;
`
const moreStyle = css`
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 999px;

  &:hover {
    background: ${palette.purple[50]};
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: ${brandColor};
  }
`
const titleStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  margin-bottom: -5px;

  h4 {
    margin: 0.5625rem 0 0.3125rem;
    outline: none;
    text-align: left;
  }

  span {
    color: #333333;
    font-family: NanumSquare;
    font-weight: 800;
    font-size: 18px;
    line-height: 1.166666667;
  }

  .time-date {
    font-family: 'NanumSquare';
    font-size: 14px;
    line-height: 1.142857143;
    color: #9c9c9c;
  }
`
const iconStyle = css`
  margin-right: 1.25rem;
`

export default PostHeader
