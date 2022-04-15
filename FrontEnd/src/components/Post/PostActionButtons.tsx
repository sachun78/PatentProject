import { usePost } from 'lib/api/post/usePost'
import { usePosts } from 'lib/api/post/usePosts'
import { IPost } from 'lib/api/types'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import AskRemoveModal from './AskRemoveModal'

type postActionButtonsProps = {
  id: number
}

const PostActionButtons = ({ id }: postActionButtonsProps) => {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const posts = usePosts()
  const [modal, setModal] = useState(false)
    
  const onRemoveClick = () => {
    setModal(true)
  }

  const onCancel = () => {
    setModal(false)
  }

  const onConfirm = () => {
    const newPosts: IPost[] = posts.filter(
      (post: IPost) => Number(id) !== posts.indexOf(post)
    )
    qc.setQueryData('posts', newPosts)
    navigate('/')
    setModal(false)
  }

  return (
    <>
      <div className={'item'}>수정</div>
      <div className={'item'} onClick={onRemoveClick}>
        삭제
      </div>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  )
}

export default PostActionButtons
