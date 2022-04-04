import { css } from '@emotion/react'

export const mainStyle = css`
  flex: 1 1 50%;
  width: 50%;
  transition: all 0.22s ease-out;

  padding-bottom: 2.5rem;
  padding-left: 3rem;
  padding-right: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const wrapper = css`
  width: 100%;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  flex: 1 1 auto;
  min-height: 550px;
  transition: all 0.22s ease-out;
  position: relative;
  background-color: #fff;
`
