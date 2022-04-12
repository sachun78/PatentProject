import { css } from '@emotion/react'
import { Avatar, OutlinedInput } from '@mui/material'
import gravatar from 'gravatar'
import useToggle from 'hooks/useToggle'
import { IComment, IPost } from 'lib/api/types'
import { brandColor } from 'lib/palette'
import React from 'react'
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

export type PostFooterProps = {
  id: string  
  isLike?: boolean  
}

function PostFooter({ id, isLike = false }: PostFooterProps) {

  const qc = useQueryClient();
  const posts = qc.getQueryData('posts') as IPost[];
  const { comments, like } = posts[Number(id) - 1]

  const [likeClick, onToggleLike] = useToggle(isLike)  
  const viewComments = comments.filter((comment: IComment) => (Number(comment.id) < 3)) 

  return <div css={footerStyle /*flex*/}>
    <div css={buttonWrapper}>
      <div className={'item'} onClick={onToggleLike}>
        {likeClick ? <BsHeartFill className={'filled'} /> : <BsHeart />}
        {like + Number(likeClick)}
      </div>
      <Link
        to={`/postDetail/${id}`}
        state={{
          id: id          
        }}
      >
        <div className={'item'}>
          <BsChatLeftDots /> {comments.length}
        </div>
      </Link>
    </div>     
    <div css={commentStyle}>
      {viewComments.map((comment: IComment) => (
      <OutlinedInput key={comment.id} placeholder={'Write your comment'} value={comment.text}
        fullWidth multiline
        sx={{ borderRadius: '1rem', paddingLeft: '1.25rem' }}
        startAdornment={<Avatar alt='post-user-avatar'
                                src={gravatar.url('temp.email' + comment.id,
                                  { s: '44px', d: 'retro' })}
                                sx={{ width: 22, height: 22, mr: '25px' }} />} 
      />         
      ))}
    </div>
  </div>
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
