import { css } from '@emotion/react'
import { confirmMeeting } from 'lib/api/meeting/confirmMeeting'
import { cancelMeeting } from 'lib/api/meeting/cancelMeeting'
import React, { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import media from 'lib/styles/media'
import styled from '@emotion/styled'

export type BookingMainProps = {
  code: string | null
  status: string
  expire: boolean
  reserved?: boolean
}

function BookingMain({ code, status, expire, reserved }: BookingMainProps) {
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
      {expire ? (
        <div> Meeting is expired</div>
      ) : (
        <>
          {status === 'none' && reserved && (
            <Box display="flex" justifyContent="space-around" minWidth={400} marginTop={1}>
              <Button
                onClick={onCancel}
                disabled={cancelMut.isLoading || confirmMut.isLoading}
                variant={'contained'}
                style={{
                  width: '150px',
                  height: '28px',
                  borderRadius: '1rem',
                  background: '#9C9C9C',
                  font: 'normal normal normal 14px/26px NanumSquareOTF',
                  textTransform: 'none',
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                disabled={cancelMut.isLoading || confirmMut.isLoading}
                variant={'contained'}
                style={{
                  width: '150px',
                  height: '28px',
                  borderRadius: '1rem',
                  font: 'normal normal normal 14px/26px NanumSquareOTF',
                  textTransform: 'none',
                }}
              >
                Confirm
              </Button>
            </Box>
          )}
          {status === 'none' && !reserved && (
            <div>
              Another Meeting in time is reserved.
              <br /> if you want meeting please <br />
              <Link to={`../replan?code=${code}`} replace>
                replan
              </Link>
            </div>
          )}
          <Flexbox>
            {status === 'confirm' && <div>The Meeting is Confirmed.</div>}
            {status === 'cancel' && <div>The Meeting is Canceled</div>}
            {status !== 'none' && <Link to={'/'}>Back</Link>}
          </Flexbox>
        </>
      )}
    </div>
  )
}

const mainStyle = css`
  width: 100%;
  margin: 1.875rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.medium} {
    width: 100%;

    img {
      display: none;
    }
  }
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default BookingMain
