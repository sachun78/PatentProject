import { css } from '@emotion/react'
import { useRef } from 'react'
import HomeTab from '../HomeTab'
import Post from './Post'
import media from '../../lib/styles/media'

type PostViewProps = {}

function Posts({}: PostViewProps) {
  return (
    <div css={postViewStyle}>
      <HomeTab />
      {/*  POST BLOCK */}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )

}

const postViewStyle = css`
  min-height: calc(100vh - 7rem);
  min-width: 68rem;
  height: 100%;
  margin-left: 1.5rem;
  margin-right: 20rem;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.small} {
    margin-right: 0;
  }
`

export default Posts
