import React from 'react'
import TopNavigation from 'components/TopNavigation/TopNavigation'
import VerticalBar from 'components/Sidebar/VerticalBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import EventDetail from 'pages/EventDetail'
import Sponsor from 'components/Sponsor'
import Sidebar from 'components/Sidebar'
import { footerStyle, headerStyle, loadStyle, mainStyle, sidebarStyle } from './styles'
import useUserQuery from '../../hooks/query/useUserQuery'
import loadable from '@loadable/component'
import { CircularProgress } from '@mui/material'

const Home = loadable(() => import('pages/Home'))
const Profile = loadable(() => import('pages/Profile'))
const Member = loadable(() => import('pages/Member'))
const Network = loadable(() => import('pages/Member/Network'))
const Meeting = loadable(() => import('pages/Meeting'))

export type AppLayoutProps = {}

export default function AppLayout({}: AppLayoutProps) {
  const { data, isLoading } = useUserQuery()

  if (isLoading) {
    return (<>
      <AppLayout.Header>
        <TopNavigation />
      </AppLayout.Header>
      <AppLayout.Sidebar>
        <Sidebar />
        <VerticalBar />
      </AppLayout.Sidebar>
      <AppLayout.Main>
        <div css={loadStyle}><CircularProgress /></div>
      </AppLayout.Main>
    </>)
  }

  if (!data) {
    return <Navigate replace to={'/login'} />
  }

  return <>
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
        <Route path='/membership/meeting/*' element={<Meeting />} />
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

export type HeaderProps = {
  children: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return <header css={headerStyle}>{children}</header>
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

AppLayout.Header = Header
AppLayout.Sidebar = AppSidebar
AppLayout.Main = Main
AppLayout.Footer = Footer
