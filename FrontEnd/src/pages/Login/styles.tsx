import { css } from '@emotion/react'
import palette from '../../lib/palette'

export const loginFormStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  margin-top: 2.25rem;
  line-height: 1.5;

  .title {
    margin: 0;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
  }

  section {
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    flex: 1;
  }

  section + section {
    margin-top: 0;
  }

  a {
    text-decoration: none;
  }

  .button-div {
    display: flex;
    height: 3.6rem;

    button {
      flex: 1;
    }
  }
`
export const inputStyle = css`
  width: 100%;
  margin-bottom: 1.5rem;

  label {
    font-size: 100%;
  }
`
export const dividerStlye = css`
  height: 1rem;
  color: ${palette.grey[400]};
  margin-bottom: 1rem;

  &:before, &:after {
    border-color: ${palette.grey[400]};
  }
`
export const errorMessageStyle = css`
  color: ${palette.red[500]};
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: bold;
  display: block;
  margin-bottom: 1rem;
`

export const underBlockStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;

  div {
    flex: 1;

    h4 {
      text-align: center;
      color: ${palette.blueGrey['600']};
      font-size: 1.3rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
export const pageStyle = css`
  background-color: ${palette.blueGrey[50]};
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`
