import React from 'react'
import { bodyStyle, wrapStyle } from './styles'
import { pageStyle } from 'pages/Login/styles'

type AuthProps = {
  children: React.ReactNode
  width: number
  height: number
}

export default function Auth({ children, width, height }: AuthProps) {
  return (
    <div css={pageStyle}>
      <div css={bodyStyle(width, height)}>
        <div css={wrapStyle}>
          <div className='img-block'>
            {/*<IconControl name={'welcome'} />*/}
            <img src={'/assets/logo.png'} alt={'logo'} />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
