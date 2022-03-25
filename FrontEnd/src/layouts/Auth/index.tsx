import React from 'react'
import IconControl from '../../components/IconControl'
import { bodyStyle, wrapStyle } from './styles'

type AuthProps = {
  children: React.ReactNode
  width: number
  height: number
}

export default function Auth({ children, width, height }: AuthProps) {
  return (
    <div css={bodyStyle(width, height)}>
      <div css={wrapStyle}>
        <div className='img-block'>
          <IconControl name={'welcome'} />
          <span>WEMET</span>
        </div>
        {children}
      </div>
    </div>
  )
}
