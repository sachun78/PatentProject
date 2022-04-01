import { css } from '@emotion/react'
import { Route, Routes } from 'react-router-dom'
import RequestForm from 'components/RequestForm'

type MeetingProps = {}

function Meeting({}: MeetingProps) {
  return <div css={pageStyle}><Routes>
    <Route path='/request' element={<RequestForm />} />
    <Route path='/*' element={<h1>Display Meeting Information and State</h1>} />
  </Routes>
  </div>
}

const pageStyle = css`
  min-height: 81rem;
  padding: 3rem;
`

export default Meeting
