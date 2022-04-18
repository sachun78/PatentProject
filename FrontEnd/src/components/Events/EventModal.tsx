import { Box, Button, Dialog, Modal, TextField } from '@mui/material'
import { css } from '@emotion/react'
import EventDateSections from './EventDateSections'
import { useEventModal } from 'hooks/useEventTitle'
import { resetButton } from 'lib/styles/resetButton'
import { brandColor } from 'lib/palette'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { createEvent } from 'lib/api/event/createEvent'
import { toast } from 'react-toastify'
import React, { ChangeEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { useCurrentEventState } from 'atoms/eventState'
import { updateEvent } from 'lib/api/event/updateEvent'

export type CreateEventModalProps = {}

function EventModal({}: CreateEventModalProps) {
  const { endDate, startDate } = useDateRangeHook()
  const { open, setOpen, isEdit } = useEventModal()
  const [event, setEvent] = useCurrentEventState()
  const qc = useQueryClient()

  const updateMutation = useMutation(() => updateEvent(event.id, event.title, startDate, endDate), {
    onSuccess: () => {
      setEvent({ title: '', id: '' })
      setOpen(false)
      toast.success('Update event success', {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      qc.invalidateQueries(['events', 1])
    },
    onError: (e: AxiosError) => {
      const { message } = e.response?.data
      toast.error(message, {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
    }
  })

  const createMutation = useMutation(() => createEvent(event.title, startDate, endDate), {
    onSuccess: () => {
      setEvent({ title: '', id: '' })
      setOpen(false)
      toast.success('create new event success', {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      qc.invalidateQueries(['events', 1])
    },
    onError: (e: AxiosError) => {
      const { message } = e.response?.data
      toast.error(message, {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
    }
  })

  const onChangeEventTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEvent(prev => ({ ...prev, title: e.target.value }))
  }

  const onClose = () => {
    setEvent({ title: '', id: '' })
    setOpen(false)
  }

  const onCreate = () => {
    if (!event.title || !event.title.trim()) {
      toast.error('input title error', {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
        hideProgressBar: true
      })
      return
    }
    if (startDate > endDate) {
      toast.error('StartDate must be before EndDate', {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      return
    }

    if (isEdit) {
      updateMutation.mutate()
    } else {
      createMutation.mutate()
    }
  }

  return <Modal open={open} onClose={onClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Box style={{ padding: '50px', width: '393px', height: '387px' }} css={boxStyle}>
      <h3>Event Title</h3>
      <TextField
        name='event'
        label={undefined}
        type='text'
        variant='standard'
        value={event.title}
        onChange={onChangeEventTitle}
        fullWidth
      />
      <EventDateSections />
      <Button css={buttonStyle} disabled={createMutation.isLoading || updateMutation.isLoading}
              fullWidth onClick={onCreate}>{isEdit ? 'EDIT' : 'OK'}
      </Button>
    </Box>
  </Modal>
}

const buttonStyle = css`
  ${resetButton};
  align-items: center;
  height: 37px;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1.875rem;
  background-color: ${brandColor};

  color: #fff;
  font: normal normal normal 16px/18px NanumSquareOTF;

  &:hover {
    background: ${brandColor};
  }
`

const boxStyle = css`
  background: #fff;
  border-radius: 1rem;

  h3 {
    margin: 0;
    font: normal normal 800 16px/18px NanumSquareOTF;
    color: #6C6C6C;
  }
`

export default EventModal
