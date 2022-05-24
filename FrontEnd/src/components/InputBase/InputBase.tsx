import { forwardRef } from 'react'

import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type InputBaseProps = {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  disabled?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function InputBase({ className, style, children, disabled, ...rest }: InputBaseProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div css={wrapper(disabled)} {...rest} style={style} className={className} ref={ref}>
      {children}
    </div>
  )
}

const wrapper = (disabled: boolean = false) => css`
  border: 1px solid #9c9c9c;
  border-radius: 1rem;
  background: #fff;
  height: 2.375rem;
  color: #6c6c6c;
  font: normal normal normal 1rem/26px NanumSquareOTF;
  display: flex;
  ${disabled &&
  css`
    background: ${palette.blueGrey[50]};
    cursor: not-allowed;
    color: ${palette.blueGrey[300]};
  `}
`

export default forwardRef<HTMLDivElement, InputBaseProps>(InputBase)
