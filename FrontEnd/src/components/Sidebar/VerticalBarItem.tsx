import { css } from '@emotion/react'
import { NavLink } from 'react-router-dom'
import palette from '../../lib/palette'
import IconControl, { IconControlType } from '../IconControl/IconControl'

export type VerticalBarItemProps = {
  icon: IconControlType
  text: string
  to: string
  ignore?: boolean
}

function VerticalBarItem({ icon, text, to, ignore }: VerticalBarItemProps) {
  return (
    <NavLink
      to={to}
      css={item}
      onClick={(e) => {
        if (ignore) {
          e.preventDefault()
        }
      }}
    >
      <IconControl name={icon} />
      <span>{text}</span>
    </NavLink>
  )
}

const item = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5rem;

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }

  text-decoration: none;

  span {
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }

  color: ${palette.purple[600]};

  &:hover {
    color: ${palette.purple[500]};
  }

  &.active {
    background: ${palette.purple[50]};
    color: ${palette.purple[400]};
    border-radius: 0.25rem;
  }
`

export default VerticalBarItem
