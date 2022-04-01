import { css } from '@emotion/react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

export type MeetingConfirmProps = {}

const Booking = loadable(() => import('components/Booking'))
const Reschedule = loadable(() => import('components/Reschedule'))

function MeetingBook({}: MeetingConfirmProps) {
  return <div css={pageStyle}>
    <div css={wrapper}>
      <Routes>
        <Route path='/detail' element={<Booking />} />
        <Route path='/replan' element={<Reschedule />} />
      </Routes>
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
