import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'
import SidebarItem from './SidebarItem'
import media from '../../lib/styles/media'
import Logo from './Logo'
import gravatar from 'gravatar'
import { useQueryClient } from 'react-query'
import { User } from '../../lib/api/types'
import useAuth from '../../hooks/useAuth'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  const { logout } = useAuth()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')
  const username: string = user?.username || ''
  const navigate = useNavigate()
  if (!user) return null

  return <div css={sidebarStyle}>
    <Logo />
    <List sx={{marginTop: 8}}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <img src={gravatar.url(user.email, { s: '20px', d: 'retro' })} alt={user.username} />
          </ListItemIcon>
          <ListItemText primary={username} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => logout()}>
          <ListItemText primary={'Logout'} />
        </ListItemButton>
      </ListItem>
    </List>
    <ul css={menuStyle}>
      <SidebarItem icon='home' text='Home' to='' />
      <SidebarItem icon='schedule' text='MemberShip' to='/membership' />
      <SidebarItem icon='network' text='Network' to='/network' />
      <SidebarItem icon='links' text='Conference' to='/conference' />
    </ul>
  </div>
}

const sidebarStyle = css`
  ${media.xlarge} {
    display: none;
  }

  flex: 1;
  display: flex;
  flex-direction: column;

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    color: ${palette.blueGrey[900]};

    img {
      display: block;
    }
  }
`

const menuStyle = css`
  list-style: none;
  padding: 0;
  margin-top: 5.625rem;
  margin-left: -1.6rem;
  flex: 1;
`

export default Sidebar
