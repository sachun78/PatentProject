import { css, Global } from '@emotion/react'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import DebugObserver from 'components/DebugObserver'
import palette from 'lib/palette'
import useCsrfQuery from 'hooks/query/useCsrfQuery'
import loadable from '@loadable/component'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

const Login = loadable(() => import('pages/Login'))
const SignUp = loadable(() => import('pages/Signup'))
const MailCheck = loadable(() => import('pages/MailCheck'))
const MeetingBook = loadable(() => import('pages/Meeting/MeetingBook'))
const AppLayout = loadable(() => import('layouts/AppLayout'))
const Landing = loadable(() => import('pages/Landing'))
const Policy = loadable(() => import('pages/Policy'))
const Forgot = loadable(() => import('pages/Forgot'))

function App() {
  useCsrfQuery({ retry: true, staleTime: 1000 * 60 * 30 })
  return (
    <>
      {process.env.NODE_ENV === 'development' && <DebugObserver />}
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="about" element={<Landing />} />
          <Route path="policy" element={<Policy />} />
          <Route path="policy/:type" element={<Policy />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpw" element={<Forgot />} />
          <Route path="email/check" element={<MailCheck />} />
          <Route path="email/forgot" element={<MailCheck type={'forgot'} />} />
          <Route path="invitation/*" element={<MeetingBook />} />
          {/*with AUTH*/}
          <Route path="*" element={<AppLayout />} />
        </Routes>
      </Suspense>
      <Global styles={globalStyle} />
      <ToastContainer />
    </>
  )
}

const globalStyle = css`
  html,
  body,
  #root {
    overflow-x: hidden;
    min-height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/assets/background.jpg');
    background-size: cover;
  }

  html {
    box-sizing: border-box;

    * {
      box-sizing: inherit;
      margin: 0;
      padding: 0;

      ::selection {
        background: ${palette.purple[50]};
      }
    }
  }
`

export default App
