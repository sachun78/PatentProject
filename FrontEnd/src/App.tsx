import { css, Global } from '@emotion/react'
import AppLayout from './components/AppLayout'
import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopNavigation from './components/TopNavigation'
import Member from './pages/Member'
import Network from './pages/Member/Network'
import Meeting from './pages/Meeting'
import Login from './pages/Login'
import Register from './pages/Register'
import DebugObserver from './components/DebugObserver'
import palette from './lib/palette'
import Profile from './pages/Profile/Profile'
import GlobalDialog from './components/GlobalDialog'
import EventDetail from './pages/EventDetail'
import MeetingBook from './pages/Meeting/MeetingBook'
import useCsrfQuery from './hooks/query/useCsrfQuery'
import { usePageRelocationEffect } from './hooks/usePageRelocationEffect'
import VerticalBar from './components/Sidebar/VerticalBar'

function App() {
  useCsrfQuery({ refetchOnWindowFocus: false })
  usePageRelocationEffect()

  return (
    <>
      <DebugObserver />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/auth-email' element={<Register />} />
        <Route path='/invitation-letter' element={<MeetingBook />} />
        <Route
          path='/*'
          element={
            <AppLayout>
              <AppLayout.Header>
                <TopNavigation />
              </AppLayout.Header>
              <AppLayout.Sidebar>
                <Sidebar />
                <VerticalBar />
              </AppLayout.Sidebar>
              <AppLayout.Main>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/membership' element={<Member />} />
                  <Route path='/membership/event/*' element={<EventDetail />} />
                  <Route path='/network' element={<Network />} />
                  <Route path='/meeting/*' element={<Meeting />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/conference' element={<div>컨퍼런스</div>} />
                  <Route path='/*' element={<div>404 NOT FOUND</div>} />
                </Routes>
              </AppLayout.Main>
            </AppLayout>
          }
        />
      </Routes>
      <Global styles={globalStyle} />
      <GlobalDialog />
    </>
  )
}

const globalStyle = css`
  html,
  body,
  #root {
    height: 100%;
    overflow-x: hidden;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;

    * {
      box-sizing: inherit;

      ::selection {
        background: ${palette.blueGrey[200]};
      }
    }
  }
`

export default App
