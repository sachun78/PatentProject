import { css } from '@emotion/react'
import InitialInputModal from '../../components/InitialInputModal'
import HomeTab from '../../components/HomeTab'
import Post from '../../components/Post/'
import media from '../../lib/styles/media'

type HomeProps = {}

function Home({}: HomeProps) {
  return (
    <div css={baseStyle}>
      <div css={postViewStyle}>
        <HomeTab />
        {/*  POST BLOCK */}
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <InitialInputModal />
    </div>
  )
}

const baseStyle = css`
  height: 100%;
`

const postViewStyle = css`
  min-height: calc(100vh - 7rem);
  min-width: 68rem;
  height: 100%;
  margin-left: 1.5rem;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${media.small} {
    margin-right: 0;
  }
`

export default Home
