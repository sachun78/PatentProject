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
  width: 100%;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  flex: 1 1 auto;
  min-height: 550px;
  transition: all 0.22s ease-out;
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);

  ${media.medium} {
    flex-direction: column;
  }
`
