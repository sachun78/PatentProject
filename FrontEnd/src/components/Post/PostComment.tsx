import { Avatar, OutlinedInput } from '@mui/material'
import gravatar from 'gravatar'
import { editComment } from 'lib/api/post/editComment'
import { IComment, User } from 'lib/api/types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import PostIconBox from './PostIconBox'

type postCommentProps = {
  viewComment: IComment
  _id: string
}

const PostComment = ({ viewComment, _id }: postCommentProps) => {
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

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        editCommentMut.mutate([{ contents: editValue }, _id, e.target.name])
        setEdit(false)
      }
    },
    [editValue]
  )

  const getEdit = (a: boolean) => {
    setEdit(a)
    inputRef.current.focus()
  }

  if (edit) {
    return (
      <>
        <OutlinedInput
          key={viewComment.id}
          name={viewComment.id}
          placeholder={viewComment.contents}
          onChange={onChange}
          onKeyDown={onKeyDown}
          fullWidth
          multiline
          sx={{ borderRadius: '1rem', paddingLeft: '1.25rem' }}
          startAdornment={
            <Avatar
              alt="post-user-avatar"
              src={gravatar.url('temp.email' + viewComment.owner_id, {
                s: '44px',
                d: 'retro',
              })}
              sx={{ width: 22, height: 22, mr: '25px' }}
            />
          }
          endAdornment={
            owner && (
              <PostIconBox
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
      </>
    )
  }

  return (
    <>
      <OutlinedInput
        key={viewComment.id}
        name={viewComment.id}
        value={viewComment.contents}
        readOnly
        inputRef={inputRef}
        fullWidth
        multiline
        sx={{ borderRadius: '1rem', paddingLeft: '1.25rem' }}
        startAdornment={
          <Avatar
            alt="post-user-avatar"
            src={gravatar.url('temp.email' + viewComment.owner_id, {
              s: '44px',
              d: 'retro',
            })}
            sx={{ width: 22, height: 22, mr: '25px' }}
          />
        }
        endAdornment={
          owner && (
            <PostIconBox
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
    </>
  )
}

export default PostComment