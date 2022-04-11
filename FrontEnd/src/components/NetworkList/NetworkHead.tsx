import { css } from '@emotion/react'

export type NetworkHeadProps = {}

function NetworkHead({}: NetworkHeadProps) {
  return <div css={HeadStyle}>Network</div>
}

const HeadStyle = css`
  font-size: 20px;
  font-weight: bold;
  text-align: left;
`

export default NetworkHead
