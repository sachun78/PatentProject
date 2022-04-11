import React from 'react'
import VerticalBar from 'components/Sidebar/VerticalBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sponsor from 'components/Sponsor'
import Sidebar from 'components/Sidebar'
import { footerStyle, mainStyle, sidebarStyle } from './styles'
import useUserQuery from 'hooks/query/useUserQuery'
import loadable from '@loadable/component'
import { Backdrop, CircularProgress } from '@mui/material'
import PostDetail from 'components/Post/PostDetail'

const Home = loadable(() => import('pages/Home'))
const Profile = loadable(() => import('pages/Profile'))
const Member = loadable(() => import('pages/Member'))
const Network = loadable(() => import('pages/Network'))
const Meeting = loadable(() => import('pages/Meeting'))

export type AppLayoutProps = {}

export default function AppLayout({}: AppLayoutProps) {
  const { data, isLoading } = useUserQuery()

  if (isLoading) {
    return <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}>
      <CircularProgress color='inherit' />
    </Backdrop>
  }

  if (!data) {
    return <Navigate replace to={'/login'} />
  }

  return <>
    <AppLayout.Sidebar>
      <Sidebar />
      <VerticalBar />
    </AppLayout.Sidebar>
    <AppLayout.Main>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/postDetail/:id' element={<PostDetail />} />
        <Route path='/membership/meeting/*' element={<Meeting />} />
        <Route path='/membership/*' element={<Member />} />
        <Route path='/network' element={<Network />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/conference' element={<div>컨퍼런스</div>} />
        <Route path='/*' element={<div>404 NOT FOUND</div>} />
      </Routes>
    </AppLayout.Main>
    <AppLayout.Footer>
      <Sponsor />
    </AppLayout.Footer>
  </>
}

export type MainProps = {
  children: React.ReactNode
}

function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>
}

export type SidebarProps = {
  children: React.ReactNode
}

function AppSidebar({ children }: SidebarProps) {
  return <aside css={sidebarStyle}>{children}</aside>
}

export type FooterProps = {
  children: React.ReactNode
}

function Footer({ children }: FooterProps) {
  return <footer css={footerStyle}>{children}</footer>
}

AppLayout.Sidebar = AppSidebar
AppLayout.Main = Main
AppLayout.Footer = Footer
