import loadable from '@loadable/component'
import { Backdrop, CircularProgress } from '@mui/material'
import Sidebar from 'components/Sidebar'
import Sponsor from 'components/Sponsor'
import useUserQuery from 'hooks/query/useUserQuery'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import User from '../../pages/User'
import { footerStyle, mainStyle, sidebarStyle } from './styles'
import InitialModal from '../../components/InitialModal'

const Home = loadable(() => import('pages/Home'))
const Profile = loadable(() => import('pages/Profile'))
const Member = loadable(() => import('pages/Member'))
const Network = loadable(() => import('pages/Network'))
const Conference = loadable(() => import('pages/Conference/Conference'))
const PostDetail = loadable(() => import('components/Post/PostDetail'))
const PostWrite = loadable(() => import('components/Post/PostWrite'))
const PostEdit = loadable(() => import('components/Post/PostEdit'))

export type AppLayoutProps = {}

export default function AppLayout({}: AppLayoutProps) {
  const { data, isLoading } = useUserQuery()

  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  if (!data) {
    return <Navigate replace to={'/about'} />
  }

  return (
    <>
      <AppLayout.Sidebar>
        <Sidebar />
      </AppLayout.Sidebar>
      <AppLayout.Main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/postDetail/:id" element={<PostDetail />} />
          <Route path="/meeting/*" element={<Member />} />
          <Route path="/network" element={<Network />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/u/:email" element={<User />} />
          <Route path="/*" element={<div>404 NOT FOUND</div>} />
          <Route path="/postWrite/" element={<PostWrite />} />
          <Route path="/postEdit/:id" element={<PostEdit />} />
        </Routes>
      </AppLayout.Main>
      <AppLayout.Footer>
        <Sponsor />
      </AppLayout.Footer>
      <InitialModal />
    </>
  )
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
