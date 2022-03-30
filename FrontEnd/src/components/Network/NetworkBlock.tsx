import { css } from '@emotion/react'
import NetworkItem from './NetworkItem'

export type NetworkNetworkBlockProps = {}

function NetworkBlock({}: NetworkNetworkBlockProps) {
  return <div css={wrapper}>
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
  </div>
}

const wrapper = css`
  display: flex;
  flex-direction: column;
`

export default NetworkBlock
