import { css } from '@emotion/react'
import { Button, Comment, Tooltip, Avatar } from 'antd'
import moment from 'moment'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons'
import React, { createElement, useState } from 'react'

type PostProps = {
  id: string
  contents: string
}

function Post({ id, contents }: PostProps) {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState('')

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  return (
    <div css={postStyle} className="post">
      <div css={memberIDStyle}>{id}</div>
      <div
        css={css`
          background-color: yellow;
          margin-bottom: 0.5rem;
          height: 5rem;
        `}
      >
        {contents}
      </div>
      <Button
        css={css`
          width: 10%;
          margin-bottom: 0.5rem;
        `}
        type="primary"
      >
        Like
      </Button>
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  )
}

const postStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const memberIDStyle = css`
  font-weight: bold;
  line-height: 1.5rem;
  font-size: 1rem;
`

export default Post
