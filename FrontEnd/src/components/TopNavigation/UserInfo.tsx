import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import React from 'react'

export type UserInfoProps = {}

function UserInfo({}: UserInfoProps) {
  const username: string = 'Wemet User' // Username data For Test

  return <div css={wrapper}>
    <Link to={'/profile'}>{username}</Link>
  </div>
}

const wrapper = css`
  flex-grow: 1;
  flex-shrink: 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2rem;
`

export default UserInfo
