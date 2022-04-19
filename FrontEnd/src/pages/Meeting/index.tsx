import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

type MeetingProps = {}

const RequestForm = loadable(
  () => import('pages/Meeting/meeting-create-form/RequestForm')
)
const MeetingDetail = loadable(() => import('./MeetingDetail'))
const MeetingResult = loadable(() => import('./MeetingResult'))

function Meeting({}: MeetingProps) {
  return (
    <Routes>
      <Route path="/request" element={<RequestForm />} />
      <Route path="/:id" element={<MeetingDetail />} />
      <Route path="/:id/result" element={<MeetingResult />} />
    </Routes>
  )
}

export default Meeting
