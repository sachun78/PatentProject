import { css } from '@emotion/react'
import { resetButton } from '../../lib/styles/resetButton'
import palette from '../../lib/palette'
import IconControl from '../IconControl'

export type BookingMainProps = {}

function BookingMain({}: BookingMainProps) {
  const onConfirm = () => {
    console.log('예약 완료')
  }

  const onCancel = () => {
    console.log('예약 취소')
  }

  return <div css={mainStyle}>
    <IconControl name={'welcome'} />
    <button onClick={onConfirm}>Confirm</button>
    <button onClick={onCancel}>Decline</button>
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
