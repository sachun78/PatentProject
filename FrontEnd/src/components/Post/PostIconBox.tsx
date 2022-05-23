import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import { deleteComment } from 'lib/api/post/deleteComment'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton } from '@mui/material'
import { IPost } from 'lib/api/types'

type postIconBoxProps = {
  _id: string
  commentId: string
  name: string
  getEdit: any
  edit: boolean
  post: IPost
}

const PostIconBox = ({
  _id,
  commentId,
  name,
  getEdit,
  edit,
  post
}: postIconBoxProps) => {
  const qc = useQueryClient()
  const onCommentDelete = () => {
    deleteCommentMut.mutate([_id, commentId], {
      onSuccess: () => {        
        qc.invalidateQueries(['posts'])  
        qc.invalidateQueries(['post', _id])              
      }
    })
  }

  const setEdit = () => {
    getEdit(!edit)
  }

  const deleteCommentMut = useMutation(deleteComment, {

    onMutate: async newData => {      
      const oldData = qc.getQueryData(['post', _id]);      
      await qc.cancelQueries(['post', _id]);      
      qc.setQueryData(['post', _id], {...post, newData});      
      return () => qc.setQueryData(['post', _id], oldData);       
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
