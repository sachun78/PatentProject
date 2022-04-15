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
    display: flex;
    height: 2.5rem;

    button {
      flex: 1;
      background: #A1045A;
      mix-blend-mode: multiply;
      border-radius: 7px;
      font: normal normal normal 12px/14px NanumBarunGothic;
      line-height: 1.166666667;
      color: #fff;
    }
  }
`
export const inputStyle = css`
  margin-bottom: 1.5625rem;
  background: #fff;

  &:hover {
    .MuiOutlinedInput-notchedOutline {
      border-color: #A1045A;
    }
  }

  input {
    &::placeholder {
      color: #9C9C9C;
    }

    font: normal normal normal 1rem NanumSquareOTF;
    line-height: 1.125;
    color: #333;
    padding: 13.5px 25px;
  }

  input[type=password] {
    font: normal normal normal 1rem NanumBarunGothic;
  }
`
export const dividerStyle = css`
  color: #9C9C9C;
  font: normal normal bold 11px/15px NanumBarunGothic;
  line-height: 1.363636364;

  span {
    padding-left: 19.5px;
    padding-right: 19.5px;
  }

  &:before, &:after {
    border-color: #9C9C9C;
    margin-bottom: 1rem;
  }
`

export const underBlockStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;

  div {
    flex: 1;

    h4 {
      text-align: center;
      color: #6C6C6C;
      font: normal normal bold 15px/17px 'NanumSquareOTF';
      margin: 0;

      &:hover {
        text-decoration: underline;
      }
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
  width: 38.125rem;
  height: 37.3125rem;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  background: rgba(255, 255, 255, 0.5);

  figure {
    margin: 4.375rem 0 1.875rem;
    width: 116px;
    height: 150px;

    img {
      max-width: 100%;
      max-height: 100%;
      height: 150px;
    }
  }
`
