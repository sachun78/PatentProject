import { css } from '@emotion/react'
import { NavLink } from 'react-router-dom'
import { brandColor } from 'lib/palette'

export type SidebarItemProps = {
  text: string
  to: string
  ignore?: boolean
}

function SidebarItem({ text, to, ignore }: SidebarItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        css={linkStyle}
        onClick={(e) => {
          if (ignore) {
            e.preventDefault()
          }
        }}>
        <span>{text}</span>
      </NavLink>
    </li>
  )
}

const linkStyle = css`
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  color: #6C6C6C;
  text-decoration: none;
  margin-bottom: 1.5625rem;

  span {
    font: normal normal 800 18px/24px NanumSquareOTF;
    text-align: center;
    width: 95px;
  }

  &.active {
    color: ${brandColor};
  }
`

export default SidebarItem
