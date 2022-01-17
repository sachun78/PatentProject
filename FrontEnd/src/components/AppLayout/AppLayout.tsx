import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <>{children}</>
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

function Sidebar({ children }: SidebarProps) {
  return <aside css={sidebarStyle}>{children}</aside>
}

AppLayout.Header = Header
AppLayout.Sidebar = Sidebar
AppLayout.Main = Main

const headerStyle = css`
  height: 5rem;
  width:100%;
  display: flex;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15),0 0 2px rgba(0,0,0,0.1);
  position: sticky;
  background: white;
  z-index: 1000;
  top: 0;
`
const mainStyle = css`
  margin-left: 16.25rem;
  min-height: calc(100vh - 64px);
  background: rgb(245, 245, 245);
`
const sidebarStyle = css`
  width: 16.25rem;
  height: 100%;
  position: fixed;
  display: flex;
  padding: 3rem;
  padding-top: 0;
  justify-content: center;
`
