import React from 'react'
import { pageStyle } from 'pages/Login/styles'

type AuthProps = {
  children: React.ReactNode
}

export default function Auth({ children }: AuthProps) {
  return (
    <div css={pageStyle}>
      {children}
    </div>
  )
}
