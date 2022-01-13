import { css } from '@emotion/react'
import PostView from '../../components/PostView'
import SponsorView from '../../components/SponsorView'
type HomeProps = {}

function Home({}: HomeProps) {
  return (
    <div css={baseStyle}>
      <PostView />
      <SponsorView />
    </div>
  )
}

const baseStyle = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
`

export default Home
