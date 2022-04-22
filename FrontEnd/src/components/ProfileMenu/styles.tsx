import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'
import { resetButton } from '../../lib/styles/resetButton'

export const emailStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .email-block {
    line-height: 1.5;
    font-size: 1.125rem;
    font-weight: 600;
  }

  p {
    margin-top: 1rem;
  }
`

export const photoStyle = css`
  flex-grow: 1;
  display: flex;

  div {
    flex-grow: 1;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.75rem;
    border-radius: 1rem;
    color: ${brandColor};

    &:hover {
      background: ${palette.grey[50]};
      border: 1px solid ${brandColor};
      color: ${brandColor};
    }

    cursor: pointer;
  }
`
export const countryWrapper = css`
  display: flex;
  width: 100%;
  flex-direction: column;

  div {
    height: 2.5rem;
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

  button {
    ${resetButton};
  }

  .text {
    display: flex;

    svg {
      &:hover {
        color: ${brandColor};
      }

      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }
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
  padding: 1.25rem;

  &:not(:first-of-type) {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .inner {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    flex-grow: 1;
    font-size: 0.8125rem;
  }

  .title {
    width: 11.25rem;
    flex-shrink: 0;
    padding-right: 1.25rem;

    label {
      font-weight: 700;
    }
  }

  .btn {
    all: unset;
    display: inline-block;
  }
`
export const inputStyle = css`
  font-size: 0.8125rem;
  line-height: 1.2;
  min-height: 2.1875rem;
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
