import { css } from '@emotion/react'
import media from 'lib/styles/media'
import palette from 'lib/palette'

export const mainStyle = css`
  margin-left: 16.25rem;
  min-height: 100%;
  background: #f7f7f8;
  position: relative;
  padding-left: 2rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  
  ${media.xlarge} {
    margin-left: 8rem;
  }

  ${media.small} {
    margin-left: 0;
  }
`
export const sidebarStyle = css`
  width: 16.25rem;
  height: 100%;
  position: fixed; 
  background: linear-gradient(210deg, ${palette.purple[50]} 0%, #fff  80%);
  //background: #f7f7f8;
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
  height: 3.2rem;
  background: ${palette.purple[50]};
  position: sticky;
  bottom: 0;
  z-index: 999;
`

export const loadStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
`
