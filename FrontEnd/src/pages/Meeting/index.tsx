import { css } from '@emotion/react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

type MeetingProps = {}

const RequestForm = loadable(() => import('components/RequestForm'))
const MeetingDetail = loadable(() => import('./MeetingDetail'))

function Meeting({}: MeetingProps) {
  return (
    <Routes>
      <Route path='/request' element={<div css={pageStyle}><RequestForm /></div>}
      />
      <Route path='/*' element={<MeetingDetail />} />
    </Routes>
  )
}

const pageStyle = css`
  min-height: 81rem;
  padding: 3rem;
`

export default Meeting
