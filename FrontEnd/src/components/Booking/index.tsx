import BookingSide from './BookingSide'
import BookingMain from './BookingMain'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { getMeetingInfoByCode } from 'lib/api/meeting/getMeetingInfoByCode'
import { wrapper } from './styles'
import { useQuery } from 'react-query'

export type BookingProps = {}

function Booking({}: BookingProps) {
  const [param] = useSearchParams()
  const code = useMemo(() => param.get('code'), [param])
  const { data: bookingData, isLoading } = useQuery(['booking', code], getMeetingInfoByCode, {
    enabled: !!code,
    refetchOnWindowFocus: false,
  })

  if (code === '') {
    return <Navigate to={'/'} />
  }
  if (!bookingData || isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div css={wrapper}>
      <BookingSide meeting={bookingData.data} profile={bookingData.sendProfile} />
      <BookingMain code={code} status={bookingData.data.status} />
    </div>
  )
}

export default Booking
