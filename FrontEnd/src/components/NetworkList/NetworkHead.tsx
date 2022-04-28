import { css } from '@emotion/react'
import { brandColor } from '../../lib/palette'

export type NetworkHeadProps = {}

function NetworkHead({}: NetworkHeadProps) {
  return <div css={HeadStyle}>Network</div>
}

const HeadStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1.25rem;
  color: ${brandColor};
`

export default NetworkHead
