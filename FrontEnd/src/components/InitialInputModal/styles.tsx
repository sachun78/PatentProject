import { css } from '@emotion/react'
import palette from '../../lib/palette'

export const boxWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;

  .css-1999axt-MuiAvatar-root {
    background-color: ${palette.blueGrey[600]};
  }

  svg {
    color: ${palette.blueGrey[100]};
  }
`

export const formWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .bot-button {
    height: 4rem;
  }
`
