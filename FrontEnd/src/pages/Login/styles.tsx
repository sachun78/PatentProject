import { css } from '@emotion/react'

export const loginFormStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 22.230625rem;

  section {
    flex: 1;
    margin-bottom: 1.5625rem;
  }

  a {
    text-decoration: none;
  }

  .button-div {
    margin-top: 1.5625rem;

    button {
      width: 100%;
      height: 2.5rem;
      mix-blend-mode: multiply;
      font: normal normal normal 12px/14px NanumBarunGothicOTF;
      line-height: 1.166666667;
      border-radius: 7px;
      text-transform: none;
    }
  }
`
export const inputStyle = css`
  &:not(:first-child) {
    margin-top: 1.5625rem;
  }

  width: 22.1875rem;
  background: #fff;

  &:hover,
  &:focus {
    .MuiOutlinedInput-notchedOutline {
      border-color: #d9d9d9;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #d9d9d9;
  }

  input {
    &::placeholder {
      color: #c6c6c6;
    }

    font: normal normal normal 16px/19px NanumSquareOTF;
    line-height: 1.1875;
    color: #333;
    padding: 13.5px 25px;
  }

  input[type='password'] {
    font: normal normal normal 1rem NanumBarunGothic;
  }
`
export const dividerStyle = css`
  color: #9c9c9c;
  font: normal normal bold 11px/15px NanumBarunGothic;
  line-height: 1.363636364;

  span {
    padding-left: 19.5px;
    padding-right: 19.5px;
  }

  &:before,
  &:after {
    border-color: #9c9c9c;
    margin-bottom: 1rem;
  }
`

export const underBlockStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;

  h4 {
    text-align: center;
    color: #6c6c6c;
    font: normal normal bold 15px/17px 'NanumSquareOTF';
    margin: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`
export const pageStyle = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 37.1875rem;
  height: 36.1875rem;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  background: rgba(255, 255, 255, 0.5);

  figure {
    margin: 4.375rem 0 3.125rem;
    width: 116px;
    height: 150px;

    img {
      max-width: 100%;
      max-height: 100%;
      height: 150px;
    }
  }

  .title {
    color: #333;
    margin: 0 0 1rem;
    font: normal normal 800 20px/23px NanumSquareOTF;
  }
`

export const helpertextStyle = css`
  color: #6c6c6c;
  font: normal normal normal 14px/16px NanumSquareOTF;
  margin-top: 10px;
  letter-spacing: 0;
`
