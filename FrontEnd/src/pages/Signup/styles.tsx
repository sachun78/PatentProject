import { css } from '@emotion/react'
import palette from 'lib/palette'

export const undoStyle = css`
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
  font-size: 1.2rem;
  align-self: self-end;
  position: absolute;
  text-decoration: none;
  margin-right: 1rem;
  &:hover {
    color: ${palette.grey[600]};
  }
`

export const privacyStyle = css`
  margin: 1rem 0 2rem;
  text-align: center;
  padding: 0;

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
