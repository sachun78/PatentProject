import { Box, Modal } from '@mui/material'
import { css } from '@emotion/react'
import RequestSection from '../RequestForm/RequestSection'
import Input from '../Input/Input'
import EventDateSections from './EventDateSections'
import useEventTitle, { useEventModal } from '../../hooks/useEventTitle'
import { resetButton } from '../../lib/styles/resetButton'
import palette from '../../lib/palette'
import useDateRangeHook from '../../hooks/useDateRangeHook'
import { useGlobalDialogActions } from '../../atoms/globalDialogState'
import { createEvent } from '../../lib/api/event/createEvent'
import useEventQuery from '../../hooks/query/useEventQuery'

export type CreateEventModalProps = {}

function EventModal({}: CreateEventModalProps) {
  const { title, setEventTitle } = useEventTitle()
  const { open, setModalState } = useEventModal()
  const { endDate, startDate } = useDateRangeHook()
  const { open: openDialog } = useGlobalDialogActions()
  const { refetch } = useEventQuery(1)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventTitle(e.target.value)
  }
  const handleCancel = () => {
    setEventTitle('')
    setModalState(false)
  }

  const handleOk = () => {
    if (startDate > endDate) {
      openDialog({
        title: 'ERROR!',
        message: 'StartDate must be before EndDate',
        onConfirm: () => {
          console.log('Confirm')
        },
        showCancel: false,
        confirmText: 'OK',
        isDestructive: true
      })
      return
    }
    const fetchCreateEvent = async () => {
      console.log('Event Create Action', title)
      return await createEvent(title, startDate, endDate)
    }
    fetchCreateEvent().then(() => {
      setEventTitle('')
      setModalState(false)
      refetch()
    })
      .catch((e) => {
        const { message } = e.response.data
        openDialog({
          title: 'ERROR!',
          message: message,
          showCancel: false,
          confirmText: 'OK',
          isDestructive: true
        })
      })
  }

  return <Modal open={open}>
    <Box css={eventFormStyle}>
      <RequestSection title={'Event title'}>
        <Input placeholder='Input your event title'
               name='event'
               onChange={handleChange}
               value={title} />
      </RequestSection>
      <EventDateSections />
      <div css={buttonBlock}>
        <button css={buttonStyle} onClick={handleOk}>생성</button>
        <button css={buttonStyle} onClick={handleCancel}> 취소</button>
      </div>
    </Box>
  </Modal>
}

const eventFormStyle = css`
  position: absolute;
  left: 40%;
  top: 20%;
  width: 35rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.8rem;

`
const buttonBlock = css`
  display: flex;
  justify-content: center;
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

  background-color: ${palette.cyan[500]};

  color: #fff;

  &:first-of-type {
    margin-right: 3rem;
  }

  &:hover {
    background: ${palette.cyan[400]};
  }
`

export default EventModal
