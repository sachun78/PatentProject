import { css } from '@emotion/react'
import { ImageList, ImageListItem } from '@mui/material'
import { usePost } from 'lib/api/post/usePost'
import { IComment } from 'lib/api/types'
import media from 'lib/styles/media'
import React from 'react'
import { Link } from 'react-router-dom'
import { writer } from 'repl'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

type PostProps = {

  index: number
  id: string
  text: string
  like: number
  comments: IComment[]
  writer: string
  created_at: Date
  isLike?: boolean  
  // post: IPost
}

function Post({ index, id, isLike = false }: PostProps) {
  const post = usePost(index);
  const { writer, created_at, text, comments, like } = post  
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
      <PostHeader writer={writer} created_at={created_at} />
      <Link
        to={`/postDetail/${id}`}
        state={{
          postNumber: index,
          imageData: imageData          
        }}
      >
      <figure>
        <ImageList variant='masonry' cols={3} gap={8}>
          {imageData.map((image: any) => (
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
        {text}
      </div>
      </Link>
      <PostFooter id={id} index={index} comments={comments} like={like} isLike={isLike} imageData={imageData} />
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