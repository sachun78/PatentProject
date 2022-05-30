import { useRecoilState } from 'recoil'
import { networkUserFindModalState, useMeetingReqUser } from 'atoms/meetingReqState'
import React, { useCallback } from 'react'
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import { API_PATH } from 'lib/api/client'
import gravatar from 'gravatar'

export type NetworkFindModalProps = {}

function NetworkFindModal({}: NetworkFindModalProps) {
  const [open, setOpen] = useRecoilState(networkUserFindModalState)
  const [, setMeetuser] = useMeetingReqUser()

  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const onSelect = useCallback(
    (email: string) => {
      setMeetuser(email)
      onClose()
    },
    [setMeetuser, onClose]
  )

  const { data: buddyData, isLoading } = useBuddyQuery()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'xl'}
      PaperProps={{ sx: { width: '555px', borderRadius: '1rem', maxHeight: '400px' } }}
      scroll={'paper'}
    >
      <DialogTitle
        sx={{ padding: '30px 30px 15px', color: '#910457', font: 'normal normal 800 18px/21px NanumSquareOTF' }}
      >
        User Select
      </DialogTitle>
      <DialogContent sx={{ padding: '0 30px 30px' }}>
        <DialogContentText
          sx={{ marginBottom: '25px', color: '#6c6c6c', font: 'normal normal normal 14px/22px NanumSquareOTF' }}
        >
          To schedule a meeting please select a person from network.
        </DialogContentText>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {buddyData.buddy?.map((buddy: any) => {
              const labelId = `checkbox-list-secondary-label-${buddy}`
              return (
                <ListItem key={buddy._id} disablePadding>
                  <ListItemButton onClick={() => onSelect(buddy.email)}>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${buddy.email + 1}`}
                        src={`${API_PATH}static/${buddy.email}`}
                        imgProps={{ crossOrigin: 'anonymous' }}
                        style={{ border: '1px solid lightgray' }}
                      >
                        <img src={gravatar.url(buddy.email ?? '', { s: '38px', d: 'retro' })} alt={'fallback-img'} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={`${buddy.name}`} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default NetworkFindModal
