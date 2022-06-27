import { css } from '@emotion/react'
import { Avatar, CircularProgress, ListItemText } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { formatDistanceToNow } from 'date-fns'
import gravatar from 'gravatar'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import { API_PATH } from 'lib/api/client'
import { deletePost } from 'lib/api/post/deletePost'
import { User as UserType } from 'lib/api/types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import palette, { brandColor } from 'lib/palette'
import AskRemoveModal from './AskRemoveModal'

export type PostHeaderProps = {
  owner_username: string
  owner_email: string
  createdAt: Date
  owner_id: string
  _id: string
}

function PostHeader({ owner_username, owner_email, createdAt, owner_id, _id }: PostHeaderProps) {
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [url] = useState(`${API_PATH}static/${owner_email}`)
  const anchorRef = useRef<HTMLDivElement>(null)
  const prevOpen = useRef(open)

  const qc = useQueryClient()
  const navigate = useNavigate()
  const user = qc.getQueryData<UserType>('user')

  const date = useMemo(() => new Date(createdAt), [])
  const today = new Date()
  const diff = (today.getTime() - date.getTime()) / 1000
  const { data: buddyData } = useBuddyQuery()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const onRemoveClick = () => {
    setModal(true)
  }

  const onCancel = () => {
    setModal(false)
  }

  const deletePostlMut = useMutation(deletePost, {
    onSuccess: () => {
      qc.invalidateQueries(['posts'])
      navigate('/')
    },
  })

  const onDelete = useCallback(() => {
    if (!_id) return
    deletePostlMut.mutate(_id)
  }, [deletePostlMut, _id])

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  if (!owner_email || !buddyData) {
    return <CircularProgress />
  }

  return (
    <div css={headerStyle}>
      <div css={iconStyle}>
        <Avatar
          src={url}
          sx={{ width: 60, height: 60 }}
          style={{ border: '1px solid lightgray' }}
          imgProps={{ crossOrigin: 'anonymous' }}
        >
          <img className={'fallback'} src={gravatar.url(owner_email, { s: '60px', d: 'retro' })} alt={'user-img'} />
        </Avatar>
      </div>
      <div css={titleStyle}>
        <Link to={`/u/${owner_email}`}>
          <h4>
            <span>{owner_username}</span>
          </h4>
        </Link>
        <div className={'time-date'}>
          {diff > 86400 ? date.toDateString() : formatDistanceToNow(date, { addSuffix: true })}
        </div>
      </div>
      <div
        css={moreStyle}
        id="composition-button"
        ref={anchorRef}
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MdMoreHoriz />
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper style={{ width: '13ch' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{ zIndex: '999' }}
                >
                  {owner_id !== user?.id && (
                    <Link to={`/u/${owner_email}`} css={linkStyle}>
                      <MenuItem onClick={handleClose} disableRipple>
                        <ListItemText>Info</ListItemText>
                      </MenuItem>
                    </Link>
                  )}
                  <Link to={`/postDetail/${_id}`} css={linkStyle}>
                    <MenuItem onClick={handleClose} disableRipple>
                      <ListItemText>More</ListItemText>
                    </MenuItem>
                  </Link>
                  {owner_id === user?.id && (
                    <div>
                      <Link to={`/PostEdit/${_id}`} css={linkStyle}>
                        <MenuItem onClick={handleClose} disableRipple>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={onRemoveClick} disableRipple>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>

                      <AskRemoveModal visible={modal} onConfirm={onDelete} onCancel={onCancel} />
                    </div>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

const linkStyle = css`
  color: #333;
`

const headerStyle = css`
  display: flex;
  padding: 1.5625rem 1.875rem 1.25rem;
  align-items: flex-start;
`
const moreStyle = css`
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 999px;

  &:hover {
    background: ${palette.purple[50]};
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: ${brandColor};
  }
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
    font-family: NanumSquareOTF;
    font-weight: 800;
    font-size: 18px;
    line-height: 1.166666667;
  }

  .time-date {
    font-family: NanumSquareOTF;
    font-size: 14px;
    line-height: 1.142857143;
    color: #9c9c9c;
  }
`
const iconStyle = css`
  margin-right: 1.25rem;
`

export default PostHeader
