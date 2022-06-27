import { css } from '@emotion/react'
import palette from 'lib/palette'
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

    img {
      user-select: none;
    }
  }

  .plus {
    ${resetButton};
    border: 1px solid #9c9c9c;
    padding: 0;
    margin: 0;
    border-radius: 50px;

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
    user-select: none;

    label {
      color: #6c6c6c;
      font: normal normal normal 16px/26px NanumSquareOTF;
    }
  }
`

export const InitItemStyle = css`
  ${itemStyle};
  padding: 0;
  min-height: 2.8125rem;

  & + & {
    margin-top: 1.25rem;
  }

  .inner {
    height: 100%;
  }

  .title {
    width: 7.8125rem;

    label {
      color: #9c9c9c;
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
