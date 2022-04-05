import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

type MeetingProps = {}

const RequestForm = loadable(() => import('pages/Meeting/meeting-create-form/RequestForm'))
const MeetingDetail = loadable(() => import('./MeetingDetail'))

function Meeting({}: MeetingProps) {
  return (
    <Routes>
      <Route path='/request' element={<RequestForm />} />
      <Route path='/*' element={<MeetingDetail />} />
    </Routes>
  )
}

export default Meeting
