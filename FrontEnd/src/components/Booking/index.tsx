import BookingSide from './BookingSide'
import BookingMain from './BookingMain'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getMeetingInfoByCode } from 'lib/api/meeting/getMeetingInfoByCode'
import { wrapper } from './styles'

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

    fetchCode()
      .then(setBookingInfo)
  }, [code])

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


export default Booking
