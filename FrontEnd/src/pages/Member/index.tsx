import { Box } from '@mui/material'
import React from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { itemStyle, tabStyle, wrapper } from './style'
import loadable from '@loadable/component'
import MeetingHistory from '../Meeting/MeetingHistory'

type MemberShipProps = {}

const Meeting = loadable(() => import('pages/Meeting'))
const Events = loadable(() => import('components/Events'))
const Schedules = loadable(() => import('components/Schedules'))
const EventDetail = loadable(() => import('pages/EventDetail'))

function Member({}: MemberShipProps) {
  return (
    <div css={wrapper}>
      <Box sx={{ width: '100%' }}>
        <ul css={tabStyle}>
          <li>
            <NavLink css={itemStyle} to={'event'}>
              EVENTS
            </NavLink>
          </li>
          <li>
            <NavLink css={itemStyle} to={'schedule'}>
              SCHEDULES
            </NavLink>
          </li>
          <li>
            <NavLink css={itemStyle} to={'history'}>
              HISTORY
            </NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="event" element={<Events />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="schedule" element={<Schedules />} />
          <Route path="schedule/*" element={<Meeting />} />
          <Route path="history" element={<MeetingHistory />} />
          <Route path="*" element={<Navigate to={'event'} />} />
        </Routes>
      </Box>
    </div>
  )
}

export default Member
