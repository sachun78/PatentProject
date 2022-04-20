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
  font-size: 1.2rem;
  align-self: self-end;

  a {
    text-decoration: none;
  }

  &:hover {
    color: ${palette.grey[600]};
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
