import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { IComment, IPost, User } from '../../lib/api/types';
import useToggle from 'hooks/useToggle'
import useInput from 'hooks/useInput'
import media from 'lib/styles/media'
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs';
import { brandColor } from 'lib/palette';
import { Avatar, OutlinedInput } from '@mui/material';
import gravatar from 'gravatar'
import { inputStyle } from 'components/ProfileMenu/styles';

type postDetailProps = {
    isLike?: boolean
}

function PostDetail({ isLike = false }: postDetailProps) {   

    const qc = useQueryClient();
    const location: any = useLocation();
    const { id } = location.state as any;
    const posts = qc.getQueryData('posts') as IPost[];
    const post = posts[Number(id) - 1]
    const { title, text, writer, created_at, comments, like } = post
    const [commentVisible, onToggleComment] = useToggle(false)
    const [comment, onChangeComment, setComment] = useInput('')
    const [likeClick, onToggleLike] = useToggle(isLike)  
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData<User>('user') as User    
    // 임시    
    
    const onKeyPress = (e: any) => {
      if(e.key === "Enter") {
        e.preventDefault();
        comments.push({
          id: String(comments.length + 1),
          text: comment,
          writer: user.username
        })
        setComment("")
      }  
    }

    return (    
      <div css={wrapStyle}>
        <div css={detailStyle}>
          <div css={titleStyle}>
            <h4><span>{title}</span></h4>                
            <div className='time-date'>{created_at.toDateString()}</div>
          </div>
          <div>{writer}</div>
        </div>      
        <div>{text}</div>
        <div css={buttonWrapper}>
          <div className={'item'} onClick={onToggleLike}>
            {likeClick ? <BsHeartFill className={'filled'} /> : <BsHeart />}
            {like + Number(likeClick)}
          </div>     
          <div className={'item'} onClick={onToggleComment}>
            <BsChatLeftDots /> {comments.length}
          </div>      
        </div>
        {commentVisible && <div>
          <OutlinedInput placeholder={'Write your comment'} value={comment} onChange={onChangeComment}
                       onKeyPress={onKeyPress}
                       fullWidth multiline
                       sx={{ borderRadius: '1rem', paddingLeft: '1.25rem' }}
                       startAdornment={<Avatar alt='post-user-avatar'
                                               src={gravatar.url('ryanhe4@gmail.com',
                                                 { s: '44px', d: 'retro' })}
                                               sx={{ width: 44, height: 44, mr: '25px' }} />} />
                                               </div>}

        {comments.map((comment: IComment) => (
          <div>
            {comment.text}
          </div>            
        ))}      
      </div>
    );
};

export default React.memo(PostDetail)
const wrapStyle = css`    
    display: flex;    
    flex-direction: column;    
    margin-bottom: 1.6rem;
    background: #fff;
    box-shadow: 0 3px 6px #00000029;
    border-radius: 1rem;
    position: relative;
    opacity: 0.8;
`
const detailStyle = css`    
    display: flex;
    padding-top: 1.875rem;
    padding-left: 1.875rem;
    padding-right: 1.875rem;    
    align-items: flex-start;
`
const titleStyle=css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: -5px;
    margin-bottom: -5px;
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