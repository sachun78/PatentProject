import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'

export const wrapper = css`
  padding-right: 1rem;
`

export const tabStyle = css`
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
  display: flex;
  user-select: none;

  li {
    z-index: 50;
  }
`

export const itemStyle = css`
  text-decoration: none;
  margin-right: 3.3125rem;
  color: #6c6c6c;
  font: normal normal 800 17px 'NanumSquareOTF';
  line-height: 1.117647059;

  &.active,
  &:hover {
    color: ${brandColor};
  }
`
