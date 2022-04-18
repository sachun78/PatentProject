import { css } from '@emotion/react'

export const wrapper = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`
export const titleStyle = css`
  padding-right: 1.875rem;

  h2 {
    line-height: 1.2;
    font-size: 2.25rem;
    font-weight: 700;
    padding-bottom: 1rem;
    margin: 0;
  }

  .line {
    box-shadow: inset 0 calc(-1 * 1px) 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
`
export const infoStyle = css`
  padding-right: 3rem;
  display: flex;
  flex-flow: column;
`
