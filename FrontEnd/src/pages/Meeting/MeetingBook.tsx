import { css } from '@emotion/react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'
import media from 'lib/styles/media'

export type MeetingConfirmProps = {}

const Booking = loadable(() => import('components/Booking'))
const Reschedule = loadable(() => import('components/Reschedule'))

function MeetingBook({}: MeetingConfirmProps) {
  return (
    <div css={pageStyle}>
      <div css={wrapper}>
        <Routes>
          <Route path="/detail" element={<Booking />} />
          <Route path="/replan" element={<Reschedule />} />
        </Routes>
      </div>
    </div>
  )
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const wrapper = css`
  padding: 0;
  margin: auto;
  display: flex;
  justify-content: center;

  ${media.medium} {
    border-right: none;
  }
`

export default MeetingBook
