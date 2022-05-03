import { css } from '@emotion/react'
import React from 'react'
import NetworkList from 'components/NetworkList'
import NetworkHead from 'components/NetworkList/NetworkHead'
import NetworkSearchDialog from '../../components/NetworkList/NetworkSearchDialog'

type NetworkProps = {}

function Network({}: NetworkProps) {
  return (
    <div css={wrapper}>
      <NetworkHead />
      <NetworkList />
      <NetworkSearchDialog />
    </div>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: column;
`

export default Network
