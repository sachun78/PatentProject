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
  height: 8rem;

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  text-decoration: none;

  span {
    font-size: 1.2rem;
    margin-top: 0.8rem;
  }

  color: ${palette.purple[600]};

  &:hover {
    color: ${palette.purple[500]};
  }

  &.active {
    background: ${palette.purple[50]};
    color: ${palette.purple[400]};
    border-radius: 0.4rem;
  }
`

export default VerticalBarItem
