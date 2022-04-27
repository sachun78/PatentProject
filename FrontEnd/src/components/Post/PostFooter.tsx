import { css } from '@emotion/react'
import useToggle from 'hooks/useToggle'
import { IComment, User } from 'lib/api/types'
import { brandColor } from 'lib/palette'
import React, { useEffect, useState } from 'react'
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import PostComment from './PostComment'

export type PostFooterProps = {
  _id: string
  contents: string
  isLike?: boolean
  owner_thumb: string
  owner_username: string
  comment: IComment[]
  like_cnt: number
  images: string[]
  createdAt: Date
}

function PostFooter({
  _id,
  contents,
  isLike = false,
  like_cnt,
  comment,
  images,
  owner_thumb,
  owner_username,
  createdAt,
}: PostFooterProps) {
  const qc = useQueryClient()
  const [likeClick, onToggleLike] = useToggle(isLike)
  const user = qc.getQueryData<User>('user') as User
  // 임시 true 처리
  const [owner, setOwner] = useState(true)
  const [editComment, setEditComment] = useState('')

  const viewComments = comment.filter(
    (comments: IComment) => comment.indexOf(comments) < 2
  )

  useEffect(() => {
    if (_id === user.id) {
      setOwner(true)
    }
  }, [])

  const onLike = () => {
    if (!likeClick) {
      // like = like + 1
    } else {
      // like = like
    }
    onToggleLike()
  }

  return (
    <div css={footerStyle /*flex*/}>
      <div css={buttonWrapper}>
        <div className={'item'} onClick={onLike}>
          {likeClick ? <BsHeartFill className={'filled'} /> : <BsHeart />}
          {/* {like + Number(likeClick)} */}
        </div>
        <Link
          to={`/postDetail/${_id}`}
          state={{
            _id: _id,
            images: images,
            owner_username: owner_username,
            owner_thumb: owner_thumb,
            like_cnt: like_cnt,
            comment: comment,
            createdAt: createdAt,
            contents: contents,
          }}
        >
          <div className={'item'}>
            <BsChatLeftDots /> {comment.length}
          </div>
        </Link>
      </div>
      {viewComments.length === 0 ? (
        <div></div>
      ) : (
        <div css={commentStyle}>
          {viewComments.map((viewComment: IComment) => (
            <PostComment
              key={viewComment.id}
              viewComment={viewComment}
              _id={_id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const commentStyle = css`
  font-weight: 400;
  font-size: 0.5rem;
  letter-spacing: 0.00938em;
  border: thick solid #dddddd;
  position: relative;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1.5625rem;
  font: normal normal bold 14px/16px NanumBarunGothic;
  background: #fff;
`
const footerStyle = css`
  display: flex;
  flex-direction: column;
  margin: 2.8125rem 1.875rem 0;
`
const buttonWrapper = css`
  display: flex;
  margin-bottom: 1.25rem;
  user-select: none;

  .item {
    height: 1.875rem;
    width: 5.5625rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 1.5rem;
    border: 1px solid #c9c9c9;
    background: #fff;
    color: #333333;
    margin-right: 10px;
    cursor: pointer;

    svg {
      width: 1rem;
      height: 0.8125rem;
      margin-right: 5px;
    }

    .filled {
      fill: ${brandColor};
    }
  }
`

export default PostFooter
