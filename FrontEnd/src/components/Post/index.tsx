import { css } from '@emotion/react'
import { IComment, IPost } from 'lib/api/types'
import 'quill/dist/quill.bubble.css'
import React from 'react'
import { Link } from 'react-router-dom'
import ImageContainer from './ImageContainer'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostTextContainer from './PostTextContainer'

type PostProps = {
  post: IPost  
  _id: string
  owner_username: string
  owner_email: string  
  like_cnt: string[]  
  comment: IComment[]
  images: string[]
  createdAt: Date
  owner_id: string
  contents: string

}

function Post({ post, _id, owner_username, owner_email, owner_id, like_cnt, contents, comment, images, createdAt }: PostProps) {
  return (
    <div css={postStyle}>
      <PostHeader owner_username={owner_username} owner_email={owner_email} createdAt={createdAt} owner_id={owner_id} _id={_id}  />
      <Link className="detail" to={`/postDetail/${_id}`}>
        <ImageContainer images={images} isDetail={false} />
        <PostTextContainer contents={contents} />
      </Link>
      <PostFooter        
        post={post}
        _id={_id}                
        comment={comment}
        like_cnt={like_cnt}                
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
