import { Box, Button, Modal, TextField } from '@mui/material'
import { css } from '@emotion/react'
import EventDateSections from './EventDateSections'
import { useEventModal } from 'hooks/useEventTitle'
import { resetButton } from 'lib/styles/resetButton'
import { brandColor } from 'lib/palette'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { createEvent } from 'lib/api/event/createEvent'
import { toast } from 'react-toastify'
import React, { ChangeEvent, useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { useCurrentEventState } from 'atoms/eventState'
import { updateEvent } from 'lib/api/event/updateEvent'
import { formatDistanceToNow } from 'date-fns'

export type CreateEventModalProps = {}

function EventModal({}: CreateEventModalProps) {
  const { endDate, startDate } = useDateRangeHook()
  const { open, setOpen, isEdit } = useEventModal()
  const [event, setEvent] = useCurrentEventState()
  const qc = useQueryClient()

  const onMutSuccess = () => {
    toast.success('Update event success', {
      position: 'top-center',
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      autoClose: 3000,
    })
    qc.invalidateQueries('events')
    onClose()
  }
  const onMutError = (e: AxiosError) => {
    const { message } = e.response?.data
    toast.error(message, {
      position: 'top-center',
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      autoClose: 3000,
    })
  }
  const updateMutation = useMutation(() => updateEvent(event.id, event.title, startDate, endDate), {
    onSuccess: onMutSuccess,
    onError: onMutError,
  })

  const createMutation = useMutation(() => createEvent(event.title, startDate, endDate), {
    onSuccess: onMutSuccess,
    onError: onMutError,
  })

  const onChangeEventTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEvent((prev) => ({ ...prev, title: e.target.value }))
    },
    [setEvent]
  )

  const onClose = useCallback(() => {
    setEvent({ title: '', id: '' })
    setOpen(false)
  }, [])

  const onCreate = () => {
    // 제목이 입력되지 않은 경우
    if (!event.title.trim()) {
      toast.error('Please enter the event title.', {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
        hideProgressBar: true,
      })
      return
    }

    // 설정된 종료일이 현재 날짜보다 앞에 있는 경우
    console.log(endDate)
    const ed = new Date(endDate)
    const dist = formatDistanceToNow(ed, {
      addSuffix: true,
    })

    if (dist.includes('ago')) {
      toast.error("You can't choose The date before today.", {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
      return
    }
    // 시작일이 종료일보다 뒤에 있는 경우
    if (startDate > endDate) {
      toast.error('Start date must precede end date.', {
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
      return
    }

    if (isEdit) {
      updateMutation.mutate()
    } else {
      createMutation.mutate()
    }
  }

  return (
    <Modal open={open} onClose={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box style={{ padding: '50px', width: '393px', height: '387px' }} css={boxStyle}>
        <h3>Event Title</h3>
        <TextField
          name="event"
          type="text"
          variant="standard"
          value={event.title}
          onChange={onChangeEventTitle}
          fullWidth
        />
        <EventDateSections />
        <Button
          css={buttonStyle}
          disabled={createMutation.isLoading || updateMutation.isLoading}
          fullWidth
          onClick={onCreate}
        >
          {isEdit ? 'EDIT' : 'OK'}
        </Button>
      </Box>
    </Modal>
  )
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
    color: #6c6c6c;
  }
`

export default EventModal
