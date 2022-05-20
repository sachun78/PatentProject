import { css } from '@emotion/react'

export const boxWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36.25rem;
  height: 36.125rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
`

export const formWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 3.125rem;
  padding-right: 3.125rem;
  margin-top: 3.125rem;

  .bot-button {
    width: 150px;
    height: 28px;
    border-radius: 1rem;
    align-self: center;
    text-transform: none;
    margin-top: 1.875rem;
  }
`
