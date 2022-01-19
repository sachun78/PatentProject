import { Global, css } from '@emotion/react'
import AppLayout from './components/AppLayout'
import React, { useEffect } from 'react'
import Home from './pages/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Search from './pages/Search'
import Sidebar from './components/Sidebar'
import TopNavigation from './components/TopNavigation'
import MemberShip from './pages/MemberShip'
import Schedule from './pages/MemberShip/Schedule'
import Network from './pages/MemberShip/Network'
import Meeting from './pages/Meeting'
import Login from './pages/Login'
import Register from './pages/Register'
import { useLoginValue } from './atoms/loginState'
import DebugObserver from './components/DebugObserver'
import palette from './lib/palette'
import Profile from './pages/Profile/Profile'

function App() {
  const navigate = useNavigate()
  const loginValue = useLoginValue()

  useEffect(() => {
    if (!loginValue.isloggedIn) {
      console.log('isloggedIn is false')
      navigate('/login')
    }
  }, [loginValue])

  return (
    <>
      <DebugObserver />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/*'
          element={
            <AppLayout>
              <AppLayout.Header>
                <TopNavigation />
              </AppLayout.Header>
              <AppLayout.Sidebar>
                <Sidebar />
              </AppLayout.Sidebar>
              <AppLayout.Main>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/membership' element={<MemberShip />} />
                  <Route path='/schedule' element={<Schedule />} />
                  <Route path='/network' element={<Network />} />
                  <Route path='/meeting/*' element={<Meeting />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/profile' element={<Profile />} />
                </Routes>
              </AppLayout.Main>
            </AppLayout>
          }
        />
      </Routes>
      <Global styles={globalStyle} />
    </>
  )
}

const globalStyle = css`
  html,
  body,
  #root {
    height: 100%;
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
