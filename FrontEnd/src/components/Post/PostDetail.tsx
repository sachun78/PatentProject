import { css } from '@emotion/react'
import { Avatar, Box, ImageList, ImageListItem, Modal, OutlinedInput } from '@mui/material'
import useInput from 'hooks/useInput'
import useToggle from 'hooks/useToggle'
import { createComments } from 'lib/api/post/createComment'
import { getPost } from 'lib/api/post/getPost'
import { updateLike } from 'lib/api/post/updateLike'
import { brandColor } from 'lib/palette'
import media from 'lib/styles/media'
import React, { useCallback, useEffect, useState } from 'react'
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useProfileImg from '../../hooks/useProfileImg'
import { IComment, User } from '../../lib/api/types'
import PostActionButtons from './PostActionButtons'
import PostComment from './PostComment'
import { commentStyle } from './PostFooter'

type postDetailProps = {}

const API_PATH = process.env.REACT_APP_API_PATH

function PostDetail({}: postDetailProps) {
  const qc = useQueryClient()
  const { id } = useParams()

  const { data: post, isLoading } = useQuery(['post', id], getPost, {
    enabled: !!id,
    retry: false,
  })

  const [comments, onChangeComments, setComments] = useInput('')
  const [likeClick, onToggleLike, setLikeClick] = useToggle(false)
  const user = qc.getQueryData<User>('user') as User
  const [owner, setOwner] = useState(false)
  const { profileSrc } = useProfileImg(44)

  const [open, setOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    if (post) {
      for (const email in post.like_cnt) {
        if (user.email === post.like_cnt[email]) {
          setLikeClick(true)
        }
      }
    }
  }, [])

  const likeCountMut = useMutation(updateLike, {
    onSuccess: () => {
      qc.invalidateQueries(['posts'])
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
    console.log(likeClick, user.email)
    likeCountMut.mutate([
      {
        email: user.email,
        userId: user.id,
      },
      id as string,
      likeClick ? 'unchecked' : 'checked',
    ])

    onToggleLike()
  }

  const handleOpen = (e: any) => {
    setImgSrc(e.target.src)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        createCommentMut.mutate([{ contents: comments, createdAt: new Date() }, post._id])

        setComments('')
      }
    },
    [comments]
  )

  const createCommentMut = useMutation(createComments, {
    onSuccess: () => {
      qc.invalidateQueries(['post', post._id])
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

  if (!post) {
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
            />
          </div>
          <div css={titleStyle}>
            <h4>
              <span>{post.owner_username}/ etc ..</span>
            </h4>
            <div className={'time-date'}>{post.createdAt}</div>
          </div>
        </div>
        <figure>
          {post.images.length === 0 ? (
            <></>
          ) : post.images.length === 1 ? (
            <>
              <ImageList
                variant="masonry"
                cols={1}
                gap={10}
                sx={{ width: `640px`, height: `340px`, borderRadius: '1rem', overflow: 'hidden' }}
              >
                {post.images?.map((image: any) => (
                  <div key={image} style={{ width: `640px`, height: `340px`, objectFit: 'cover' }}>
                    <ImageListItem key={image} sx={{ width: '100%', height: '100%' }}>
                      <img
                        src={`${API_PATH}static/${image}`}
                        loading="lazy"
                        style={{
                          borderRadius: '1rem',
                          cursor: 'zoom-in',
                        }}
                        onClick={handleOpen}
                        crossOrigin="anonymous"
                      />
                      <Modal open={open} onClose={handleClose} css={modalStyle}>
                        <Box css={boxWrapper}>
                          <img src={imgSrc} css={imageStyle} crossOrigin="anonymous" />
                        </Box>
                      </Modal>
                    </ImageListItem>
                  </div>
                ))}
              </ImageList>
            </>
          ) : post.images.length === 2 ? (
            <ImageList
              variant="masonry"
              cols={2}
              gap={10}
              sx={{ width: `640px`, height: `340px`, borderRadius: '1rem', position: 'relative', overflow: 'hidden' }}
            >
              {post.images?.map((image: any) => (
                <ImageListItem key={image} sx={{ width: '310px', height: '340px' }}>
                  <img
                    src={`${API_PATH}static/${image}`}
                    loading="lazy"
                    style={{
                      borderRadius: '1rem',
                      width: '310px',
                      height: '340px',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                    }}
                    onClick={handleOpen}
                    crossOrigin="anonymous"
                  />
                  <Modal open={open} onClose={handleClose} css={modalStyle}>
                    <Box css={boxWrapper}>
                      <img src={imgSrc} css={imageStyle} crossOrigin="anonymous" />
                    </Box>
                  </Modal>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <ImageList
              variant="masonry"
              cols={2}
              gap={10}
              sx={{ width: `640px`, borderRadius: '1rem', position: 'relative', overflow: 'hidden' }}
            >
              {post.images?.map((image: any) => (
                <div key={image} style={{ width: '320px' }}>
                  <ImageListItem key={image} sx={{ width: '100%' }}>
                    <img
                      src={`${API_PATH}static/${image}`}
                      loading="lazy"
                      style={{
                        borderRadius: '1rem',
                        cursor: 'zoom-in',
                      }}
                      onClick={handleOpen}
                      crossOrigin="anonymous"
                    />
                    <Modal open={open} onClose={handleClose} css={modalStyle}>
                      <Box css={boxWrapper}>
                        <img src={imgSrc} css={imageStyle} crossOrigin="anonymous" />
                      </Box>
                    </Modal>
                  </ImageListItem>
                </div>
              ))}
            </ImageList>
          )}
        </figure>
        <div css={bodyStyle}>{post.contents}</div>
        <div css={buttonWrapper}>
          <div className={'item'} onClick={onLike}>
            {likeClick ? <BsHeartFill className={'filled'} /> : <BsHeart />}
            {post.like_cnt.length}
          </div>
          <div className={'item'}>
            <BsChatLeftDots /> {post.comment.length}
          </div>
          {post.owner_id === user.id && <PostActionButtons _id={post._id} />}
        </div>
        <div style={{ textAlign: 'center' }}>
          <OutlinedInput
            placeholder={'Write your comment'}
            value={comments}
            onChange={onChangeComments}
            onKeyDown={onKeyDown}
            sx={{ borderRadius: '1rem', margin: '0 0.5rem', width: '95%' }}
            startAdornment={
              <Avatar
                alt="post-user-avatar"
                src={profileSrc}
                sx={{ width: 35, height: 35, mr: '25px' }}
                imgProps={{ crossOrigin: 'anonymous' }}
              ></Avatar>
            }
          />
        </div>
        {post.comment.length !== 0 && (
          <div
            css={commentStyle}
            style={{ margin: '1.25rem 1.875rem 1.875rem', border: '1px solid #C9C9C9', borderRadius: '1rem' }}
          >
            {post.comment.map((viewComment: IComment) => (
              <PostComment key={viewComment.id} viewComment={viewComment} _id={post._id} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default PostDetail

const modalStyle = css`
  .MuiBackdrop-root {
    background: rgba(0, 0, 0, -1);
  }
`

export const boxWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 700px;
  min-height: 250px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 1rem;
  background: rgba(0, 0, 0, -1);
`
const imageStyle = css`
  width: 100%;
  border-radius: 1rem;
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
    color: #9c9c9c;
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
const bodyStyle = css`
  padding: 0 1.875rem;
  font: normal normal 800 14px 'NanumSquare';
  line-height: 1.142857143;
  color: #333333;
`
