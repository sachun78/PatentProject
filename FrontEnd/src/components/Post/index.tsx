import { css } from '@emotion/react'
import { ImageList, ImageListItem } from '@mui/material'
import { IComment } from 'lib/api/types'
import media from 'lib/styles/media'
import React from 'react'
import { Link } from 'react-router-dom'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

type PostProps = {
  
  id: string
  owner_username: string
  owner_thumb: string
  like_cnt: number
  contents: string
  comment: IComment[]
  images: string[]
  createdAt: Date
  isLike?: boolean
   
}

function Post({ id, isLike = false, owner_username, owner_thumb, like_cnt, comment, images, createdAt, contents}: PostProps) {

  const imageData = [] as any;  
  
  for(let i = 0; i < 9; i++) {
    imageData.push({
      imageId: i,
      src: 'https://picsum.photos/810/300?random=' + i,
      alt: 'image' + i
    })
  } 

  return (
    <div css={postStyle}>      
      <PostHeader owner_username={owner_username} owner_thumb={owner_thumb} createdAt={createdAt} />
      <Link
        to={`/postDetail/${id}`}
        state={{
          id: id,
          images: imageData,
          owner_username: owner_username,
          owner_thumb: owner_thumb,
          like_cnt: like_cnt,
          comment: comment,
          createdAt: createdAt,
          contents: contents,          
        }}
      >
      <figure>
        <ImageList variant='masonry' cols={3} gap={8}>
          {imageData?.map((image: any) => (
            <ImageListItem key={image.imageId}>
              <img 
                src={image.src}
                alt={image.alt}
                loading="lazy"
                style={{
                  borderRadius: "1rem"
                }}
              />
            </ImageListItem> 
          ))}
        </ImageList>      
      </figure>      
      <div css={bodyStyle}>
        {contents}
      </div>
      </Link>      
      <PostFooter id={id} contents={contents} owner_thumb={owner_thumb} owner_username={owner_username} comment={comment} like_cnt={like_cnt} isLike={isLike} imageData={imageData} createdAt={createdAt}/>
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
  a:link, a:visited, a:hover {
    text-decoration: none;
    cursor: pointer;
  }

  figure {
    max-height: 40rem;    
    display: flex;
    justify-content: center;    
    margin: 1.25rem 1.875rem;
    border-radius: 1rem;
    overflow:hidden;
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