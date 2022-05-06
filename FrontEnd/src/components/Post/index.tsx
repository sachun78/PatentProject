import { css } from '@emotion/react'
import { IComment } from 'lib/api/types'
import media from 'lib/styles/media'
import Quill from 'quill'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ImageContainer from './ImageContainer'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostImageContainer from './PostImageContainer'
import 'quill/dist/quill.bubble.css'
import PostTextContainer from './PostTextContainer'
import { useQuery } from 'react-query'
import { getPost } from 'lib/api/post/getPost'

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
  
  const { data: post, isLoading } = useQuery(['post', _id], getPost, {
    enabled: !!_id,
    retry: false,
  })


  return (
    <div css={postStyle}>
      <PostHeader owner_username={owner_username} owner_email={owner_email} createdAt={createdAt} />
      <Link to={`/postDetail/${_id}`}>
        <ImageContainer images={images} isDetail={false} />
        {/* <PostImageContainer images={images} /> */}
        <PostTextContainer contents={contents} />      
         
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
export default Post
