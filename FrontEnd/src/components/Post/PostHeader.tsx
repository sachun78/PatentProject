import { css } from '@emotion/react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Avatar, ListItemIcon, ListItemText, rgbToHex } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { AxiosError } from 'axios';
import { formatDistanceToNow } from 'date-fns';
import gravatar from 'gravatar';
import useBuddyQuery from 'hooks/query/useBuddyQuery';
import { addBuddy } from 'lib/api/buddy/addBuddy';
import { deleteBuddy } from 'lib/api/buddy/deleteBuddy';
import { API_PATH } from 'lib/api/client';
import { User as UserType } from 'lib/api/types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import palette, { brandColor } from '../../lib/palette';

export type PostHeaderProps = {
  owner_username: string
  owner_email: string
  createdAt: Date
}

function PostHeader({ owner_username, owner_email, createdAt }: PostHeaderProps) {
  const date = useMemo(() => new Date(createdAt), [])  
  const [url] = useState(`${API_PATH}static/${owner_email}`)
  const today = new Date();
  const diff = (today.getTime() - date.getTime()) / 1000
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const { data: buddyData, isLoading } = useBuddyQuery()    
  const prevOpen = useRef(open);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  
  // return focus to the button when we transitioned from !open -> open
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const addBuddyMutation = useMutation(addBuddy, {
    onSuccess: () => {
      toast.success('Buddy added!')
      qc.invalidateQueries('buddy')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error(err.response?.data.message)
    },
  })

  const delBuddyMutation = useMutation(deleteBuddy, {
    onSuccess: () => {
      toast.success('Buddy deleted!')
      qc.invalidateQueries('buddy')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error(err.response?.data.message)
    },
  })
  const onAddNetwork = useCallback(() => {    
    if (!owner_email) return
    addBuddyMutation.mutate(owner_email)
  }, [addBuddyMutation, owner_email])

  const onDeleteNetwork = useCallback(() => {
    if (!owner_email) return
    delBuddyMutation.mutate(owner_email)
  }, [delBuddyMutation, owner_email])

  if (!owner_email || !user || !buddyData ) {
    
    return <div>로딩중!!</div>
  }



  return (
    <div css={headerStyle}>
      <div css={iconStyle}>
        <Avatar
          src={url}
          sx={{ width: 60, height: 60 }}
          style={{ border: '0.1px solid lightgray' }}
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
      <div css={moreStyle} id="composition-button"
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
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper style={{width: '15ch'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{ zIndex: "999"}}
                  >
                    <Link to={`/u/${owner_email}`} css={linkStyle}>
                      <MenuItem onClick={handleClose} disableRipple>
                        <ListItemIcon>
                          <img src="/assets/profile.png" style={{ width: "1rem" }} />
                        </ListItemIcon>
                        <ListItemText >
                          Profile
                        </ListItemText>
                      </MenuItem>
                    </Link>
                    {user.email === owner_email ? null : !buddyData.buddy || buddyData.buddy?.findIndex((elem: { email: string; profile: any }) => elem.email === owner_email) === -1 
                    ? (            
                    <MenuItem onClick={onAddNetwork} disableRipple>
                      <ListItemIcon>
                      <img src="/assets/follow.png" style={{ width: "1.5rem" }} />
                      </ListItemIcon>
                      <ListItemText>
                        Add
                      </ListItemText>
                    </MenuItem>                      
                    ) : (
                    <MenuItem onClick={onDeleteNetwork} disableRipple>
                      <ListItemIcon>
                      <img src="/assets/follow-1.png" style={{ width: "1.5rem", background: "rgb(145, 4, 87, 0.9)" }} />
                      </ListItemIcon>
                      <ListItemText>
                        Delete
                      </ListItemText>
                    </MenuItem>)}                    
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
  color: #000;  
`

const headerStyle = css`
  display: flex;
  padding-top: 1.875rem;
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  padding-bottom: 1rem;
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
    font-family: NanumSquare;
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
const iconStyle = css`
  margin-right: 1.25rem;
`

export default PostHeader