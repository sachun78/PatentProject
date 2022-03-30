import { css } from '@emotion/react'
import palette from '../../lib/palette'

export const signupFormStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  padding: 1.5rem;
  padding-right: 2rem;
  line-height: 1.5rem;
  height: 100%;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .title {
    margin: 0;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5;
  }

  section {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    flex: 1;
  }

  .link {
    display: inline-block;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: ${palette.blueGrey[500]};
    }

    color: ${palette.blueGrey[200]};
  }

  .button-div {
    flex-direction: column;
    display: flex;
    bottom: 0;
    justify-content: flex-end;
    margin-top: auto;

    button {
      flex: 1;
      height: 3.6rem;
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

export const undoStyle = css`
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
  font-size: 1.5rem;

  a {
    text-decoration: none;
  }
`

export const privacyStyle = css`
  margin: 0;
  margin-bottom: 2rem;
  text-align: center;
  padding: 0;
  vertical-align: baseline;

  p {
    color: #53535f;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: ${palette.deepOrange[600]};
  }

  a:hover {
    text-decoration: underline;
  }
`

export const mailCheckStyle = css`
  display: inline-flex;
  width: 100%;
  height: 4rem;
  text-decoration: none;
  text-align: center;
  background: ${palette.purple[500]};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
  }

  &:hover {
    background: ${palette.purple[400]};
  }
`
