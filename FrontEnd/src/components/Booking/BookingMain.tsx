import { css } from '@emotion/react'
import { resetButton } from 'lib/styles/resetButton'
import palette, { brandColor } from 'lib/palette'
import { confirmMeeting } from 'lib/api/meeting/confirmMeeting'
import { cancelMeeting } from 'lib/api/meeting/cancelMeeting'
import React, { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export type BookingMainProps = {
  code: string | null
  status: string
}

function BookingMain({ code, status }: BookingMainProps) {
  const qc = useQueryClient()

  const confirmMut = useMutation(confirmMeeting, {
    onSuccess: () => {
      qc.invalidateQueries(['booking', code])
    },
  })

  const cancelMut = useMutation(cancelMeeting, {
    onSuccess: () => {
      qc.invalidateQueries(['booking', code])
    },
  })

  const onConfirm = useCallback(() => {
    if (!code) return
    confirmMut.mutate(code)
  }, [code, confirmMut])

  const onCancel = useCallback(() => {
    if (!code) return
    cancelMut.mutate(code)
  }, [cancelMut, code])

  if (!code) return null

  return (
    <div css={mainStyle}>
      <img src="/assets/wemet_logo.png" alt="wemet-logo" />
      {status === 'none' && (
        <Box
          display="flex"
          justifyContent="space-between"
          minWidth={400}
          marginTop={1}
        >
          <Button
            onClick={onConfirm}
            disabled={cancelMut.isLoading || confirmMut.isLoading}
          >
            Confirm
          </Button>
          <Button
            onClick={onCancel}
            disabled={cancelMut.isLoading || confirmMut.isLoading}
          >
            Cancel
          </Button>
        </Box>
      )}
      {status === 'confirm' && (
        <>
          <div>The Meeting is Confirmed.</div>
        </>
      )}
      {status === 'cancel' && (
        <>
          <div>The Meeting is Canceled</div>
        </>
      )}
      {status !== 'none' && <Link to={'/'}>Back</Link>}
    </div>
  )
}

const mainStyle = css`
  flex: 1 1 50%;
  width: 50%;

  padding-bottom: 2.5rem;
  padding-left: 3rem;
  padding-right: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  img {
    width: 50%;
  }

  button {
    ${resetButton};
    background-color: ${palette.blueGrey[50]};
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 0.5rem;
    padding: 1rem;

    &:hover {
      background-color: ${brandColor};
      color: #fff;
    }
  }
`

export default BookingMain
