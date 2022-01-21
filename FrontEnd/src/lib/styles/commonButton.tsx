import { css } from '@emotion/react'
import palette from '../palette'

export const commonButton = css`
  height: 3rem;
  font-size: 1.3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.grey[50]};
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 0.4rem;
  font-weight: 600;
`
