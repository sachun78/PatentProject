import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'
import { resetButton } from 'lib/styles/resetButton'

export const emailStyle = css`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .email-block {
    color: #333333;
    font: normal normal 800 16px/18px NanumSquareOTF;
  }

  p {
    margin-top: 0.5rem;
    color: #9c9c9c;
    font: normal normal normal 12px/13px NanumSquareOTF;
  }
`

export const photoStyle = css`
  display: flex;
  flex: 1;
  width: 100%;

  > div.img {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  > div.upload-btn {
    align-self: center;
  }
`
export const countryWrapper = css`
  display: flex;
  width: 100%;
  flex-direction: column;

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
    color: #333333;
    font: normal normal 800 16px/18px NanumSquareOTF;

    svg {
      &:hover {
        color: ${brandColor};
      }

      width: 1rem;
      height: 1rem;
      cursor: pointer;
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
  padding: 0.9375rem 1.875rem;

  & + & {
    margin-top: 0.625rem;
  }

  background: #fff;
  border-radius: 1rem;
  min-height: 4.3125rem;
  display: flex;
  flex: 1;

  .inner {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
  }

  .title {
    width: 7.5rem;
    flex-shrink: 0;

    label {
      color: #6c6c6c;
      font: normal normal normal 16px/26px NanumSquareOTF;
    }
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
`
