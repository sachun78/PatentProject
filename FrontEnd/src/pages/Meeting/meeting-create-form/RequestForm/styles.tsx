import { css } from '@emotion/react'
import { resetButton } from 'lib/styles/resetButton'
import palette from 'lib/palette'

export const wrapper = css`
  margin-right: 2rem;
`
export const sectionStyle = css`
  flex: 2;
  display: flex;
  flex-direction: column;
`

export const buttonStyle = css`
  ${resetButton};
  height: 2.8rem;
  color: white;
  background: ${palette.cyan[500]};

  &:hover,
  &:focus-visible {
    background: ${palette.cyan[400]};
  }

  border-radius: 0.5rem;
`

export const space = css`
  flex: 1;
`
export const headerStyle = css`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`
