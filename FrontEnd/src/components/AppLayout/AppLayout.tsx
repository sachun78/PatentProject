import { css } from '@emotion/react'
import React from 'react'
import media from '../../lib/styles/media'
import useCheckUserEffect from '../../hooks/useCheckUserEffect'
import palette from "../../lib/palette";

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

export type FooterProps = {
  children: React.ReactNode
}

function Footer({ children }: FooterProps) {
  return <footer css={footerStyle}>{children}</footer>
}

AppLayout.Header = Header
AppLayout.Sidebar = Sidebar
AppLayout.Main = Main
AppLayout.Footer = Footer

const headerStyle = css`
  height: 5rem;
  width: 100%;
  flex-shrink: 0;
  //box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1);
  background: #f7f7f8;
  z-index: 500;
  top: 0;
  position: sticky;
`
const mainStyle = css`
  margin-left: 26rem;
  min-height: calc(100vh - 64px);
  min-width: 76.8rem;
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
  //background: linear-gradient(0deg, ${palette.purple[400]} 0%, #f7f7f8  100%);
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

const footerStyle = css`
  width: 100%;
  height: 5rem;
  background: ${palette.purple[400]};
  position: sticky;
  bottom: 0;
`
