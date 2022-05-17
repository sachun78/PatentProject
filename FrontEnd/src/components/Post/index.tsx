import { css } from '@emotion/react'
import { IComment } from 'lib/api/types'
import 'quill/dist/quill.bubble.css'
import React from 'react'
import { Link } from 'react-router-dom'
import ImageContainer from './ImageContainer'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostTextContainer from './PostTextContainer'

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

function Post({ _id, owner_username, owner_email, like_cnt, comment, images, createdAt, contents, owner_id }: PostProps) {
  return (
    <div css={postStyle}>
      <PostHeader owner_username={owner_username} owner_email={owner_email} createdAt={createdAt} _id={_id} owner_id={owner_id}/>
      <Link className="detail" to={`/postDetail/${_id}`}>
        <ImageContainer images={images} isDetail={false} />
        <PostTextContainer contents={contents} />
      </Link>
      <PostFooter
        _id={_id}
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

  .detail {
    z-index: -1;
  }
`
export default Post
