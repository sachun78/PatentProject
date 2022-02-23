import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'
import SidebarItem from './SidebarItem'
import media from '../../lib/styles/media'

type SidebarProps = {}

function Sidebar({}: SidebarProps) {

  return <div css={sidebarStyle}>
    <div className='logo'>
    </div>
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
  
  flex: 1 1 100%;
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
  margin-top: 9rem;
  margin-left: -1.6rem;
  flex: 1;
`

export default Sidebar
