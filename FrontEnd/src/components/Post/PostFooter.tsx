import { css } from '@emotion/react'
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs'
import useToggle from 'hooks/useToggle'
import useInput from 'hooks/useInput'
import { Avatar, OutlinedInput } from '@mui/material'
import { inputStyle } from 'pages/Login/styles'
import React from 'react'
import gravatar from 'gravatar'
import { brandColor } from 'lib/palette'
import { IComment } from 'lib/api/types'

export type PostFooterProps = {
  like: number
  comments: IComment[]
  isLike?: boolean
}

function PostFooter({ like, isLike = false, comments }: PostFooterProps) {
  const [commentVisible, onToggleComment] = useToggle(false)
  const [comment, onChangeComment] = useInput('')
  const [likeClick, onToggleLike] = useToggle(isLike)

  return <div css={footerStyle /*flex*/}>
    <div css={buttonWrapper}>
      <div className={'item'} onClick={onToggleLike}>
        {likeClick ? <BsHeartFill className={'filled'} /> : <BsHeart />}
        {like + Number(likeClick)}
      </div>
      <div className={'item'} onClick={onToggleComment}>
        <BsChatLeftDots /> {comments.length}
      </div>
    </div>
    {commentVisible
      && <div css={commentStyle}>
        <OutlinedInput placeholder={'Write your comment'} value={comment} onChange={onChangeComment}
                       css={inputStyle} fullWidth multiline
                       sx={{ borderRadius: '1rem', paddingLeft: '1.25rem' }}
                       startAdornment={<Avatar alt='post-user-avatar'
                                               src={gravatar.url('ryanhe4@gmail.com',
                                                 { s: '44px', d: 'retro' })}
                                               sx={{ width: 44, height: 44, mr: '25px' }} />} />
      </div>}
  </div>
}

const footerStyle = css`
  display: flex;
  flex-direction: column;
  margin: 2.8125rem 1.875rem 0;
`

const commentStyle = css`
  margin-bottom: 1.875rem;

  .MuiOutlinedInput-root {
    margin: 0;
    color: #9C9C9C;
    font: normal normal normal 16px 'NanumSquare';
    line-height: 1.125;
  }
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
    border: 1px solid #C9C9C9;
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
