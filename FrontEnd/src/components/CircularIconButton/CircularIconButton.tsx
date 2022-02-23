import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { resetButton } from '../../lib/styles/resetButton'
import IconControl, { IconControlType } from '../IconControl/IconControl'

export type CircularIconButtonProps = {
  color?: string
  hoverColor?: string
  icon: IconControlType
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function CircularIconButton({
                              color = palette.cyan[500],
                              hoverColor = palette.cyan[400],
                              icon,
                              ...rest
                            }: CircularIconButtonProps) {
  return (
    <button css={style(color, hoverColor)} {...rest}>
      <IconControl name={icon} />
    </button>
  )
}

const style = (color: string, hoverColor: string) => css`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  ${resetButton};
  background-color: ${color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  &:hover,
  &:focus-visible {
    background: ${hoverColor};
  }

  &:focus-visible {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  }
`

export default CircularIconButton
