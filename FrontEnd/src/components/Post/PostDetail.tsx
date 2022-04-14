import { css } from '@emotion/react';
import { Avatar, OutlinedInput } from '@mui/material';
import gravatar from 'gravatar';
import useInput from 'hooks/useInput';
import useToggle from 'hooks/useToggle';
import { usePost } from 'lib/api/post/usePost';
import { usePosts } from 'lib/api/post/usePosts';
import { brandColor } from 'lib/palette';
import media from 'lib/styles/media';
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
    const posts = usePosts()
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
        posts[postNumber] = post
        qc.setQueryData('posts', posts)
        setComment("")
      }  
    }

    return (<>
      <div css={wrapStyle}>
        <div css={detailStyle}>
          <div css={iconStyle}>
            <Avatar alt='user-avatar' src={gravatar.url('test.email', { s: '60px', d: 'retro' })}
               sx={{ width: 60, height: 60 }} />
          </div>
          <div css={titleStyle}>
            <h4><span>{writer}/ etc ..</span></h4>
            <div className={'time-date'}>{created_at.toDateString()}</div>
          </div>
        <div>{title}</div>
      </div>
      <figure><img src={'https://picsum.photos/810/300?random=' + postNumber} alt={'post-img'} /></figure>      
      <div css={bodyStyle}>
        {text}
      </div>
      <div css={buttonWrapper}>
        <div className={'item'} onClick={onLike}>
          {likeClick ? <BsHeartFill className={'filled'} /> : <BsHeart />}
          {like}
        </div>     
        <div className={'item'} onClick={onToggleComment}>
          <BsChatLeftDots /> {comments.length}
        </div>
        {owner &&
          <PostActionButtons id={postNumber} />}
      </div>        
        {commentVisible && <div style={{textAlign: 'center'}}>
          <OutlinedInput placeholder={'Write your comment'} value={comment} onChange={onChangeComment}
                       onKeyPress={onKeyPress}                       
                       sx={{ borderRadius: '1rem', margin:'0 0.5rem', width:'95%' }}
                       startAdornment={<Avatar alt='post-user-avatar'
                                               src={gravatar.url('ryanhe4@gmail.com',
                                                 { s: '44px', d: 'retro' })}
                                               sx={{ width: 44, height: 44, mr: '25px' }} />} />
                                               </div>}
        <div css={commentStyle}>    
          {comments.map((comment: IComment) => (
            <div key={comment.id} style={{
              paddingTop: '0.2rem'
              }}
            >
              {comment.text}
              <hr />
            </div>            
          ))}
        </div>      
      </div>      
      </>    
    );
};

export default React.memo(PostDetail)

const commentStyle = css`    
  
  font-size: 0.5rem;    
  letter-spacing: 0.00938em;
  border: thick solid #dddddd;    
  position: relative; 
  padding: 0.5rem;
  border-radius: 1rem;    
  margin: 1.5625rem 1rem;
  font: normal 14px/16px NanumBarunGothic;
  background: #fff;

`

const wrapStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
  background: #fff;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 1rem;
  position: relative;
  opacity: 0.8;
  max-width:54.375rem;

  figure {
    max-height: 40rem;    
    display: flex;
    justify-content: center;
    background: grey;
    margin: 1.25rem 1.875rem;
    border-radius: 1rem;
    overflow:hidden;
  }

  ${media.small} {
    margin-right: 1rem;
  }
`
const iconStyle = css`
  margin-right: 1.25rem;
`

const detailStyle = css`    
    display: flex;
    padding-top: 1.875rem;
    padding-left: 1.875rem;
    padding-right: 1.875rem;    
    align-items: flex-start;
`
const titleStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  margin-bottom: -5px;

  h4 {
    margin: 0.5625rem 0 0.3125rem;
    outline: none;
    text-align: left;
  }

  span {
    color: #333333;
    font-family: 'NanumSquare';
    font-weight: 800;
    font-size: 18px;
    line-height: 1.166666667;
  }

  .time-date {
    font-family: 'NanumSquare';
    font-size: 14px;
    line-height: 1.142857143;
    color: #9C9C9C;
  }
`
const buttonWrapper = css`
  display: flex;
  margin: 1.25rem;
  user-select: none;
  /* justify-content: center; */

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
const bodyStyle = css`
  padding: 0 1.875rem;
  font: normal normal 800 14px 'NanumSquare';
  line-height: 1.142857143;
  color: #333333;
`