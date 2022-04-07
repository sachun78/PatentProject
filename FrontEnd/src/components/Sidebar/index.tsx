import React from 'react'
import SidebarItem from './SidebarItem'
import { useQueryClient } from 'react-query'
import { User } from 'lib/api/types'
import useAuth from 'hooks/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import gravatar from 'gravatar'
import { dividerStyle, logoStyle, menuStyle, sidebarStyle, userStyle } from './styles'

type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  const { logout } = useAuth()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')
  const navigate = useNavigate()

  if (!user) return null

  return <div css={sidebarStyle}>
    <NavLink to='/' css={logoStyle}>
      <img src={'/assets/wemet_logo.png'} alt={'main-logo'} />
    </NavLink>
    <ul css={menuStyle}>
      <SidebarItem text='Feed' to='' />
      <SidebarItem text='Membership' to='/membership' />
      <SidebarItem text='Network' to='/network' />
      <SidebarItem text='Conference' to='/conference' />
    </ul>
    <div css={dividerStyle}>{''}</div>
    <div css={userStyle}>
      <Avatar alt='user-avatar' src={gravatar.url(user.email, { s: '60px', d: 'retro' })}
              sx={{ width: 60, height: 60 }}
              onClick={() => navigate('/profile')} />
      <span>{user.username}</span>
      <span onClick={() => logout()}>Logout</span>
    </div>
  </div>
}


export default Sidebar
