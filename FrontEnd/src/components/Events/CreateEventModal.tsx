import { Box, Modal } from '@mui/material'
import { css } from '@emotion/react'
import ViewBase from '../ViewBase'
import RequestSection from '../RequestForm/RequestSection'
import Input from '../Input/Input'
import EventDateSections from './EventDateSections'
import useEventTitle, { useEventModal } from '../../hooks/useEventTitle'

export type CreateEventModalProps = {}

function CreateEventModal({}: CreateEventModalProps) {
  const { title, setEventTitle } = useEventTitle()
  const { open, setModalState } = useEventModal()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventTitle(e.target.value)
  }
  const handleCancel = () => {
    setModalState(false)
  }

  return <Modal open={open}>
    <Box css={eventFormStyle}>
      <ViewBase title={'Create Event'}>
        <RequestSection title={'Event title'}>
          <Input
            placeholder='Input your event title'
            name='event'
            onChange={handleChange}
            value={title}
          />
        </RequestSection>
        <EventDateSections />
      </ViewBase>
      <button> 전송</button>
      <button onClick={handleCancel}> 취소</button>
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

export default CreateEventModal
