import { css } from '@emotion/react'
import palette from 'lib/palette'

export const bodyStyle = (width: number, height: number) => css`
  z-index: 20;
  display: flex;
  flex-direction: column;
  background-color: white;
  transform: translateY(-10%);
  width: ${width}px;
  height: ${height}px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 40%);
`

export const wrapStyle = css`
  height: 100%;
  width: 100%;
  display: flex;

  .img-block {
    width: 216px;
    background: ${palette.grey[100]};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    span {
      font-weight: bold;
      line-height: 1.5rem;
      font-size: 1.5rem;
      margin-top: 1rem;
    }
  }
`
