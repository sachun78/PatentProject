import { Box, Button, Dialog, DialogTitle, OutlinedInput, TextField } from '@mui/material'
import { css } from '@emotion/react'
import RequestSection from 'pages/Meeting/meeting-create-form/RequestForm/RequestSection'
import Input from '../Input/Input'
import EventDateSections from './EventDateSections'
import { useEventModal } from 'hooks/useEventTitle'
import { resetButton } from 'lib/styles/resetButton'
import palette, { brandColor } from 'lib/palette'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { createEvent } from 'lib/api/event/createEvent'
import { toast } from 'react-toastify'
import React, { ChangeEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { useCurrentEventState } from 'atoms/eventState'
import { updateEvent } from 'lib/api/event/updateEvent'
import { inputStyle } from '../../pages/Login/styles'

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

  return <Dialog open={open} onClose={onClose} PaperProps={{
    style: { borderRadius: '1rem' }
  }}>
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
  </Dialog>
}

const buttonStyle = css`
  ${resetButton};
  padding-left: 4rem;
  padding-right: 4rem;
  align-items: center;
  height: 37px;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;

  background-color: ${brandColor};

  color: #fff;

  &:first-of-type {
    margin-right: 3rem;
  }

  &:hover {
    background: ${palette.purple[400]};
  }
`

const boxStyle = css`
  h3 {
    margin: 0;
    font: normal normal 800 16px/18px NanumSquareOTF;
    color: #6C6C6C;
  }
`

export default EventModal
