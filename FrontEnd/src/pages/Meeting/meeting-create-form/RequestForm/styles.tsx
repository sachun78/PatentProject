import { css } from '@emotion/react'
import { resetButton } from 'lib/styles/resetButton'
import palette, { brandColor } from 'lib/palette'

export const wrapper = css`
  margin-right: 2rem;
  min-width: 50%;
  width: 24rem;
  max-width: 24rem;
`
export const sectionStyle = css`
  flex: 2;
  //display: flex;
  flex-direction: column;
`

export const buttonStyle = css`
  ${resetButton};
  height: 2.25rem;
  color: white;
  background: ${brandColor};
  width: 100%;

  &:hover,
  &:focus-visible {
    background: ${palette.purple[300]};
  }

  border-radius: 0.5rem;
`
