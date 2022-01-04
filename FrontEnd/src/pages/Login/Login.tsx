import { css } from '@emotion/react'
import LoginFormBody from '../../components/LoginFormBody'
import palette from '../../lib/palette'

type LoginProps = {}

function Login({}: LoginProps) {
  return (
    <div css={pageStyle}>
      <LoginFormBody />
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
