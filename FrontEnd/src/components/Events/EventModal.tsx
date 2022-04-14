import { Box, Button, Modal } from '@mui/material'
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
import { ChangeEvent } from 'react'
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

  const onCancel = () => {
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

  return <Modal open={open}>
    <Box css={eventFormStyle}>
      <h2>Create Custom Event</h2>
      <RequestSection title={'Event Title'}>
        <Input placeholder='event title'
               name='event'
               onChange={onChangeEventTitle}
               value={event.title} />
      </RequestSection>
      <EventDateSections />
      <div css={buttonBlock}>
        <Button css={buttonStyle} disabled={createMutation.isLoading || updateMutation.isLoading}
                onClick={onCreate}>{isEdit ? 'EDIT' : 'OK'}</Button>
        <Button css={buttonStyle} disabled={createMutation.isLoading || updateMutation.isLoading}
                onClick={onCancel}> 취소
        </Button>
      </div>
    </Box>
  </Modal>
}

const eventFormStyle = css`
  position: absolute;
  left: 20%;
  top: 20%;
  width: 35rem;
  background: linear-gradient(45deg, #f1f1f1 45%, #fff 100%);
  padding: 2rem;
  border-radius: 1rem;

`
const buttonBlock = css`
  display: flex;
  justify-content: center;
  margin: 2rem 0 0;
`
const buttonStyle = css`
  ${resetButton};
  padding-left: 4rem;
  padding-right: 4rem;
  align-items: center;
  height: 2.5rem;
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

export default EventModal
