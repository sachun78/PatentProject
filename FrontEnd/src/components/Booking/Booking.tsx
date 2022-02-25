import { css } from '@emotion/react'
import BookingSide from './BookingSide'
import BookingMain from './BookingMain'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getMeetingInfoByCode } from '../../lib/api/meeting/getMeetingInfoByCode'

export type BookingProps = {}

function Booking({}: BookingProps) {
  const [param] = useSearchParams()
  const code = useMemo(() => param.get('code'), [param])
  const [bookingInfo, setBookingInfo] = useState<any>(null)
  useEffect(() => {
    async function fetchCode() {
      if (code) {
        return await getMeetingInfoByCode(code)
      }
    }

    fetchCode().then(setBookingInfo)
  }, [])

  if (code === '') {
    return null
  }
  if (bookingInfo === null) {
    return <div>Error Occurs</div>
  }
  return <div css={wrapper}>
    <BookingSide meeting={bookingInfo} />
    <BookingMain code={code} status={bookingInfo.status} />
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
