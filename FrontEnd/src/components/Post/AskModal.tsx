import { css } from '@emotion/react'
import { Box, Modal } from '@mui/material'

type askModalProps = {
  visible: boolean
  title: string
  description: string
  confirmText: string
  cancelText: string
  onConfirm: any
  onCancel: any
}

const AskModal = ({ visible, title, description, confirmText, cancelText, onConfirm, onCancel }: askModalProps) => {
  if (!visible) return null
  return (
    <Modal hideBackdrop open={true}>
      <Box
        sx={{
          width: '29rem',
          height: '7.75rem',
          position: 'absolute',
          backgroundColor: '#F2F2F2',
          padding: '1rem 1.5rem 1rem 2rem',
          borderRadius: '1rem',
          top: '20rem',
          left: '35rem',
          opacity: [0.9, 0.9, 0.9],
        }}
      >
        <div css={boxStyle}>
          <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
          <hr style={{ marginBottom: '0.5rem' }} />
          <p>{description}</p>
          <div className="buttons" css={buttonWrapStyle}>
            <button css={buttonStyle} onClick={onConfirm} style={{ background: '#9C9C9C' }}>
              {confirmText}
            </button>
            <button css={buttonStyle} onClick={onCancel} style={{ background: '#910457' }}>
              {cancelText}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default AskModal

const boxStyle = css`
  font-family: NanumSquareOTF;
  color: #6c6c6c;
`

const buttonWrapStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.25rem;
  button + button {
    margin-left: 0.5rem;
  }
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
`
