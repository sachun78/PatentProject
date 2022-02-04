import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { useUserState } from '../../atoms/authState'
import useAuth from '../../hooks/useAuth'

export type UserInfoProps = {}

function UserInfo({}: UserInfoProps) {
  const [user] = useUserState()
  const { logout } = useAuth()
  const username: string = user?.username || ''

  return <div css={wrapper}>
    <Link to={'/profile'}>{username}</Link>
    <Link css={logoutStyle} to={'/login'} onClick={() => logout}>logout</Link>
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

const logoutStyle = css`
  margin-left: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  font-weight: 600;
`

export default UserInfo
