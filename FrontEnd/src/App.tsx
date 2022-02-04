import { Global, css } from '@emotion/react'
import AppLayout from './components/AppLayout'
import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Search from './pages/Search'
import Sidebar from './components/Sidebar'
import TopNavigation from './components/TopNavigation'
import Member from './pages/Member'
import Schedule from './pages/Meeting/Schedule'
import Network from './pages/Member/Network'
import Meeting from './pages/Meeting'
import Login from './pages/Login'
import Register from './pages/Register'
import DebugObserver from './components/DebugObserver'
import palette from './lib/palette'
import Profile from './pages/Profile/Profile'
import useCheckUserEffect from './hooks/useCheckUserEffect'

function App() {
  useCheckUserEffect()

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
                  <Route path='/membership' element={<Member />} />
                  <Route path='/schedule' element={<Schedule />} />
                  <Route path='/network' element={<Network />} />
                  <Route path='/meeting/*' element={<Meeting />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/conference' element={<div>컨퍼런스</div>} />
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

    a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
      border: 0;
      font-size: 100%;
      margin: 0;
      padding: 0;
      vertical-align: baseline;
    }
  }
`

export default App
