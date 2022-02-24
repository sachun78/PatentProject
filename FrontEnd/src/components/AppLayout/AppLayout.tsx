import { css } from '@emotion/react'
import React from 'react'
import media from '../../lib/styles/media'
import useCheckUserEffect from '../../hooks/useCheckUserEffect'

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  useCheckUserEffect()
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
  width: 100%;
  flex-shrink: 0;
  //box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 500;
  top: 0;
  position: sticky;
`
const mainStyle = css`
  margin-left: 26rem;
  min-height: calc(100vh - 64px);
  background: #f7f7f8;
  position: relative;

  ${media.xlarge} {
    margin-left: 8rem;
  }

  ${media.small} {
    margin-left: 0;
  }
`
const sidebarStyle = css`
  width: 26rem;
  height: 100%;
  position: fixed;
  background: #f7f7f8;
  display: flex;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 3rem;

  ${media.xlarge} {
    width: 8rem;
    padding: 0;
  }

  ${media.small} {
    display: none;
  }
`
