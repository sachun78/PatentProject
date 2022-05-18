import { css } from '@emotion/react'
import media from 'lib/styles/media'

export const mainStyle = css`
  flex: 1 1 50%;
  width: 50%;
  transition: all 0.22s ease-out;

  padding: 3rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  img {
    width: 30%;
    margin-bottom: 1rem;
  }

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
