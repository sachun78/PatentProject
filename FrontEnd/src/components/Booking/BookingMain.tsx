import { css } from '@emotion/react'
import { resetButton } from '../../lib/styles/resetButton'
import palette from '../../lib/palette'
import IconControl from '../IconControl'
import { confirmMeeting } from '../../lib/api/meeting/confirmMeeting'
import { cancelMeeting } from '../../lib/api/meeting/cancelMeeting'
import React from 'react'

export type BookingMainProps = {
  code: string | null
  status: string
}

function BookingMain({ code, status }: BookingMainProps) {
  const [isConfirm, setIsConfirm] = React.useState(false)
  const [isCancel, setIsCancel] = React.useState(false)
  const onConfirm = async () => {
    try {
      if (!code) {
        return
      }
      const result = await confirmMeeting(code)
      setIsConfirm(true)
    } catch (e) {
      console.error(e)
    }
  }

  const onCancel = async () => {
    console.log('예약 취소')
    try {
      if (!code) {
        return
      }
      const result = await cancelMeeting(code)
      setIsCancel(true)
    } catch (e) {
      console.error(e)
    }
  }
  return <div css={mainStyle}>
    <IconControl name={'welcome'} />
    {status === 'none' && !isConfirm && !isCancel && (
      <>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Decline</button>
      </>)}
    {(status === 'confirm' || isConfirm) && <>
      <div>예약이 승인되었습니다.</div>
    </>}
    {(status === 'cancel' || isCancel) && <>
      <div>this Meeting is Canceled</div>
    </>}
  </div>
}

const mainStyle = css`
  flex: 1 1 50%;
  width: 50%;
  transition: all 0.22s ease-out;

  padding-bottom: 2.5rem;
  padding-left: 3rem;
  padding-right: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  svg {
    width: 100%;
    height: 100%;
  }

  button {
    ${resetButton};
    background-color: ${palette.blueGrey[50]};
    margin-bottom: 1rem;
    min-height: 6rem;
    font-size: 1.5rem;
    font-weight: 600;
    border-radius: 0.8rem;

    &:hover {
      background-color: ${palette.blueGrey[100]};
    }
  }
`

export default BookingMain
