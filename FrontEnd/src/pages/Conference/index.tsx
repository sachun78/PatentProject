import ConferenceList from 'components/Conference'
import ConferenceWrite from 'components/Conference/ConferenceWrite'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

type conferenceProps = {}

function Conference({}: conferenceProps) {
  return (
    <>
      <Helmet>
        <title>Conference - WEMET</title>
      </Helmet>
      <Routes>
        <Route path={'/list'} element={<ConferenceList />} />
        <Route path={'/list/write'} element={<ConferenceWrite />} />
        <Route path={'*'} element={<Navigate to={'list'} />} />
      </Routes>
    </>
  )
}

export default Conference
