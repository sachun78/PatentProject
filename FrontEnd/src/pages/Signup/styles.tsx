import { css } from '@emotion/react'
import palette from 'lib/palette'

export const inputStyle = css`
  width: 100%;
  margin-bottom: 1.5rem;

  label {
    font-size: 100%;
  }
`

export const undoStyle = css`
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
  font-size: 1.5rem;

  a {
    text-decoration: none;
  }
`

export const privacyStyle = css`
  margin: 0 0 2rem;
  text-align: center;
  padding: 0;
  vertical-align: baseline;

  p {
    color: #53535f;
    font-size: 0.75rem;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: ${palette.deepOrange[600]};
  }

  a:hover {
    text-decoration: underline;
  }
`

export const mailCheckStyle = css`
  display: inline-flex;
  width: 100%;
  height: 4rem;
  text-decoration: none;
  text-align: center;
  background: ${palette.purple[500]};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
  }

  &:hover {
    background: ${palette.purple[400]};
  }
`
