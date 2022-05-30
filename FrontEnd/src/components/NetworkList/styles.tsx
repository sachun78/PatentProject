import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'

export const itemStyle = css`
  display: flex;
  width: 100%;
  max-height: 6.875rem;
  height: 6.875rem;
  align-items: center;
  background: #fff;
  opacity: 0.7;
  border-radius: 0.5rem;
  padding: 1.5625rem 1.875rem;

  &:hover {
    color: ${brandColor};
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 5px 11px #00000029;
    cursor: pointer;
    opacity: 1;
  }

  & + & {
    margin-top: 0.5rem;
  }
`
export const iconStyle = css`
  margin-right: 1.25rem;
`
export const userStyle = css`
  flex: 2;
`

export const informStyle = css`
  display: flex;
  flex: 3;
  height: 3.6875rem;
  flex-direction: column;
  font-size: 0.875rem;
  color: ${palette.grey[400]};

  svg {
    margin-right: 0.375rem;
    color: ${brandColor};
    font-size: 1rem;
  }

  span {
    display: flex;
    align-items: center;
  }
`
export const stateStyle = css`
  width: 3.75rem;
  max-height: 3.75rem;
  height: 100%;
  float: right;
  background: #f2f2f2;
  text-align: center;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: #6c6c6c;
    font: normal normal normal 16px/18px NanumSquareOTF;
  }
`
