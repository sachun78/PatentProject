import { css } from '@emotion/react'
import media from 'lib/styles/media'

export const mainStyle = css`
  margin-left: 18.8125rem;
  min-height: 100%;
  padding-left: 9.25rem;
  padding-top: 5.625rem;
  padding-bottom: 5.1875rem;

  // ${media.xlarge} {
  //   margin-left: 8rem;
  //   padding-left: 0;
  // }

  ${media.small} {
    margin-left: 0;
    padding-left: 1rem;
  }
`
export const sidebarStyle = css`
  width: 18.8125rem;
  height: 100%;
  position: fixed;
  background-color: transparent;
  display: flex;
  padding-top: 5.625rem;
  padding-bottom: 5.1875rem;
  padding-left: 12.875rem;

  // ${media.xlarge} {
  //   width: 8rem;
  //   padding: 0;
  // }

  ${media.small} {
    display: none;
  }
`

export const footerStyle = css`
  width: 100%;
  height: 5.1875rem;
  background: #F2F2F2;
  z-index: 999;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

export const loadStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
`
