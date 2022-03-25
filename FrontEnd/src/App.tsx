import { css, Global } from '@emotion/react'
import AppLayout from './layouts/AppLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DebugObserver from './components/DebugObserver'
import palette from './lib/palette'
import GlobalDialog from './components/GlobalDialog'
import MeetingBook from './pages/Meeting/MeetingBook'
import useCsrfQuery from './hooks/query/useCsrfQuery'
import media from './lib/styles/media'
import loadable from '@loadable/component'
import { ReactQueryDevtools } from 'react-query/devtools'

const Login = loadable(() => import('./pages/Login'))
const SignUp = loadable(() => import('./pages/Register'))

function App() {
  useCsrfQuery({ retry: true, staleTime: 300000 })
  // usePageRelocationEffect()

  return (
    <>
      <DebugObserver />
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/auth-email' element={<SignUp />} />
        <Route path='/invitation-letter' element={<MeetingBook />} />
        <Route path='/*' element={<AppLayout />} />
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

    ${media.small} {
      overflow-x: auto;
    }
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;

    * {
      box-sizing: inherit;

      ::selection {
        background: ${palette.purple[50]};
      }
    }
  }
`

export default App
