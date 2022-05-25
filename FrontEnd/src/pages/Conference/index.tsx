import ConferenceList from 'components/Conference'
import ConferenceWrite from 'components/Conference/ConferenceWrite'
import BrowseUser from 'components/NetworkList/BrowseUser'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

type conferenceProps = {}

function Conference({}: conferenceProps) {
  return (
    <Routes>
      <Route path={'/list'} element={<ConferenceList />} />
      <Route path={'/list/write'} element={<ConferenceWrite />} />
      <Route path={'*'} element={<Navigate to={'list'} />} />
    </Routes>    
  )
}

export default Conference
