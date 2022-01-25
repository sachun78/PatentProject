import { css } from '@emotion/react'
import React from 'react'

type NetworkProps = {}

function Network({}: NetworkProps) {

  return (
    <div css={wrapper}>
      네트워크View
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

export default Network
