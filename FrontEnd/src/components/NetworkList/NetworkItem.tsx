import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'
import { IProfile } from 'lib/api/types'
import { useNavigate } from 'react-router-dom'
import { Avatar, Tooltip } from '@mui/material'
import gravatar from 'gravatar'
import React from 'react'
import { MdOutlineSafetyDivider, MdOutlineWork } from 'react-icons/md'
import { GrUserManager } from 'react-icons/gr'

export type NetworkItemProps = {
  data: { email: string, profile: IProfile }
}

function NetworkItem({ data }: NetworkItemProps) {
  const navigate = useNavigate()
  return <div css={itemStyle} onClick={() => navigate('/u/' + data.email)}>
    <div css={iconStyle}>
      <Avatar alt='user-avatar' src={gravatar.url(data.email, { s: '60px', d: 'retro' })}
              sx={{ width: 60, height: 60 }} />
    </div>
    <div css={nameStyle}>{data.email}</div>
    <div css={informStyle}>
      <Tooltip title='Company' placement={'top-start'}><span><MdOutlineWork />{data.profile.company}</span></Tooltip>
      <Tooltip title='Field'
               placement={'top-start'}><span><GrUserManager />{data.profile.field?.map((item) => item)}</span></Tooltip>
      <Tooltip title='Country'
               placement={'top-start'}><span><MdOutlineSafetyDivider />{data.profile.country}</span></Tooltip>
    </div>
    <div css={stateStyle}>
      <span>something online?</span>
    </div>
  </div>
}

const itemStyle = css`
  display: flex;
  width: 100%;
  height: 6rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;

  &:hover {
    color: ${brandColor};
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.5rem 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  & + & {
    margin-top: 0.5rem;
  }
`
const iconStyle = css`
  margin-right: 1rem;
  margin-left: 2rem;
`
const nameStyle = css`
  margin-right: 2rem;
  font-size: 1.25rem;
  font-weight: 600;
`

const informStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 0.875rem;
  color: ${palette.grey[400]};

  svg {
    margin-right: 1rem;
    color: black;
    font-size: 1.25rem;
  }

  span {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
`
const stateStyle = css`
  display: flex;
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  flex-grow: 1;
  text-align: right;
  justify-content: flex-end;

  span + span {
    margin-left: 1rem;
  }

  .request-block {
    margin-right: 1rem;
  }
`

export default NetworkItem
