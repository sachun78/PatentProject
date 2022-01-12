import { css } from '@emotion/react'
import { NavLink, Route, Routes } from 'react-router-dom'
import RequestView from '../../components/RequestView'

type MeetingProps = {}

function Meeting({}: MeetingProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            base <NavLink to={'/meeting/request'}>요청 화면으로 이동</NavLink>
          </div>
        }
      />
      <Route
        path="/request"
        element={
          <div css={pageStyle}>
            <RequestView title="Meeting Proposal" />{' '}
          </div>
        }
      />
    </Routes>
  )
}

const pageStyle = css`
  height: 88vh;
`

export default Meeting
