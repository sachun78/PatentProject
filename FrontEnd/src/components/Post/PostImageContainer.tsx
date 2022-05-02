import { css } from '@emotion/react'
import { Box, ImageList, ImageListItem } from '@mui/material'
import { height } from '@mui/system'
import React from 'react'
import { API_PATH } from '../../lib/api/client'

type postImageContainerProps = {
  images: string[]
}

const PostImageContainer = ({ images }: postImageContainerProps) => {
  const imageHeight = images.length < 3 ? '340px' : '170px'
  const imageWidth = images.length < 2 ? '640px' : '320px'

  return (
    <div css={imageContainerStyle}>
      {images.length === 0 ? (
        <></>
      ) : images.length === 1 ? (        
          <>
            <ImageList variant="masonry" cols={1} gap={10} sx={{ width: `640px`, height: `340px`, borderRadius: '1rem', overflow: 'hidden' }}>
              {images?.map((image: any) => (
                <div key={image} style={{ width: `${imageWidth}`, height: `${imageHeight}`, objectFit: 'cover' }}>
                  <ImageListItem key={image} sx={{ width: '100%', height: '100%' }}>
                    <img
                      src={`${API_PATH}static/${image}`}
                      loading="lazy"
                      style={{
                        borderRadius: '1rem',
                      }}
                      crossOrigin="anonymous"
                    />
                  </ImageListItem>
                </div>
              ))}
            </ImageList>
          </>        
      ) : images.length === 2 ? (      
        <ImageList variant="masonry" cols={2} gap={10} sx={{ width: `640px`, height: `340px`, borderRadius: '1rem', position: 'relative', overflow: 'hidden'}}>
          {images?.map((image: any) => (              
              <ImageListItem key={image} sx={{ width: '310px', height: '340px' }}>
                <img
                  src={`${API_PATH}static/${image}`}
                  loading="lazy"
                  style={{
                    
                    borderRadius: '1rem',
                    width: '310px',
                    height: '340px',
                    overflow: 'hidden'
                  }}
                  crossOrigin="anonymous"
                />
              </ImageListItem>              
          ))}
        </ImageList>      
      ) :      
      <ImageList variant="masonry" cols={2} gap={10} sx={{ width: `640px`, borderRadius: '1rem', position: 'relative', overflow: 'hidden'}}>
          {images?.map((image: any) => (       
            <div key={image} style={{width: '320px'}}>
              <ImageListItem key={image} sx={{ width: '100%'}}>
                <img
                  src={`${API_PATH}static/${image}`}
                  loading="lazy"
                  style={{                    
                    borderRadius: '1rem',                    
                  }}
                  crossOrigin="anonymous"
                />
              </ImageListItem>              
              </div>       
          ))}
        </ImageList>      
    
    }
    </div>
  )
}

export default PostImageContainer

const imageContainerStyle = css`
  max-height: 40rem;
  display: flex;
  justify-content: center;
  margin: 1.25rem 1.875rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
`
