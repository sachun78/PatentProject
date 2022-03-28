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
export const countryWrapper = css`
  display: flex;
  width: 100%;
  flex-direction: column;

  div {
    height: 4rem;
  }

  button {
    margin-left: 1rem;
    margin-top: 1rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`

export const textStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;

  div {
    flex-grow: 1;
  }

  .text {
    display: flex;

    svg {
      &:hover {
        color: ${palette.teal[200]};
      }
    }
  }


  svg {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  .save-cancel {
    margin-top: 1rem;
    display: inline-flex;

    button {
      &:hover {
        background-color: ${palette.grey[200]};
      }

      &:disabled {
        color: rgba(0, 0, 0, 0.3);
        background-color: rgba(0, 0, 0, 0.05);
        user-select: none;
      }
    }

    button + button {
      margin-left: 0.5rem;
    }
  }

  .plus {
    height: 3rem;
    font-size: 1.3rem;
    justify-content: center;
    align-items: center;
    background-color: ${palette.grey[50]};
    padding-right: 1rem;
    padding-left: 1rem;
    border-radius: 0.4rem;
    font-weight: 600;
    margin-left: 1rem;
    margin-top: 0.2rem;

    &:disabled {
      color: rgba(0, 0, 0, 0.3);
      background-color: rgba(0, 0, 0, 0.05);
      user-select: none;
    }

    &:hover {
      background-color: ${palette.grey[200]};
    }
  }
`

export const careerStyle = css`
  width: 100%;
`
// PROFILECARD STYLES
export const itemStyle = css`
  padding: 2rem;
  width: 100%;

  &:not(:first-of-type) {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }

  .inner {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    flex-grow: 1;
    font-size: 1.3rem;
  }

  .title {
    width: 18rem;
    flex-shrink: 0;
    padding-right: 2rem;

    label {
      font-weight: 700;
    }
  }

  .btn {
    all: unset;
    display: inline-flex;
  }
`
export const inputStyle = css`
  font-size: 1.3rem;
  line-height: 1.2;
  min-height: 3.5rem;
  flex-grow: 1;
`
export const tagStyle = css`
  display: block;
  flex-direction: column;
  margin-top: 0.5rem;

  .tag + .tag {
    margin-left: 0.5rem;
  }
`
