import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Post from './Post'
import palette from '../../lib/palette'

type PostViewProps = {}

// Temporary Post & MemberID Data
const TestDATA = [
  {
    id: "member1's ID",
    contents: "Post1's Contents",
  },
  {
    id: "member2's ID",
    contents: "Post2's Contents",
  },
]

function PostView({}: PostViewProps) {
  return (
    <div css={postViewStyle}>
      <div css={sortButtonStyle}>
        <span>Sorting Option</span>
        <Button css={growStyle}>button1</Button>
        <Button css={growStyle}>button2</Button>
        <Button css={growStyle}>button3</Button>
        <Button css={growStyle}>button4</Button>
        <Button css={growStyle} type="primary">
          <Link to={'/search'}>검색</Link>
        </Button>
      </div>
      <Post id={TestDATA[0].id} contents={TestDATA[0].contents} />
      <Post id={TestDATA[1].id} contents={TestDATA[1].contents} />
    </div>
  )
}

const postViewStyle = css`
  height: 100%;
  background: ${palette.grey[50]};
  flex: 4;
  border-right: 1px solid ${palette.grey[200]};
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  .post + .post {
    margin-top: 0.5rem;
  }
`

const sortButtonStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 5rem;

  a {
    text-decoration: none;
    color: black;
  }
  > span {
    font-size: 1rem;
    margin-right: 0.5rem;
    font-weight: bold;
    width: 3.5rem;
    line-height: 1rem;
    background: whitesmoke;
    flex-grow: 1;
    text-align: center;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-radius: 0.5rem;
    user-select: none;
  }
`

const growStyle = css`
  flex-grow: 1;
`

export default PostView
