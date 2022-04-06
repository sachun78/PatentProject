import { css } from '@emotion/react'
import { MdMoreHoriz } from 'react-icons/md'
import palette, { brandColor } from '../../lib/palette'
import gravatar from 'gravatar'
import { Avatar } from '@mui/material'
import React from 'react'

export type PostHeaderProps = {}

function PostHeader({}: PostHeaderProps) {
  return <div css={headerStyle}>
    <div css={iconStyle}>
      <Avatar alt='user-avatar' src={gravatar.url('test.email', { s: '60px', d: 'retro' })}
              sx={{ width: 60, height: 60 }}
              onClick={() => {
              }} />
    </div>
    <div css={titleStyle}>
      <h4><span>username/ etc ..</span></h4>
      <div className={'time-date'}>posted time-date</div>
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
    margin: 5px 0;
    outline: none;
    text-align: left;
  }

  span {
    color: #333333;
    font: normal normal 800 19px/26px NanumSquareOTF;
  }

  .time-date {
    font: normal normal 800 14px/19px NanumSquareOTF;
    color: #9C9C9C;
  }
`
const iconStyle = css`
  margin-right: 1.875rem;
`

export default PostHeader
