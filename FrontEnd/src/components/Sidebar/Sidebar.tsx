import { css } from '@emotion/react'
import React from 'react'
import SidebarItem from './SidebarItem'
import media from 'lib/styles/media'
import { useQueryClient } from 'react-query'
import { User } from 'lib/api/types'
import useAuth from 'hooks/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import gravatar from 'gravatar'
import { brandColor } from '../../lib/palette'

type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  const { logout } = useAuth()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')
  const navigate = useNavigate()

  if (!user) return null

  return <div css={sidebarStyle}>
    <NavLink to='/' css={logoStyle}>
      <img src={'/assets/logo-login.png'} alt={'main-logo'} />
    </NavLink>
    <ul css={menuStyle}>
      <SidebarItem text='Home' to='' />
      <SidebarItem text='Membership' to='/membership' />
      <SidebarItem text='Network' to='/network' />
      <SidebarItem text='Conference' to='/conference' />
    </ul>
    <div css={dividerStyle}>{''}</div>
    <div css={userStyle}>
      <Avatar alt='user-avatar' src={gravatar.url(user.email, { s: '74px', d: 'retro' })} sx={{ width: 74, height: 74 }}
              onClick={() => navigate('/profile')} />
      <span>{user.username}</span>
      <span onClick={() => logout()}>Logout</span>
    </div>
  </div>
}

const sidebarStyle = css`
  ${media.xlarge} {
    display: none;
  }

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 95px;
  user-select: none;
`

const menuStyle = css`
  list-style: none;
  padding: 0;
  margin: 50px 0;
`

const logoStyle = css`
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: flex-end;

  img {
    width: 70px;
    height: 100%;
    padding-right: 0.78125rem;
  }
`

const dividerStyle = css`
  border: 1px solid #9C9C9C;
  width: 6.8125rem;
  margin-right: -7px;
`

const userStyle = css`
  margin-top: 3.125rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    margin-top: 0.660625rem;
    font: normal normal 800 20px/27px NanumSquareOTF;
    color: #333333;
    white-space: nowrap;

    &:hover {
      color: ${brandColor};
    }
  }
`

export default Sidebar
