import { css } from '@emotion/react'
import { NavLink, Route, Routes } from 'react-router-dom'
import RequestView from '../../components/RequestView'

type MeetingProps = {}

function Meeting({}: MeetingProps) {
  return (
    <Routes>
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
  height: 100%;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

export default Meeting
