import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>
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
  height: 4rem;
  width:100%;
  display: flex;
  box-shadow: rgb(0 0 0 / 13%) 0px 0px 16px;
  position: sticky;
  background: white;
  z-index: 10;
`
const mainStyle = css`
  padding-top: 1rem;
  margin-left: 16.25rem;
`
const sidebarStyle = css`
  width: 16.25rem;
  height: 100%;
  position: fixed;
  display: flex;
  padding: 3rem;
  padding-top: 0;
  justify-content: center;
  border-right: 2px solid ${palette.grey[200]};
`
