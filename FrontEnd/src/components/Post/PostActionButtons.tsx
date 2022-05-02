import { deletePost } from 'lib/api/post/deletePost'
import React, { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import AskRemoveModal from './AskRemoveModal'

type postActionButtonsProps = {
  _id: string
}

const PostActionButtons = ({ _id }: postActionButtonsProps) => {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)

  const onRemoveClick = () => {
    setModal(true)
  }

  const onCancel = () => {
    setModal(false)
  }

  const deletePostlMut = useMutation(deletePost, {
    onSuccess: () => {
      qc.invalidateQueries(['post', _id])
      navigate(-1)
    },
  })

  const onDelete = useCallback(() => {
    if (!_id) return
    deletePostlMut.mutate(_id)
  }, [deletePostlMut, _id])

  const onEdit = () => {
    navigate(`/PostEdit/${_id}`)
  }

  return (
    <>
      <div className={'item'} onClick={onEdit}>
        Edit
      </div>
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
