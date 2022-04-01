import { css, Global } from '@emotion/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DebugObserver from 'components/DebugObserver'
import palette from 'lib/palette'
import GlobalDialog from 'components/GlobalDialog'
import useCsrfQuery from 'hooks/query/useCsrfQuery'
import media from 'lib/styles/media'
import loadable from '@loadable/component'
import { ReactQueryDevtools } from 'react-query/devtools'
import useUserQuery from 'hooks/query/useUserQuery'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

const Login = loadable(() => import('pages/Login'))
const SignUp = loadable(() => import('pages/Signup'))
const MailCheck = loadable(() => import('pages/MailCheck'))
const MeetingBook = loadable(() => import('pages/Meeting/MeetingBook'))
const AppLayout = loadable(() => import('layouts/AppLayout'))

function App() {
  useCsrfQuery({ retry: true, staleTime: Infinity })
  useUserQuery()

  return (
    <>
      <DebugObserver />
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/email/check' element={<MailCheck />} />
        <Route path='/invitation/*' element={<MeetingBook />} />
        <Route path='/*' element={<AppLayout />} />
      </Routes>
      <Global styles={globalStyle} />
      <GlobalDialog />
      <ToastContainer />
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

    * {
      box-sizing: inherit;

      ::selection {
        background: ${palette.purple[50]};
      }
    }
  }
`

export default App
