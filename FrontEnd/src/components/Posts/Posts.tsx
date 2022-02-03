import { css } from '@emotion/react'
import Post from './Post'
type PostViewProps = {}

function Posts({}: PostViewProps) {
  return (
    <div css={postViewStyle}>
      <div >
        노출할 포스트 타입 선택기
      </div>
    </div>
  )

}

const postViewStyle = css`
  height: 100%;
  background: #fff;
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
  padding-top: 1rem;
`

const growStyle = css`
  flex-grow: 1;
`

export default Posts
