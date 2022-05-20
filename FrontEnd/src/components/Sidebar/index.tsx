import React from 'react'
import SidebarItem from './SidebarItem'
import { useQueryClient } from 'react-query'
import { User } from 'lib/api/types'
import useAuth from 'hooks/useAuth'
import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { dividerStyle, logoStyle, menuStyle, sidebarStyle, userStyle } from './styles'
import { BiLogOut } from 'react-icons/bi'
import { API_PATH } from 'lib/api/client'
import gravatar from 'gravatar'

type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  const { logout } = useAuth()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')
  const navigate = useNavigate()
  if (!user) return null

  return (
    <div css={sidebarStyle}>
      <NavLink to="/" css={logoStyle}>
        <img src={'/assets/wemet_logo.png'} alt={'main-logo'} />
      </NavLink>
      <ul css={menuStyle}>
        <SidebarItem text="Feed" to="/" />
        <SidebarItem text="Meeting" to="/meeting" />
        <SidebarItem text="Network" to="/network" />
        <SidebarItem text="Conference" to="/conference" />
      </ul>
      <div css={dividerStyle}>{''}</div>
      <div css={userStyle}>
        <Avatar
          alt={user.username}
          src={`${API_PATH}static/${user.email}`}
          sx={{ width: 60, height: 60 }}
          onClick={() => navigate('/profile')}
          imgProps={{ crossOrigin: 'anonymous' }}
        >
          <img src={gravatar.url(user.email, { s: '60px', d: 'retro' })} alt={'fallback'} />
        </Avatar>
        <span>{user.username}</span>
        <BiLogOut onClick={() => logout()} />
      </div>
    </div>
  )
}

export default Sidebar
