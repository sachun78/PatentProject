import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet-async'
import React from 'react'

type MeetingProps = {}

const RequestForm = loadable(() => import('pages/Meeting/meeting-create-form/RequestForm'))
const MeetingDetail = loadable(() => import('./MeetingDetail'))

function Meeting({}: MeetingProps) {
  return (
    <>
      <Helmet>
        <title>Schedule - WEMET</title>
      </Helmet>
      <Routes>
        <Route path="/request" element={<RequestForm />} />
        <Route path="/:id" element={<MeetingDetail />} />
      </Routes>
    </>
  )
}

export default Meeting
