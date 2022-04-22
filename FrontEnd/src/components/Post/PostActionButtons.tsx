import { deletePost } from 'lib/api/post/deletePost'
import { usePost } from 'lib/api/post/usePost'
import { usePosts } from 'lib/api/post/usePosts'
import { IPost } from 'lib/api/types'
import React, { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import AskRemoveModal from './AskRemoveModal'

type postActionButtonsProps = {
  id: string
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

  const deletePostlMut = useMutation(deletePost, {
    onSuccess: () => {
      qc.invalidateQueries(['post', id])
      navigate(-1)
    },
  })  

  const onDelete = useCallback(() => {
    if (!id) return
    deletePostlMut.mutate(id)
  }, [deletePostlMut, id])

  const onEdit = () => {
    navigate('/PostEdit/', { state: id })
  }

  return (
    <>
      <div className={'item'} onClick={onEdit}>Edit</div>
      <div className={'item'} onClick={onRemoveClick}>
        Delete
      </div>
      <AskRemoveModal
        visible={modal}
        onConfirm={onDelete}
        onCancel={onCancel}
      />
    </>
  )
}

export default PostActionButtons
