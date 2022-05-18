import { css } from '@emotion/react'
import media from 'lib/styles/media'

export const mainStyle = css`
  width: 100%;
  transition: all 0.22s ease-out;
  margin-top: 1.25rem;
  padding: 1.875rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 2px 5px 11px #00000029;
  border-radius: 1rem;

  ${media.medium} {
    width: 100%;
    border-top: 1px solid #e6e6e6;
    padding: 2rem;

    form {
      width: 100%;
    }
  }
`

export const wrapper = css`
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  width: 54.375rem;
  transition: all 0.22s ease-out;
  position: relative;

  ${media.medium} {
    flex-direction: column;
  }
`
