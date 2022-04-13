import { css } from '@emotion/react';
import { Avatar, OutlinedInput } from '@mui/material';
import gravatar from 'gravatar';
import useInput from 'hooks/useInput';
import useToggle from 'hooks/useToggle';
import { usePost } from 'lib/api/post/usePost';
import { usePosts } from 'lib/api/post/usePosts';
import { brandColor } from 'lib/palette';
import React, { useEffect, useState } from 'react';
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { IComment, User } from '../../lib/api/types';
import PostActionButtons from './PostActionButtons';

type postDetailProps = {
    isLike?: boolean 
}

function PostDetail({ isLike = false }: postDetailProps) {   

    const qc = useQueryClient();
    const location: any = useLocation();    
    const { postNumber } = location.state as any;        
    const post = usePost(postNumber)
    const { title, text, writer, created_at, like, comments } = post
    const [commentVisible, onToggleComment] = useToggle(false)
    const [comment, onChangeComment, setComment] = useInput('')
    const [likeClick, onToggleLike] = useToggle(isLike)      
    const user = qc.getQueryData<User>('user') as User
    // 임시 트루
    const [owner, setOwner] = useState(true);

    useEffect(() => {
      if(post.writer === user.username) {
        setOwner(true);
      }
    },[])

    const onLike = () => {
      onToggleLike()
      if(!likeClick) {
        post.like = like + 1        
      } else {
        post.like = like - 1
      }
    }

    const onKeyPress = (e: any) => {
      if(e.key === "Enter") {        
        e.preventDefault();
        comments.push({
          id: String(comments.length + 1),
          text: comment,
          writer: user.username,
          created_at: new Date()
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
          <div className={'item'} onClick={onLike}>
            {likeClick ? <BsHeartFill className={'filled'} /> : <BsHeart />}
            {like}
          </div>     
          <div className={'item'} onClick={onToggleComment}>
            <BsChatLeftDots /> {comments.length}
          </div>
          {owner &&
          <PostActionButtons id={postNumber} />      
          
          }
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
          <div key={comment.id}>
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
