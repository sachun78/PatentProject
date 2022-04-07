import { css } from '@emotion/react'

export const loginFormStyle = css`
  display: flex;
  flex-direction: column;
  min-width: 31.625rem;

  section {
    flex: 1;
    margin-bottom: 2.1875rem;
  }

  a {
    text-decoration: none;
  }

  .button-div {
    display: flex;
    height: 3.5rem;

    button {
      flex: 1;
      background: #A1045A 0 0 no-repeat padding-box;
      mix-blend-mode: multiply;
      border-radius: 7px;
      font: normal normal normal 19px/22px 'NanumBarunGothic';
      letter-spacing: 0;
      color: #FFFFFF;
    }
  }
`
export const inputStyle = css`
  margin-bottom: 2.1875rem;
  font: normal normal bold 14px/16px NanumBarunGothic;
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

    padding: 21.5px 37px;
  }
`
export const dividerStyle = css`
  color: #9C9C9C;
  font: normal normal bold 15px/20px NanumBarunGothicOTF;

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
      font-size: 0.875rem;
      margin: 0.625rem 0;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
export const pageStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;;
  width: 54.375rem;
  height: 53.75rem;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  background: rgba(255, 255, 255, 0.5);

  img {
    min-width: 11.875rem;
    min-height: 14.4375rem;
    margin-top: 6.8125rem;
    margin-bottom: 4.625rem;
  }
`
