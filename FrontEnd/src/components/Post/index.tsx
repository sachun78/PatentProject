import { css } from '@emotion/react'
import { Box, ImageList, ImageListItem } from '@mui/material'
import { IComment } from 'lib/api/types'
import media from 'lib/styles/media'
import React from 'react'
import { Link } from 'react-router-dom'
import { API_PATH } from '../../lib/api/client'
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
  
  return (
    <div css={postStyle}>
      <PostHeader owner_username={owner_username} owner_thumb={owner_thumb} createdAt={createdAt} />
      <Link to={`/postDetail/${_id}`}>
        <figure>
          {images.length === 0 ? (<></>) : (
            <Box sx={{ width: 690, height: 300, overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={3} gap={1} >
              {images?.map((image: any) => (              
                <ImageListItem                
                  key={image}
                  sx={{ width: "100%" }}                  
                  >
                  <img                 
                    src={`${API_PATH}static/${image}`}
                    loading="lazy"
                    style={{
                      borderRadius: '1rem',
                    }}
                    crossOrigin="anonymous"
                    
                  />
                </ImageListItem>
                
              ))}
            </ImageList>
          </Box>  
          )}
                             
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
