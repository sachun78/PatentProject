import { css } from '@emotion/react'
import LoginForm from './LoginForm'
import palette from '../../lib/palette'
import IconControl from '../IconControl'
import React from 'react'

type LoginFormBodyProps = {}

export default function LoginFormBody({}: LoginFormBodyProps) {
  return (
    <div css={bodyStyle}>
      <div css={wrapStyle}>
        <div className="img-block">
          <IconControl name={'welcome'} />
          <span>WEMET</span>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

const bodyStyle = css`
  z-index: 20;
  display: flex;
  flex-direction: column;
  background-color: white;

  width: 606px;
  height: 480px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
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
