import { css } from '@emotion/react'
import { ImageList, ImageListItem } from '@mui/material'
import { getPost } from 'lib/api/post/getPost'
import { IComment } from 'lib/api/types'
import media from 'lib/styles/media'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

type PostProps = {
  _id: string
  owner_username: string
  owner_thumb: string
  owner_id: string
  like_cnt: number
  contents: string
  comment: IComment[]
  images: string[]
  createdAt: Date
  isLike?: boolean
}

function Post({
  _id,
  isLike = false,
  owner_username,
  owner_thumb,
  owner_id,
  like_cnt,
  comment,
  images,
  createdAt,
  contents,
}: PostProps) {
  const { data: post, isLoading } = useQuery(['post', _id], getPost, {
    retry: false,
  })

  return (
    <div css={postStyle}>
      <PostHeader
        owner_username={owner_username}
        owner_thumb={owner_thumb}
        createdAt={createdAt}
      />
      <Link
        to={`/postDetail/${_id}`}
        state={{
          _id: _id,
          images: images,
          owner_username: owner_username,
          owner_thumb: owner_thumb,
          like_cnt: like_cnt,
          comment: comment,
          createdAt: createdAt,
          contents: contents,
          owner_id: owner_id
        }}
      >
        <figure>
          <ImageList variant="masonry" cols={3} gap={8}>
            {images?.map((image: any) => (
              <ImageListItem key={image}>
                <img
                  width="100%"
                  height="100%"
                  src={'http://localhost:8080/static/' + image}
                  loading="lazy"
                  style={{
                    borderRadius: '1rem',
                  }}
                  crossOrigin="anonymous"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </figure>
        <div css={bodyStyle}>{contents}</div>
      </Link>
      <PostFooter
        _id={_id}
        contents={contents}
        owner_thumb={owner_thumb}
        owner_username={owner_username}
        comment={comment}
        like_cnt={like_cnt}
        isLike={isLike}
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

  figure {
    max-height: 40rem;
    display: flex;
    justify-content: center;
    margin: 1.25rem 1.875rem;
    border-radius: 1rem;
    overflow: hidden;
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
