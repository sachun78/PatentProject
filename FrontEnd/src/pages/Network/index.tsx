import { css } from '@emotion/react'
import React from 'react'
import NetworkList from 'components/NetworkList'
import NetworkHead from '../../components/NetworkList/NetworkHead'

type NetworkProps = {}

function Network({}: NetworkProps) {

  return (
    <div css={wrapper}>
      <NetworkHead />
      <NetworkList />
    </div>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: column;
`

export default Network
