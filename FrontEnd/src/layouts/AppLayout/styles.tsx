import { css } from '@emotion/react'
import media from '../../lib/styles/media'
import palette from '../../lib/palette'

export const headerStyle = css`
  height: 5rem;
  width: 100%;
  flex-shrink: 0;
  //box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1);
  background: #f7f7f8;
  z-index: 500;
  top: 0;
  position: sticky;
`
export const mainStyle = css`
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
export const sidebarStyle = css`
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

export const footerStyle = css`
  width: 100%;
  height: 5rem;
  background: ${palette.purple[400]};
  position: sticky;
  bottom: 0;
`

export const loadStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
`
