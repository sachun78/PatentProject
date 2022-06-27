import { ImageList, ImageListItem } from '@mui/material'
import React from 'react'

type imageContainerProps = {
  images: string[]
}

type IImage = {
  img: string
  cols: number
  rows: number
}

const ImageContainer = ({ images }: imageContainerProps) => {
  const imageData: IImage[] = []

  images.map((img: string, idx) => {
    images.length === 1
      ? imageData.push({ img: img, cols: 2, rows: 2 })
      : images.length === 2
      ? imageData.push({ img: img, cols: 1, rows: 2 })
      : images.length === 4
      ? imageData.push({ img: img, cols: 1, rows: 1 })
      : idx === 0
      ? imageData.push({ img: img, cols: 1, rows: 2 })
      : imageData.push({ img: img, cols: 1, rows: 1 })
  })

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}`,
      srcSet: `${image}`,
    }
  }

  return (
    <>
      {images.length === 0 ? null : (
        <ImageList
          sx={{
            justifyContent: 'center',
            position: 'relative',
            margin: '0 30px 1.25rem',
            border: '1px solid #F2F2F2',
            borderRadius: '1rem',
          }}
          variant="quilted"
          cols={2}
          rowHeight={'auto'}
        >
          {imageData.map((item, idx) => (
            <ImageListItem key={idx} cols={item.cols || 1} rows={item.rows || 1} sx={{ borderRadius: '1rem' }}>
              <img
                {...srcset(item.img, 300, item.rows, item.cols)}
                loading="lazy"
                style={{ borderRadius: '1rem', objectFit: 'fill' }}
                crossOrigin="anonymous"
                alt={'post-img-list'}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </>
  )
}

export default ImageContainer
