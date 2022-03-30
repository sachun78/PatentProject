import { css } from '@emotion/react'

export const wrapper = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`
export const titleStyle = css`
  padding-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;

  h2 {
    line-height: 1.2;
    font-size: 3.6rem;
    font-weight: 700;
    padding-bottom: 1rem;
  }

  .line {
    box-shadow: inset 0 calc(-1 * 1px) 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
`
export const infoStyle = css`
  padding-left: 3rem;
  padding-right: 3rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
`
