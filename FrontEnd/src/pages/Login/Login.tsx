import { css } from '@emotion/react'
import AuthFormBody from '../../components/AuthFormBody'
import LoginForm from '../../components/AuthFormBody/LoginForm'
import palette from '../../lib/palette'

type LoginProps = {}

function Login({}: LoginProps) {
  return (
    <div css={pageStyle}>
        <LoginForm />
    </div>
  )
}

const pageStyle = css`
  background-color: ${palette.blueGrey[50]};
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;

  align-items: center;
  justify-content: center;
`

export default Login
