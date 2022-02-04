import { Box, Modal } from '@mui/material'
import { css } from '@emotion/react'

export type CreateEventModalProps = {
  open?: boolean
}

function CreateEventModal({ open = true }: CreateEventModalProps) {
  return <Modal open={open}>
    <Box css={eventformStyle}>
      이벤트 생성 폼
    </Box>
  </Modal>
}

const eventformStyle = css`
  position: absolute;
  left: 40%;
  top: 20%;
  width: 40rem;
  height: 50rem;
  background: #fff;
`

export default CreateEventModal
