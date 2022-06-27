import { css } from '@emotion/react'
import { updateLike } from 'lib/api/post/updateLike'
import { IComment, IPost, User } from 'lib/api/types'
import { brandColor } from 'lib/palette'
import React, { useMemo } from 'react'
import { BsChatLeftDots, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PostComment from './PostComment'

export type PostFooterProps = {
  post: IPost
  _id: string
  comment: IComment[]
  like_cnt: string[]
}

function PostFooter({ post, _id, comment, like_cnt }: PostFooterProps) {
  const qc = useQueryClient()
  const user = qc.getQueryData<User>('user') as User
  const likeClicked = useMemo(() => {
    return like_cnt.find((v: string) => v === user.email)
  }, [like_cnt, user.email])
  const viewComments = comment.filter((comments: IComment) => comment.indexOf(comments) < 2)

  const likeCountMut = useMutation(updateLike, {
    onMutate: async (newData) => {
      await qc.cancelQueries('posts')
      const oldPages: any = qc.getQueryData('posts')
      const newPagesArray = oldPages.pages.map((page: any) => {
        return page.map((post: IPost) => {
          if (post._id === _id) {
            return {
              ...post,
              like_cnt:
                likeClicked !== user.email
                  ? like_cnt.concat(newData[0].email)
                  : like_cnt.filter((v: string) => v === newData[0].email),
            }
          }
          return post
        })
      })
      qc.setQueryData('posts', {
        pageParams: oldPages.pageParams,
        pages: newPagesArray,
      })
      return { oldPages }
    },
    onError: (e) => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
    },
  })

  const onLike = () => {
    likeCountMut.mutate(
      [
        {
          email: user.email,
          userId: user.id,
        },
        _id,
        likeClicked ? 'unchecked' : 'checked',
      ],
      {
        onSuccess: () => {
          qc.invalidateQueries(['posts'])
        },
      }
    )
  }

  return (
    <div css={footerStyle /*flex*/}>
      <div css={buttonWrapper}>
        <div className={'item'} onClick={onLike}>
          {likeClicked ? <BsHeartFill className={'filled'} /> : <BsHeart />}
          {like_cnt.length}
        </div>
        <Link to={`/postDetail/${_id}`}>
          <div className={'item'}>
            <BsChatLeftDots /> {comment.length}
          </div>
        </Link>
      </div>
      {viewComments.length === 0 ? null : (
        <div css={commentStyle}>
          {viewComments.map((viewComment: IComment) => (
            <PostComment key={viewComment.id} viewComment={viewComment} _id={_id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export const commentStyle = css`
  font-size: 0.5rem;
  letter-spacing: 0.00938em;
  border: 1px solid #c9c9c9;
  position: relative;
  border-radius: 1rem;
  margin-bottom: 1.875rem;
  text-align: center;
  font: normal normal bold 14px/16px NanumBarunGothic;
  font-weight: 400;
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
