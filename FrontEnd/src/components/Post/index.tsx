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
// import Parser from 'html-react-parser';
// import ReactQuill from 'react-quill';




type PostProps = {
  _id: string
  owner_username: string
  owner_thumb: string
  owner_id: string
  like_cnt: string[]
  contents: string
  comment: IComment[]
  images: string[]
  createdAt: Date
}

function Post({ _id, owner_username, owner_thumb, like_cnt, comment, images, createdAt, contents }: PostProps) {
  const quillElement = useRef<any>(null)
  const quillInstance = useRef<any>(null)

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      readOnly: true,            
      modules: {
        toolbar: {          
        },
      },
    })

    const quill = quillInstance.current
    
    quill.root.innerHTML = `${contents}`

    
  }, [])
  // const ReactMarkdown = require("react-markdown/with-html");
  console.log(contents)
  return (
    <div css={postStyle}>
      <PostHeader owner_username={owner_username} owner_thumb={owner_thumb} createdAt={createdAt} />
      <Link to={`/postDetail/${_id}`}>
        {/* <ImageContainer /> */}
        <PostImageContainer images={images} />
        <div ref={quillElement} style={{ color: "black" }} css={bodyStyle}></div>
        {/* <div css={bodyStyle} dangerouslySetInnerHTML={{ __html: `${contents}`}}></div> */}
        {/* <div css={bodyStyle}>{contents}</div> */}
        {/* <div css={bodyStyle}>{Parser(`${contents}`)}</div> */}
        {/* <ReactQuill value={contents} readOnly={true}/> */}
        {/* <ReactMarkdown scapeHtml={false} source={contents} /> */}
         
      </Link>
      <PostFooter
        _id={_id}
        contents={contents}
        owner_thumb={owner_thumb}
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
const bodyStyle = css`
  padding: 0 1.875rem;
  font: normal normal 800 14px 'NanumSquare';
  line-height: 1.142857143;
  color: #333333;
  /* white-space: pre-wrap */
  `

export default Post
