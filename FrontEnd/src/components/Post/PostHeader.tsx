import { css } from '@emotion/react'
import { MdMoreHoriz } from 'react-icons/md'
import palette, { brandColor } from '../../lib/palette'
import gravatar from 'gravatar'
import { Avatar } from '@mui/material'
import React from 'react'

export type PostHeaderProps = {
  owner_username: string
  owner_thumb: string
  createdAt: Date
}


function PostHeader({ owner_username, owner_thumb, createdAt }: PostHeaderProps) {  
  return <div css={headerStyle}>
    <div css={iconStyle}>
      <Avatar alt='user-avatar' src={owner_thumb}
              sx={{ width: 60, height: 60 }} />
    </div>
    <div css={titleStyle}>
      <h4><span>{owner_username}/ etc ..</span></h4>
      <div className={'time-date'}>{createdAt}</div>
    </div>
    <div css={moreStyle} onClick={() => {
    }}><MdMoreHoriz /></div>
  </div>
}

const headerStyle = css`
  display: flex;
  padding-top: 1.875rem;
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  align-items: flex-start;
`
const moreStyle = css`
  width: 3.6rem;
  height: 3.6rem;
  padding: 0.8rem;
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
    color: #9C9C9C;
  }
`
const iconStyle = css`
  margin-right: 1.25rem;
`

export default PostHeader
