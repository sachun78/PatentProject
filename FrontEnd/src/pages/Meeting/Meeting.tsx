import { css } from '@emotion/react'
import { Route, Routes } from 'react-router-dom'
import RequestForm from '../../components/RequestForm'

type MeetingProps = {}

function Meeting({}: MeetingProps) {
  return (
    <Routes>
      <Route
        path='/request'
        element={
          <div css={pageStyle}>
            <RequestForm title='Meeting Proposal' />{' '}
          </div>
        }
      />
    </Routes>
  )
}

const pageStyle = css`
  min-height: 81rem;
  padding: 3rem;
`

export default Meeting
