import { css } from '@emotion/react'
import palette from '../../lib/palette'

export const emailStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .email-block {
    line-height: 1.5;
    font-size: 1.8rem;
    font-weight: 600;
  }

  p {
    margin-top: 1rem;
  }
`

export const photoStyle = css`
  flex-grow: 1;
  display: flex;
  width: 10rem;
  height: 10rem;

  div {
    flex-grow: 1;
  }

  svg {
    &:hover {
      color: ${palette.teal[200]};
    }

    cursor: pointer;
  }
`

export const textStyle = (minWidth: number) => css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: ${minWidth}rem;

  div {
    flex-grow: 1;
  }

  .text {
    display: flex;
  }

  .save-cancel {
    margin-top: 1rem;

    button {
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
      &:hover {
        background-color: ${palette.grey[200]};
      }
      &:disabled {
        color: blue;
      }
    }

    button + button {
      margin-left: 0.5rem;
    }
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;

    &:hover {
      color: ${palette.teal[200]};
    }
  }
`
