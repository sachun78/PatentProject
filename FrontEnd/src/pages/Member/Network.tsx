import { css } from '@emotion/react'
import React from 'react'
import ViewBase from '../../components/ViewBase'

type NetworkProps = {}

function Network({}: NetworkProps) {

  return (
    <div css={wrapper}>
      <ViewBase title="NETWORK">
        네트워크 View
      </ViewBase>
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding: 3rem;
`

export default Network
