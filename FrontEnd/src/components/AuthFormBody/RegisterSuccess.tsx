import { css } from '@emotion/react'
import IconControl from '../IconControl'

export type RegisterSuccessProps = {}

function RegisterSuccess({}: RegisterSuccessProps) {
  return <div css={wrapper}>
    <IconControl name={'welcome'}/>
    <p>Success your registration.</p>
    <p>Please check your email and login additional validation</p>

  </div>
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  flex:1;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.4;
  text-wrap: none;
  flex-wrap: nowrap;
  svg {
    width: 20rem;
    height: 20rem;
  }
`

export default RegisterSuccess
