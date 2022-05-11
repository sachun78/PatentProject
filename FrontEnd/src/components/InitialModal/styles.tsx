import { css } from '@emotion/react'

export const boxWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  h1 {
    margin-top: 2rem;
    margin-bottom: -2rem;
    font: normal normal 800 20px/23px NanumSquareOTF;
    color: #333333;
  }
`

export const formWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .bot-button {
    height: 2.75rem;
  }
`
