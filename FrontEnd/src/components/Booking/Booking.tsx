import { css } from '@emotion/react'
import BookingSide from './BookingSide'
import BookingMain from './BookingMain'

export type BookingProps = {}

function Booking({}: BookingProps) {
  return <div css={wrapper}>
    <BookingSide />
    <BookingMain />
  </div>
}

const wrapper = css`
  width: 95%;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  flex: 1 1 auto;
  max-width: 800px;
  min-height: 550px;
  transition: all 0.22s ease-out;
  position: relative;
  background-color: #fff;
`

export default Booking
