import { css } from '@emotion/react'
import { confirmMeeting } from 'lib/api/meeting/confirmMeeting'
import { cancelMeeting } from 'lib/api/meeting/cancelMeeting'
import React, { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import media from '../../lib/styles/media'

export type BookingMainProps = {
  code: string | null
  status: string
  expire: boolean
}

function BookingMain({ code, status, expire }: BookingMainProps) {
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
      {expire ? (
        <div> Meeting is expired</div>
      ) : (
        <>
          {status === 'none' && (
            <Box display="flex" justifyContent="space-around" minWidth={400} marginTop={1}>
              <Button
                onClick={onConfirm}
                disabled={cancelMut.isLoading || confirmMut.isLoading}
                variant={'contained'}
                size={'large'}
              >
                Confirm
              </Button>
              <Button
                onClick={onCancel}
                disabled={cancelMut.isLoading || confirmMut.isLoading}
                variant={'contained'}
                size={'large'}
              >
                Cancel
              </Button>
            </Box>
          )}
          {status === 'confirm' && <div>The Meeting is Confirmed.</div>}
          {status === 'cancel' && <div>The Meeting is Canceled</div>}
          {status !== 'none' && <Link to={'/'}>Back</Link>}
        </>
      )}
    </div>
  )
}

const mainStyle = css`
  flex: 1 1 50%;
  width: 50%;

  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 30%;
  }

  ${media.medium} {
    width: 100%;

    img {
      display: none;
    }
  }
`

export default BookingMain
