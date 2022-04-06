import { Divider } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'
import React from 'react'
import { dividerStyle, loginFormStyle, underBlockStyle } from './styles'
import useUserQuery from 'hooks/query/useUserQuery'
import LoginForm from './login-form/LoginForm'
import Auth from 'layouts/Auth'

type LoginProps = {}

function Login({}: LoginProps) {
  const { data } = useUserQuery()

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <Auth height={1} width={1}>
      <img src={'/assets/logo.png'} alt={'login-logo'} />
      <div css={loginFormStyle}>
        <section>
          <LoginForm />
        </section>
        <Divider css={dividerStyle}>OR</Divider>
        <section>
          <div css={underBlockStyle}>
            <div>
              <NavLink to={'/email/check'}>
                <h4>Sign Up</h4>
              </NavLink>
            </div>
            <div>
              <h4>Forget Password</h4>
            </div>
          </div>
        </section>
      </div>
    </Auth>
  )
}


export default Login
