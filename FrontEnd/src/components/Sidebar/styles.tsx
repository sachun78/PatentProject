import { css } from '@emotion/react'
import media from 'lib/styles/media'
import { brandColor } from '../../lib/palette'

export const sidebarStyle = css`
    // ${media.xlarge} {
  //   display: none;
  // }

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 95px;
  user-select: none;
`

export const menuStyle = css`
  list-style: none;
  padding: 0;
  margin: 35px 0 30px;
`

export const logoStyle = css`
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: flex-end;

  img {
    width: 70px;
    height: 100%;
    margin-right: 0.78125rem;
  }
`

export const dividerStyle = css`
  border-top: 1px solid #9C9C9C;
  width: 6.8125rem;
  margin-right: -7px;
`

export const userStyle = css`
  margin-top: 3.125rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    font: normal normal 800 18px NanumSquareOTF;
    line-height: 1.166666667;
    color: #333333;
    white-space: nowrap;
    margin-top: 1.25rem;
    margin-bottom: 0.9375rem;
  }

  svg {
    width: 1.25rem;
    height: 17px;

    &:hover {
      fill: ${brandColor};
    }
  }
`
