import { css } from '@emotion/react'
import Booking from '../../components/Booking'
import { useSearchParams } from 'react-router-dom'

export type MeetingConfirmProps = {}

function MeetingBook({}: MeetingConfirmProps) {
  const [param] = useSearchParams()
  console.log( param.get('code'))

  return <div css={pageStyle}>
    <div css={wrapper}>
      <Booking />
    </div>
  </div>
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fbfcfd;
`
const wrapper = css`
  min-height: 700px;
  padding-right: 5%;
  padding-left: 5%;
  margin-top: 6.6rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
`

export default MeetingBook
