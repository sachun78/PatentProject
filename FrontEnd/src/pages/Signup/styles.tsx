import { css } from '@emotion/react'
import palette from 'lib/palette'

export const undoStyle = css`
  position: relative;
  top: -10px;
  font-size: 1.2rem;
  align-self: center;
  text-decoration: none;
  font: normal normal bold 15px/17px NanumSquareOTF;
  color: #6c6c6c;
  &:hover {
    color: ${palette.grey[600]};
  }
`

export const privacyStyle = css`
  margin: 0 0 1.5625rem;
  text-align: center;
  padding: 0;
  font: normal normal normal 12px/20px NanumSquareOTF;
  color: #6c6c6c;

  a {
    text-decoration: none;
    color: #910457;
  }

  a:hover {
    text-decoration: underline;
  }
`
