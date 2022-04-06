import { Box } from '@mui/material'
import React from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Events from 'components/Events'
import Schedules from 'components/Schedules'
import EventDetail from '../EventDetail'
import { itemStyle, tabStyle, wrapper } from './style'

type MemberShipProps = {}

function Member({}: MemberShipProps) {
  const loc = useLocation()

  if (loc.pathname === '/membership') {
    return <Navigate to={'event'} />
  }

  return (
    <div css={wrapper}>
      <Box sx={{ width: '100%' }}>
        <ul css={tabStyle}>
          <li><NavLink css={itemStyle} to={'event'}> Event </NavLink></li>
          <li><NavLink css={itemStyle} to={'schedule'}> Schedule </NavLink></li>
        </ul>
        <Routes>
          <Route path='event' element={<Events />} />
          {/*<Route index element={<Events />} />*/}
          <Route path='schedule' element={<Schedules />} />
          <Route path='event/*' element={<EventDetail />} />
        </Routes>
      </Box>
    </div>
  )
}


export default Member
