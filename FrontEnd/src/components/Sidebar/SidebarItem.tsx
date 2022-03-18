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
  color: ${palette.purple[200]}; //NON SELECTED ITEM
  text-decoration: none;

  &:hover {
    background: ${palette.purple[50]};
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
    background: none;
    color: ${palette.purple[400]};

    span {
      font-weight: bold;
      border-bottom: 3px solid ${palette.purple[400]};
      padding-bottom: 0.5rem;
    }
  }
`

export default SidebarItem
