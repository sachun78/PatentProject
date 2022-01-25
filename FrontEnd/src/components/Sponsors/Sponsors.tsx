import { css } from '@emotion/react'

type SponsorViewProps = {}

function Sponsors({}: SponsorViewProps) {
  return (
    <div css={sponsorViewStyle}>
      스폰서뷰
    </div>
  )
}

const sponsorViewStyle = css`
  flex: 1;
  height: 100%;
  padding-left: 1.5rem;
  padding-right: 2rem;
  flex-direction: row;
`

export default Sponsors
