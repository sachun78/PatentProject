import { css } from '@emotion/react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import React, { useEffect, useRef } from 'react'

type postTextContainerProps = {
  contents: string
}

function PostTextContainer({ contents }: postTextContainerProps) {
  const quillElement = useRef<any>(null)
  const quillInstance = useRef<any>(null)

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      readOnly: true,
    })
    quillInstance.current.root.innerHTML = `${contents}`
  }, [])

  useEffect(() => {
    quillInstance.current.root.innerHTML = `${contents}`
  }, [contents])

  return <div ref={quillElement} css={bodyStyle}></div>
}

const bodyStyle = css`
  padding: 0 1.875rem;
  line-height: 1.142857143;
  color: #6c6c6c;

  .ql-editor {
    padding: 0;
    font: normal normal normal 14px NanumSquareOTF;
  }
`
export default PostTextContainer
