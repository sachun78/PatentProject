import { css } from '@emotion/react'
import React from 'react'

type PostProps = {
  id: string
  contents: string
}

function Post({ id, contents }: PostProps) {
  return (
    <div css={postStyle} className='post'>
      post post
    </div>
  )
}

const postStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default Post
