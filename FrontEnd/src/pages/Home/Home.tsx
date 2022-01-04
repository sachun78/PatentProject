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
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 6rem);
`

export default Home
