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

type postTextContainerProps = {
  contents: string
}

function PostTextContainer({ contents }: postTextContainerProps) {
  const quillElement = useRef<any>(null)
  const quillInstance = useRef<any>(null)

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      readOnly: true
    })

    quillInstance.current.root.innerHTML = `${contents}`
  }, [])
  
  return (    
    <div ref={quillElement} css={bodyStyle}></div>       
      
  )
}

const bodyStyle = css`
  padding: 0 1.875rem;
  font: normal normal 800 14px 'NanumSquare';
  line-height: 1.142857143;
  color: #000;
  /* white-space: pre-wrap */
  `

export default PostTextContainer
