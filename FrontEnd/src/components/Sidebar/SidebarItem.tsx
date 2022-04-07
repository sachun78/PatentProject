import { css } from '@emotion/react'
import { NavLink } from 'react-router-dom'

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
  display: flex;
  align-items: center;
  color: #6C6C6C;
  text-decoration: none;
  width: 95px;
  justify-content: center;
  span {
    font: normal normal 800 18px/24px 'NanumSquare';
    text-align: center;
    padding: 1.25rem 0 0.625rem;
  }

  &.active {
    color: #910457;
    span {
      border-bottom: 1px solid #910457; 
    }
    font: normal normal normal 17px/19px NanumSquareOTF;
  }
`

export default SidebarItem
