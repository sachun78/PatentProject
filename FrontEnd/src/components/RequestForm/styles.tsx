import { css } from '@emotion/react'
import { resetButton } from '../../lib/styles/resetButton'
import palette from '../../lib/palette'

export const wrapper = css`
  max-width: 90rem;
  height: 100%;
`
export const sectionStyle = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;

  .ant-btn {
    height: 2.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .ant-picker {
    flex-grow: 1;
  }
`

export const buttonStyle = css`
  ${resetButton};
  height: 2.8rem;
  color: white;
  background: ${palette.cyan[500]};
  max-width: 60rem;

  &:hover,
  &:focus-visible {
    background: ${palette.cyan[400]};
  }

  border-radius: 0.8rem;
  margin-left: 1rem;
`

export const space = css`
  flex: 1;
`
export const headerStyle = css`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
`
