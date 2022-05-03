import { css } from '@emotion/react'
import { IComment } from 'lib/api/types'
import media from 'lib/styles/media'
import React from 'react'
import { Link } from 'react-router-dom'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostImageContainer from './PostImageContainer'

type PostProps = {
  _id: string
  owner_username: string
  owner_email: string
  owner_id: string
  like_cnt: string[]
  contents: string
  comment: IComment[]
  images: string[]
  createdAt: Date
}

function Post({ _id, owner_username, owner_email, like_cnt, comment, images, createdAt, contents }: PostProps) {
  return (
    <div css={postStyle}>
      <PostHeader owner_username={owner_username} owner_email={owner_email} createdAt={createdAt} />
      <Link to={`/postDetail/${_id}`}>
        <PostImageContainer images={images} />
        <div css={bodyStyle}>{contents}</div>
      </Link>
      <PostFooter
        _id={_id}
        contents={contents}
        owner_thumb={owner_email}
        owner_username={owner_username}
        comment={comment}
        like_cnt={like_cnt}
        images={images}
        createdAt={createdAt}
      />
    </div>
  )
}

const postStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
  background: #fff;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 1rem;
  position: relative;
  opacity: 0.8;
  width: 100%;

  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    cursor: pointer;
  }

  ${media.small} {
    margin-right: 1rem;
  }
`
const bodyStyle = css`
  padding: 0 1.875rem;
  font: normal normal 800 14px 'NanumSquare';
  line-height: 1.142857143;
  color: #333333;
`

export default Post
