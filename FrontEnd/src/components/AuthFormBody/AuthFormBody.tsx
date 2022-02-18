import { css } from '@emotion/react'
import palette from '../../lib/palette'
import IconControl from '../IconControl'
import React from 'react'

type AuthFormBodyProps = {
  children: React.ReactNode
  width: number
  height: number
}

export default function AuthFormBody({ children, width, height }: AuthFormBodyProps) {
  return (
    <div css={bodyStyle(width, height)}>
      <div css={wrapStyle}>
        <div className='img-block'>
          <IconControl name={'welcome'} />
          <span>WEMET</span>
        </div>
        {children}
      </div>
    </div>
  )
}

const bodyStyle = (width: number, height: number) => css`
  z-index: 20;
  display: flex;
  flex-direction: column;
  background-color: white;
  transform: translateY(-10%);
  width: ${width}px;
  height: ${height}px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 40%);
`

const wrapStyle = css`
  height: 100%;
  width: 100%;
  display: flex;

  .img-block {
    width: 216px;
    background: ${palette.blueGrey[100]};
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
