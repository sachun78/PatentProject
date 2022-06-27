import { Avatar, OutlinedInput } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { API_PATH } from 'lib/api/client'
import { editComment } from 'lib/api/post/editComment'
import { IComment, IPost, User } from 'lib/api/types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import PostIconBox from './PostIconBox'

type postCommentProps = {
  viewComment: IComment
  _id: string
  post: IPost
}

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    '& $notchedOutline': {
      borderWidth: 0,
    },
    '&:hover $notchedOutline': {
      borderWidth: 0,
    },
    '&$focused $notchedOutline': {
      borderWidth: 0,
    },
    '&:not(:last-child)': {
      borderBottom: '1px solid #d9d9d9',
    },
    height: '4.0625rem',
  },
  focused: {},
  notchedOutline: {},
}))

const PostComment = ({ viewComment, post, _id }: postCommentProps) => {
  const qc = useQueryClient()
  const user = qc.getQueryData<User>('user') as User
  const [editValue, setEditValue] = useState(viewComment.contents)
  const [owner, setOwner] = useState(false)
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<any>()
  const onChange = (e: any) => {
    setEditValue(e.target.value)
  }

  useEffect(() => {
    if (viewComment.owner_id === user.id) {
      setOwner(true)
    }
  }, [])

  const editCommentMut = useMutation(editComment, {
    onMutate: async (newData) => {
      const oldData = qc.getQueryData(['post', _id])
      await qc.cancelQueries(['post', _id])
      qc.setQueryData(['post', _id], { ...post, newData })
      return () => qc.setQueryData(['post', _id], oldData)
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

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        editCommentMut.mutate([{ contents: editValue, createdAt: viewComment.createdAt }, _id, e.target.name], {
          onSuccess: () => {
            qc.invalidateQueries(['post', _id])
            qc.invalidateQueries(['posts'])
          },
        })
        setEdit(false)
      }
    },
    [editValue]
  )

  const getEdit = (a: boolean) => {
    setEdit(a)
    if (!edit) inputRef.current.focus()
  }

  const classes = useStyles()

  return (
    <OutlinedInput
      key={viewComment.id}
      name={viewComment.id}
      placeholder={viewComment.contents}
      value={editValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      readOnly={!edit}
      inputRef={inputRef}
      sx={{ width: '95%' }}
      classes={classes}
      startAdornment={
        <Avatar
          alt={viewComment.owner_username}
          src={`${API_PATH}static/` + viewComment.owner_email}
          sx={{ width: 35, height: 35, mr: '34px' }}
          style={{ border: '1px solid lightgray' }}
          imgProps={{ crossOrigin: 'anonymous' }}
        />
      }
      endAdornment={
        owner && (
          <PostIconBox
            post={post}
            edit={edit}
            key={viewComment.id}
            _id={_id}
            commentId={viewComment.id}
            name={viewComment.id}
            getEdit={getEdit}
          />
        )
      }
    />
  )
}

export default PostComment
