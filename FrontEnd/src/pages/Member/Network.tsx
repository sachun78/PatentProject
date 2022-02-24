import { css } from '@emotion/react'
import React from 'react'

type NetworkProps = {}

function Network({}: NetworkProps) {

  return (
    <div css={wrapper}>
      네트워크 View
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding: 3rem;
`

export default Network
