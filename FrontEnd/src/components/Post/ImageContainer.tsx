import { css } from '@emotion/react'
import { Box, ImageList, ImageListItem, Modal } from '@mui/material'
import React, { useState } from 'react'

type imageContainerProps = {
  images: string[]
  isDetail: boolean  
}

type IImage = {
  img: string
  cols: number
  rows: number
}

const ImageContainer = ({ images, isDetail } : imageContainerProps) => {  
  
  const [open, setOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('')    
  
  const handleOpen = (e: any) => {
    setImgSrc(e.target.src)
    setOpen(true)
  }
  
  const handleClose = () => setOpen(false)
  
  const imageData: IImage [] = []    

  images.map((img: string, idx) => {
    images.length === 1 ? imageData.push({ img: img, cols: 2, rows: 2 }) :
    images.length === 2 ? imageData.push({ img: img, cols: 1, rows: 2 }) :
    images.length === 4 ? imageData.push({ img: img, cols: 1, rows: 1 }) : 
    idx === 0 ? imageData.push({ img: img, cols: 1, rows: 2 }) : imageData.push({ img: img, cols: 1, rows: 1 })

  })     

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    }
  }

  if(isDetail) {
    return (
    <>
    {images.length === 0 ? <div></div> : 
    <ImageList
      sx={{height: 340, justifyContent: "center", position: "relative", margin: "0 30px", borderBottom: '1px solid #888'  }}
      variant="quilted"
      cols={2}
      rowHeight={166}      
    >
      {imageData.map((item, idx) => (
        <ImageListItem key={idx} cols={item.cols || 1} rows={item.rows || 1} sx={{ borderRadius: "1rem "}}>          
          <img
            {...srcset(item.img, 300, item.rows, item.cols)}
            // height="100%"
            loading="lazy"
            style={{borderRadius: '1rem', cursor: 'zoom-in'}}
            crossOrigin="anonymous"
            onClick={handleOpen}  
          />                    
          <Modal open={open} onClose={handleClose} css={modalStyle}>
            <Box css={boxWrapper}>
              <img src={imgSrc} css={imageStyle} crossOrigin="anonymous" />
            </Box>
          </Modal>
        </ImageListItem>
      ))}
    </ImageList>
    }
    </>)
  }

  return (
    <>
    {images.length === 0 ? <div></div> : 
    <ImageList
      sx={{ height: 340, justifyContent: "center", position: "relative", margin: "0 30px", borderBottom: '1px solid #888'  }}
      variant="quilted"
      cols={2}
      rowHeight={166}      
    >
      {imageData.map((item, idx) => (
        <ImageListItem key={idx} cols={item.cols || 1} rows={item.rows || 1} sx={{ borderRadius: "1rem "}}>
          
          <img
            {...srcset(item.img, 300, item.rows, item.cols)}
            // height="100%"
            loading="lazy"
            style={{borderRadius: '1rem'}}
            crossOrigin="anonymous"
          />
        </ImageListItem>
      ))}
    </ImageList>
    }
    </>
  )  
}

export default ImageContainer

const modalStyle = css`
  .MuiBackdrop-root {
    background: rgba(0, 0, 0, -1);
  }
`

export const boxWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 400px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(0, 0, 0, -1);
`
const imageStyle = css`
  width: 100%;
  height: 100%;  
  border-radius: 1rem;
`