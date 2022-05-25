import { css } from '@emotion/react'
import { Avatar, OutlinedInput } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import useInput from 'hooks/useInput'
import { createComments } from 'lib/api/post/createComment'
import { getPost } from 'lib/api/post/getPost'
import { updateLike } from 'lib/api/post/updateLike'
import { brandColor } from 'lib/palette'
import media from 'lib/styles/media'
import React, { useCallback, useMemo } from 'react'
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useProfileImg from '../../hooks/useProfileImg'
import { IComment, IPost, User } from '../../lib/api/types'
import ImageContainer from './ImageContainer'
import PostActionButtons from './PostActionButtons'
import PostComment from './PostComment'
import { commentStyle } from './PostFooter'
import PostTextContainer from './PostTextContainer'
import { url } from 'gravatar'
import gravatar from 'gravatar'

type postDetailProps = {}

const API_PATH = process.env.REACT_APP_API_PATH

function PostDetail({}: postDetailProps) {
  const qc = useQueryClient()
  const { id } = useParams()

  const { data: post, isLoading } = useQuery(['post', id], getPost, {
    enabled: !!id,
    retry: false,
  })    

  const today = new Date();
  
  const diff = useMemo(() => {    
    if(post) {        
        const date = new Date(post.createdAt) 
        const temp = (today.getTime() - date.getTime()) / 1000
        if(temp > 86400) {
          return date.toDateString()
        } else {
          return formatDistanceToNow(date, { addSuffix: true})
        }      
    }
  }, [post])    

  const [comments, onChangeComments, setComments] = useInput('')
  
  const user = qc.getQueryData<User>('user') as User  
  const { profileSrc } = useProfileImg(44)  

  const likeClicked = useMemo(() => {
    if (post) return !!post.like_cnt.find((v: string) => v === user.email)
  }, [post, user])

  const likeCountMut = useMutation(updateLike, {

    onMutate: async newData => {      
      const oldData = qc.getQueryData(['post', post._id]);      
      await qc.cancelQueries(['post', post._id]);      
      qc.setQueryData(['post', post._id], {...post, newData});      
      return () => qc.setQueryData(['post', post._id], oldData);       
    },
    
    onError: () => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
    },
  })

  const onLike = () => {
    likeCountMut.mutate([
      {
        email: user.email,
        userId: user.id,
      },
      id as string,
      likeClicked ? 'unchecked' : 'checked',
    ], {
      onSuccess: () => {                
        qc.invalidateQueries(['post', post._id])
      }
    })
  }

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        createCommentMut.mutate([{ contents: comments, createdAt: new Date() }, post._id], {
          onSuccess: () => {        
            qc.invalidateQueries(['post', post._id])
            
          }   
        })

        setComments('')
      }
    },
    [comments]
  )

  const createCommentMut = useMutation(createComments, {

    onMutate: async newData => {      
      const oldData = qc.getQueryData(['post', post._id]);      
      await qc.cancelQueries(['post', post._id]);      
      qc.setQueryData(['post', post._id], {...post, newData});      
      return () => qc.setQueryData(['post', post._id], oldData);       
    },

    onError: () => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
    },
  })

  if (!post || isLoading)  {
    return <div>로딩중</div>
  }

  return (
    <>
      <div css={wrapStyle}>
        <div css={detailStyle}>
          <div css={iconStyle}>
            <Avatar
              alt={post.owner_username}
              src={`${API_PATH}static/` + post.owner_email}
              sx={{ width: 60, height: 60 }}
              style={{ border: '0.1px solid lightgray' }}
              imgProps={{ crossOrigin: 'anonymous' }}
            >
              <img src={url(post.owner_email, { s: '60px', d: 'retro' })} alt={'no-image'} />
            </Avatar>
          </div>
          <div css={titleStyle}>
            <Link to={`/u/${post.owner_email}`}>    
            <h4>
              <span>{post.owner_username}</span>
            </h4>
            </Link>
            <div className={'time-date'}>                
              {diff}
            </div>
          </div>
        </div>
        <ImageContainer images={post.images} isDetail={true} />
        <PostTextContainer contents={post.contents} />
        <div css={buttonWrapper}>
          <div css={leftButtonsStyle}>
            <div className={'item'} onClick={onLike}>
              {likeClicked ? <BsHeartFill className={'filled'} /> : <BsHeart />}
              {post.like_cnt.length}
            </div>
            <div className={'item'}>
              <BsChatLeftDots /> {post.comment.length}
            </div>
          </div>
          {post.owner_id === user.id && <PostActionButtons _id={post._id} />}
        </div>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <OutlinedInput
            // fullWith
            placeholder={'Write your comment'}
            value={comments}
            onChange={onChangeComments}
            onKeyDown={onKeyDown}
            sx={{
              borderRadius: '1rem',
              margin: '0 1.875rem 1.875rem 1.25rem',
              position: 'relative',
              width: '95%',
            }}
            startAdornment={
              <Avatar
                alt="post-user-avatar"
                src={profileSrc}
                sx={{ width: 35, height: 35, mr: '25px' }}
                imgProps={{ crossOrigin: 'anonymous' }}
              >
                <img src={gravatar.url(user.email, { s: '60px', d: 'retro' })} alt={'fallback'} />
              </Avatar>
            }
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', margin: '0 1.45rem 0 1.25rem', textAlign: 'center' }}>
          {post.comment.length !== 0 && (
            <div css={commentStyle}>
              {post.comment.map((viewComment: IComment) => (
                <PostComment key={viewComment.id} viewComment={viewComment} _id={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PostDetail

const leftButtonsStyle = css`
  display: flex;
  flex-direction: row;
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
  max-width: 54.375rem;

  figure {
    max-height: 40rem;
    display: flex;
    justify-content: center;
    margin: 1.25rem 1.875rem;
    border-radius: 1rem;
    overflow: hidden;
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
  padding-bottom: 20px;
  align-items: flex-start;
`
const titleStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  margin-bottom: -5px;

  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    cursor: pointer;
  }

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
    color: #9c9c9c;
  }
`
const buttonWrapper = css`
  display: flex;
  margin: 1.25rem 1.25rem 1.875rem 1.25rem;
  /* margin: 1.25rem; */
  user-select: none;
  justify-content: space-between;

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
