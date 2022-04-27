import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import { deleteComment } from 'lib/api/post/deleteComment'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton } from '@mui/material'

type postIconBoxProps = {
  _id: string
  commentId: string
  name: string
  getEdit: any
  edit: boolean
}

const PostIconBox = ({
  _id,
  commentId,
  name,
  getEdit,
  edit,
}: postIconBoxProps) => {
  const qc = useQueryClient()
  const onCommentDelete = () => {
    deleteCommentMut.mutate([_id, commentId])
  }

  const setEdit = () => {
    getEdit(!edit)
  }

  const deleteCommentMut = useMutation(deleteComment, {
    onSuccess: () => {
      qc.invalidateQueries(['posts'])
      qc.invalidateQueries(['post', _id])
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

  return (
    <>
      {edit === true ? (
        <IconButton id={name} name={name} onClick={setEdit}>
          <CancelIcon name={name} />
        </IconButton>
      ) : (
        <IconButton id={name} name={name} onClick={setEdit}>
          <EditIcon name={name} />
        </IconButton>
      )}
      <IconButton name={name} onClick={onCommentDelete}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default PostIconBox
