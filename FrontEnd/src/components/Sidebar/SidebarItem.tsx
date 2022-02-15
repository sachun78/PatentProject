import { css } from '@emotion/react'
import { NavLink } from 'react-router-dom'
import palette from '../../lib/palette'
import IconControl, { IconControlType } from '../IconControl/IconControl'

export type SidebarItemProps = {
  icon: IconControlType
  text: string
  to: string
  ignore?: boolean
}

function SidebarItem({ icon, text, to, ignore }: SidebarItemProps) {
  return (
    <li css={itemStyle}>
      <NavLink
        to={to}
        css={linkStyle}
        onClick={(e) => {
          if (ignore) {
            e.preventDefault()
          }
        }}
      >
        <IconControl name={icon} />
        <span>{text}</span>
      </NavLink>
    </li>
  )
}

const itemStyle = css``

const linkStyle = css`
  border-radius: 0.5rem;
  height: 6rem;
  display: flex;
  align-items: center;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  color: ${palette.blueGrey[600]};
  text-decoration: none;

  &:hover {
    background: ${palette.blueGrey[50]};
  }

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  span {
    font-size: 1.8rem;
    margin-left: 1.6rem;
  }

  &.active {
    background: ${palette.blueGrey[50]};
    color: ${palette.blue[900]};

    span {
      font-weight: bold;
      border-bottom: 3px solid ${palette.blue[900]};
      padding-bottom: 0.5rem;
    }

    background: none;
  }
`

export default SidebarItem
