import { css } from '@emotion/react'

export type NetworkHeadProps = {}

function NetworkHead({}: NetworkHeadProps) {
  return <div css={HeadStyle}>Network</div>
}

const HeadStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  padding: 1rem;
`

export default NetworkHead
